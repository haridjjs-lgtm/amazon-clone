"use client"

import Link from "next/link"
import Image from "next/image"
import { Star, Truck, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart, Product } from "@/components/cart-context"
import { useStore } from "@/components/store-context"

interface ProductCardProps {
  product: Product
  compact?: boolean
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addToCart } = useCart()
  const { wishlist, addToWishlist, removeFromWishlist } = useStore()
  const isInWishlist = wishlist.some((p) => p.id === product.id)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-primary text-primary"
            : i < rating
            ? "fill-primary/50 text-primary"
            : "text-muted-foreground"
        }`}
      />
    ))
  }

  if (compact) {
    return (
      <Link href={`/product/${product.id}`}>
        <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-3">
            <div className="relative aspect-square mb-2">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <h3 className="text-sm font-medium line-clamp-2 mb-1">{product.name}</h3>
            <p className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</p>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow group">
      <CardContent className="p-4">
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative aspect-square mb-3">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-md group-hover:scale-105 transition-transform"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            {discount > 0 && (
              <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
                {discount}% off
              </span>
            )}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product)
              }}
              className="absolute top-2 right-2 p-1.5 bg-card/80 hover:bg-card rounded-full transition-colors"
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={`h-5 w-5 ${
                  isInWishlist ? "fill-destructive text-destructive" : "text-muted-foreground"
                }`}
              />
            </button>
          </div>
          <h3 className="text-sm font-medium line-clamp-2 mb-2 text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-sm text-muted-foreground">
            ({product.reviews.toLocaleString()})
          </span>
        </div>
        <div className="mb-2">
          <span className="text-xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through ml-2">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        {product.prime && (
          <div className="flex items-center gap-1 text-amazon-teal text-xs mb-3">
            <Truck className="h-4 w-4" />
            <span className="font-semibold">FREE Delivery</span>
          </div>
        )}
        <Button
          onClick={(e) => {
            e.preventDefault()
            addToCart(product)
          }}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}
