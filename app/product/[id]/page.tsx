"use client"

import { use, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Star, Truck, ShieldCheck, RotateCcw, ChevronRight, Minus, Plus, Check, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-context"
import { useStore } from "@/components/store-context"
import { ProductCard } from "@/components/product-card"
import { getProductById, products } from "@/lib/products"

interface Props {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: Props) {
  const { id } = use(params)
  const product = getProductById(id)
  const { addToCart } = useCart()
  const { wishlist, addToWishlist, removeFromWishlist } = useStore()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const isInWishlist = product ? wishlist.some((p) => p.id === product.id) : false

  if (!product) {
    notFound()
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? "fill-primary text-primary"
            : i < rating
            ? "fill-primary/50 text-primary"
            : "text-muted-foreground"
        }`}
      />
    ))
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-1">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/products" className="hover:text-primary">Products</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/products?category=${product.category}`} className="hover:text-primary">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {discount > 0 && (
                    <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                      {discount}% OFF
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-balance">
                {product.name}
              </h1>
              <Link
                href={`/products?category=${product.category}`}
                className="text-primary hover:underline text-sm"
              >
                Visit the {product.category} Store
              </Link>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-primary hover:underline cursor-pointer">
                {product.reviews.toLocaleString()} ratings
              </span>
            </div>

            <Separator />

            {/* Price */}
            <div>
              {discount > 0 && (
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="destructive" className="text-sm">
                    {discount}% off
                  </Badge>
                  <span className="text-sm text-muted-foreground">Limited time deal</span>
                </div>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Prime Benefits */}
            {product.prime && (
              <div className="flex items-center gap-2 text-amazon-teal">
                <Truck className="h-5 w-5" />
                <span className="font-semibold">FREE Delivery</span>
                <span className="text-muted-foreground">Tomorrow</span>
              </div>
            )}

            <Separator />

            {/* Description */}
            <div>
              <h3 className="font-bold text-foreground mb-2">About this item</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            {/* Add to Cart Section */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="text-lg font-bold text-foreground">
                  ${product.price.toFixed(2)}
                </div>
                
                {product.prime && (
                  <div className="text-sm">
                    <span className="text-amazon-teal font-semibold">FREE delivery </span>
                    <span className="font-bold">Tomorrow</span>
                    <p className="text-muted-foreground">Order within 12 hrs 30 mins</p>
                  </div>
                )}

                <p className="text-green-600 font-medium">In Stock</p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Qty:</span>
                  <div className="flex items-center border border-border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  {addedToCart ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Added to Cart
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </Button>

                <Link href="/checkout" className="block w-full">
                  <Button variant="secondary" className="w-full" size="lg">
                    Buy Now
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={() => isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isInWishlist ? "fill-destructive text-destructive" : ""}`} />
                  {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Secure transaction</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <RotateCcw className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Easy returns</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Customers also viewed
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
