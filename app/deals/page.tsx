"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Clock, Zap, Percent, ChevronRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart, Product } from "@/components/cart-context"
import { useStore } from "@/components/store-context"
import { products } from "@/lib/products"
import { Footer } from "@/components/footer"

// Get products with discounts
const dealsProducts = products.filter((p) => p.originalPrice)

// Group by discount percentage
const getDiscountPercent = (p: Product) => 
  p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0

const bigDeals = dealsProducts.filter((p) => getDiscountPercent(p) >= 30)
const lightningDeals = dealsProducts.slice(0, 6)
const categoryDeals: Record<string, Product[]> = {}
dealsProducts.forEach((p) => {
  if (!categoryDeals[p.category]) categoryDeals[p.category] = []
  categoryDeals[p.category].push(p)
})

export default function DealsPage() {
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist, addNotification } = useStore()
  const [selectedTab, setSelectedTab] = useState("all")

  // Simulate countdown timer
  const [timeLeft] = useState({
    hours: 5,
    minutes: 23,
    seconds: 47,
  })

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    addNotification(`${product.name.slice(0, 30)}... added to cart`, "success")
  }

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
      addNotification("Added to wishlist", "success")
    }
  }

  const DealCard = ({ product, showTimer = false }: { product: Product; showTimer?: boolean }) => {
    const discount = getDiscountPercent(product)
    
    return (
      <Card className="group overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <Link href={`/product/${product.id}`}>
              <div className="aspect-square relative bg-muted overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              {discount}% OFF
            </Badge>
            <button
              onClick={() => handleWishlistToggle(product)}
              className="absolute top-2 right-2 p-2 bg-card/80 rounded-full hover:bg-card"
            >
              <Heart
                className={`h-5 w-5 ${
                  isInWishlist(product.id)
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          </div>
          <div className="p-4">
            {showTimer && (
              <div className="flex items-center gap-2 mb-3 text-red-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Ends in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </span>
              </div>
            )}
            <Link href={`/product/${product.id}`}>
              <h3 className="font-medium line-clamp-2 hover:text-primary mb-2">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1 mb-2">
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
              <span className="text-sm text-muted-foreground">
                ({product.reviews.toLocaleString()})
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-bold text-red-600">${product.price}</span>
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            </div>
            {product.prime && (
              <p className="text-xs text-amazon-teal font-medium mb-3">
                <span className="font-bold italic">prime</span> FREE Delivery
              </p>
            )}
            <Button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold">Today&apos;s Deals</h1>
          </div>
          <p className="text-lg opacity-90">
            Limited-time discounts on top products. Grab them before they&apos;re gone!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Lightning deals section */}
        <Card className="mb-8 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Lightning Deals
              <Badge variant="secondary" className="ml-auto">
                <Clock className="h-3 w-3 mr-1" />
                {timeLeft.hours}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {lightningDeals.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div className="group">
                    <div className="aspect-square relative bg-muted rounded-lg overflow-hidden mb-2">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                      <Badge className="absolute top-1 left-1 bg-red-500 text-white text-xs">
                        {getDiscountPercent(product)}% OFF
                      </Badge>
                    </div>
                    <p className="text-sm line-clamp-1 group-hover:text-primary">{product.name}</p>
                    <p className="text-lg font-bold text-red-600">${product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different deal types */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Deals ({dealsProducts.length})</TabsTrigger>
            <TabsTrigger value="best">Best Discounts ({bigDeals.length})</TabsTrigger>
            {Object.keys(categoryDeals).slice(0, 3).map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat} ({categoryDeals[cat].length})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dealsProducts.map((product) => (
                <DealCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="best">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {bigDeals.map((product) => (
                <DealCard key={product.id} product={product} showTimer />
              ))}
            </div>
          </TabsContent>

          {Object.entries(categoryDeals).slice(0, 3).map(([category, prods]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {prods.map((product) => (
                  <DealCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* More deals by category */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Percent className="h-6 w-6 text-red-500" />
            Deals by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(categoryDeals).map(([category, prods]) => (
              <Link key={category} href={`/products?category=${encodeURIComponent(category)}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{category}</h3>
                      <p className="text-sm text-muted-foreground">{prods.length} deals</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
