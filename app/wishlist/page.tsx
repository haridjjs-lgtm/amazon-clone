"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, Star, Trash2, ShoppingCart, Share2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/components/cart-context"
import { useStore } from "@/components/store-context"
import { Footer } from "@/components/footer"
import { products } from "@/lib/products"

export default function WishlistPage() {
  const { addToCart } = useCart()
  const { wishlist, removeFromWishlist, isAuthenticated, addNotification } = useStore()

  const handleMoveToCart = (productId: string) => {
    const item = wishlist.find((i) => i.product.id === productId)
    if (item) {
      addToCart(item.product)
      removeFromWishlist(productId)
      addNotification("Moved to cart", "success")
    }
  }

  const handleRemove = (productId: string) => {
    removeFromWishlist(productId)
    addNotification("Removed from wishlist", "info")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Nile Wishlist",
        text: "Check out my wishlist!",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      addNotification("Link copied to clipboard", "success")
    }
  }

  // Get recommended products (products not in wishlist)
  const recommendedProducts = products
    .filter((p) => !wishlist.some((w) => w.product.id === p.id))
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500 fill-red-500" />
              Your Wishlist
            </h1>
            <p className="text-muted-foreground mt-1">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
            </p>
          </div>
          {wishlist.length > 0 && (
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share List
            </Button>
          )}
        </div>

        {/* Not signed in notice */}
        {!isAuthenticated && (
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="p-4 flex items-center gap-4">
              <Lock className="h-8 w-8 text-blue-500" />
              <div className="flex-1">
                <p className="font-medium">Sign in to save your wishlist</p>
                <p className="text-sm text-muted-foreground">
                  Your wishlist items will be saved across devices when you sign in.
                </p>
              </div>
              <Link href="/signin">
                <Button>Sign In</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Wishlist items */}
        {wishlist.length === 0 ? (
          <Card className="text-center p-12">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Save items you love by clicking the heart icon on any product.
            </p>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary/90">
                Start Shopping
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {wishlist.map(({ product, addedAt }) => (
              <Card key={product.id} className="group">
                <CardContent className="p-4">
                  <div className="relative">
                    <Link href={`/product/${product.id}`}>
                      <div className="aspect-square relative mb-3 bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                        {product.originalPrice && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {Math.round(
                              ((product.originalPrice - product.price) /
                                product.originalPrice) *
                                100
                            )}
                            % OFF
                          </div>
                        )}
                      </div>
                    </Link>
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="absolute top-2 right-2 p-2 bg-card/80 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-sm font-medium line-clamp-2 hover:text-primary mb-1">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews.toLocaleString()})
                    </span>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-lg font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {product.prime && (
                    <p className="text-xs text-amazon-teal font-medium mb-2">
                      <span className="font-bold italic">prime</span> FREE Delivery
                    </p>
                  )}
                  
                  <p className="text-xs text-muted-foreground mb-3">
                    Added {new Date(addedAt).toLocaleDateString()}
                  </p>
                  
                  <Button
                    onClick={() => handleMoveToCart(product.id)}
                    className="w-full bg-primary hover:bg-primary/90 gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Move to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {recommendedProducts.length > 0 && (
          <div>
            <Card>
              <CardHeader>
                <CardTitle>You might also like</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recommendedProducts.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`}>
                      <div className="group">
                        <div className="aspect-square relative mb-2 bg-muted rounded-lg overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <h4 className="text-sm line-clamp-2 group-hover:text-primary">
                          {product.name}
                        </h4>
                        <p className="text-sm font-bold mt-1">${product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
