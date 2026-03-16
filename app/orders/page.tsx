"use client"

import Link from "next/link"
import Image from "next/image"
import { Package, Search, ChevronRight, RotateCcw, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStore } from "@/components/store-context"
import { Footer } from "@/components/footer"
import { useState } from "react"

export default function OrdersPage() {
  const { orders, isAuthenticated } = useStore()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrders = orders.filter((order) =>
    searchQuery
      ? order.id.includes(searchQuery) ||
        order.items.some((item) =>
          item.product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true
  )

  const activeOrders = filteredOrders.filter(
    (o) => !["delivered", "cancelled", "returned"].includes(o.status)
  )
  const completedOrders = filteredOrders.filter((o) => o.status === "delivered")
  const cancelledOrders = filteredOrders.filter(
    (o) => o.status === "cancelled" || o.status === "returned"
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-50"
      case "shipped":
      case "out_for_delivery":
        return "text-blue-600 bg-blue-50"
      case "cancelled":
      case "returned":
        return "text-red-600 bg-red-50"
      default:
        return "text-yellow-600 bg-yellow-50"
    }
  }

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your Orders</h1>
          <p className="text-muted-foreground mb-6">
            Sign in to view your order history and track deliveries.
          </p>
          <Link href="/signin">
            <Button className="bg-primary hover:bg-primary/90">Sign In</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const OrderCard = ({ order }: { order: typeof orders[0] }) => (
    <Card className="overflow-hidden">
      {/* Order header */}
      <div className="bg-muted px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
        <div className="flex flex-wrap gap-4 sm:gap-8">
          <div>
            <p className="text-muted-foreground">Order placed</p>
            <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total</p>
            <p className="font-medium">${order.total.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Ship to</p>
            <p className="font-medium">{order.shippingAddress.fullName}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">Order #{order.id.slice(0, 8).toUpperCase()}</p>
          <Link href={`/orders/${order.id}`} className="text-amazon-teal hover:underline">
            View order details
          </Link>
        </div>
      </div>
      
      {/* Order status */}
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </span>
          {order.status !== "delivered" && order.status !== "cancelled" && (
            <span className="text-sm text-muted-foreground">
              Expected delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
            </span>
          )}
        </div>
        
        {/* Order items */}
        <div className="space-y-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <Link href={`/product/${item.product.id}`}>
                <div className="w-20 h-20 relative bg-muted rounded overflow-hidden shrink-0">
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
                  <h3 className="font-medium text-sm hover:text-primary line-clamp-2">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                <p className="text-sm font-medium">${item.priceAtPurchase.toFixed(2)}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Link href={`/product/${item.product.id}`}>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Buy again
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick actions */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
          {order.trackingNumber && order.status !== "delivered" && (
            <Button variant="outline" size="sm">
              <Truck className="h-3 w-3 mr-1" />
              Track package
            </Button>
          )}
          <Link href={`/orders/${order.id}`}>
            <Button variant="outline" size="sm">
              Order details
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Your Orders</h1>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search all orders"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {orders.length === 0 ? (
          <Card className="text-center p-12">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">
              When you place orders, they will appear here.
            </p>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary/90">Start Shopping</Button>
            </Link>
          </Card>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Orders ({filteredOrders.length})</TabsTrigger>
              <TabsTrigger value="active">In Progress ({activeOrders.length})</TabsTrigger>
              <TabsTrigger value="completed">Delivered ({completedOrders.length})</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled ({cancelledOrders.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredOrders.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No orders found matching your search.</p>
                </Card>
              ) : (
                filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
              )}
            </TabsContent>
            
            <TabsContent value="active" className="space-y-4">
              {activeOrders.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No orders in progress.</p>
                </Card>
              ) : (
                activeOrders.map((order) => <OrderCard key={order.id} order={order} />)
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {completedOrders.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No delivered orders.</p>
                </Card>
              ) : (
                completedOrders.map((order) => <OrderCard key={order.id} order={order} />)
              )}
            </TabsContent>
            
            <TabsContent value="cancelled" className="space-y-4">
              {cancelledOrders.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No cancelled orders.</p>
                </Card>
              ) : (
                cancelledOrders.map((order) => <OrderCard key={order.id} order={order} />)
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
      <Footer />
    </div>
  )
}
