"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  ChevronLeft,
  RotateCcw,
  HelpCircle,
  MapPin,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/components/store-context"
import { Footer } from "@/components/footer"

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { getOrderById, cancelOrder, addNotification } = useStore()
  
  const order = getOrderById(id)

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order not found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn&apos;t find an order with that ID.
          </p>
          <Link href="/orders">
            <Button className="bg-primary hover:bg-primary/90">View All Orders</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const handleCancelOrder = () => {
    if (confirm("Are you sure you want to cancel this order?")) {
      cancelOrder(order.id)
      addNotification("Order cancelled successfully", "success")
      router.refresh()
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "cancelled":
      case "returned":
        return <XCircle className="h-6 w-6 text-red-500" />
      default:
        return <Truck className="h-6 w-6 text-blue-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600"
      case "cancelled":
      case "returned":
        return "text-red-600"
      default:
        return "text-blue-600"
    }
  }

  // Order progress steps
  const orderSteps = [
    { key: "confirmed", label: "Order Placed", done: true },
    { key: "shipped", label: "Shipped", done: ["shipped", "out_for_delivery", "delivered"].includes(order.status) },
    { key: "out_for_delivery", label: "Out for Delivery", done: ["out_for_delivery", "delivered"].includes(order.status) },
    { key: "delivered", label: "Delivered", done: order.status === "delivered" },
  ]

  const isCancelled = order.status === "cancelled" || order.status === "returned"
  const canCancel = !["delivered", "cancelled", "returned", "out_for_delivery"].includes(order.status)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/orders" className="inline-flex items-center text-amazon-teal hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Orders
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Order Details</h1>
              <p className="text-muted-foreground">
                Order #{order.id.slice(0, 8).toUpperCase()} | Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/help">
                <Button variant="outline" size="sm">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Get Help
                </Button>
              </Link>
              {canCancel && (
                <Button variant="outline" size="sm" onClick={handleCancelOrder}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Order status */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              {getStatusIcon(order.status)}
              <div>
                <p className={`text-xl font-bold ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace("_", " ")}
                </p>
                {!isCancelled && order.status !== "delivered" && (
                  <p className="text-muted-foreground">
                    Expected delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            {/* Progress tracker */}
            {!isCancelled && (
              <div className="relative">
                <div className="absolute top-4 left-0 right-0 h-1 bg-muted">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${(orderSteps.filter((s) => s.done).length - 1) / (orderSteps.length - 1) * 100}%`,
                    }}
                  />
                </div>
                <div className="relative flex justify-between">
                  {orderSteps.map((step, idx) => (
                    <div key={step.key} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.done ? <CheckCircle className="h-4 w-4" /> : idx + 1}
                      </div>
                      <span className={`text-xs mt-2 text-center ${step.done ? "font-medium" : "text-muted-foreground"}`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {order.trackingNumber && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  <span className="font-medium">Tracking Number:</span> {order.trackingNumber}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Items Ordered</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <Link href={`/product/${item.product.id}`}>
                      <div className="w-24 h-24 relative bg-muted rounded overflow-hidden shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.product.id}`}>
                        <h3 className="font-medium hover:text-primary line-clamp-2">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        Qty: {item.quantity} x ${item.priceAtPurchase.toFixed(2)}
                      </p>
                      <p className="font-medium mt-1">
                        ${(item.quantity * item.priceAtPurchase).toFixed(2)}
                      </p>
                      {order.status === "delivered" && (
                        <Link href={`/product/${item.product.id}`}>
                          <Button variant="outline" size="sm" className="mt-2">
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Buy Again
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p className="text-muted-foreground">{order.shippingAddress.street}</p>
                <p className="text-muted-foreground">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p className="text-muted-foreground">{order.shippingAddress.country}</p>
                <p className="text-muted-foreground mt-2">Phone: {order.shippingAddress.phone}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="capitalize">{order.paymentMethod.replace("_", " ")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={order.shipping === 0 ? "text-green-600" : ""}>
                    {order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
