"use client"

import Link from "next/link"
import Image from "next/image"
import { Trash2, Minus, Plus, ShoppingCart, ChevronRight, Truck, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-context"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart()

  const suggestedProducts = products
    .filter((p) => !items.some((item) => item.id === p.id))
    .slice(0, 4)

  const savings = items.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity
    }
    return sum
  }, 0)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
              <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
              <p className="text-muted-foreground mb-6">
                Looks like you have not added anything to your cart yet.
              </p>
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Suggestions */}
          {suggestedProducts.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">You might like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {suggestedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-1">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Shopping Cart</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl">Shopping Cart</CardTitle>
                <Button
                  variant="ghost"
                  className="text-destructive hover:text-destructive/80"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {items.map((item, index) => (
                  <div key={item.id}>
                    {index > 0 && <Separator />}
                    <div className="p-4 md:p-6">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <Link href={`/product/${item.id}`} className="shrink-0">
                          <div className="relative w-24 h-24 md:w-32 md:h-32">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover rounded-md"
                              sizes="128px"
                            />
                          </div>
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Link href={`/product/${item.id}`}>
                            <h3 className="font-medium text-foreground hover:text-primary line-clamp-2 mb-1">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-green-600 mb-2">In Stock</p>
                          
                          {item.prime && (
                            <div className="flex items-center gap-1 text-amazon-teal text-xs mb-2">
                              <Truck className="h-4 w-4" />
                              <span className="font-semibold">FREE Delivery</span>
                            </div>
                          )}

                          {/* Quantity & Remove */}
                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center border border-border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-10 text-center text-sm">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Separator orientation="vertical" className="h-6" />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive/80 p-0 h-auto"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right shrink-0">
                          <p className="text-lg font-bold text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          {item.originalPrice && (
                            <p className="text-sm text-muted-foreground line-through">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Separator />
                <div className="p-4 md:p-6 text-right">
                  <p className="text-lg">
                    Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):{" "}
                    <span className="font-bold">${totalPrice.toFixed(2)}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6 space-y-4">
                {/* Free Delivery Banner */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <Truck className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      Your order qualifies for FREE Delivery
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Items ({totalItems}):
                    </span>
                    <span>${(totalPrice + savings).toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Savings:</span>
                      <span className="text-green-600">-${savings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <Link href="/checkout" className="block w-full">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure checkout</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-8">
          <Link href="/products" className="text-primary hover:underline inline-flex items-center gap-1">
            <ChevronRight className="h-4 w-4 rotate-180" />
            Continue Shopping
          </Link>
        </div>

        {/* Suggestions */}
        {suggestedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Customers who bought items in your cart also bought
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {suggestedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
