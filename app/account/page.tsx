"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Shield,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useStore } from "@/components/store-context"
import { Footer } from "@/components/footer"

const accountSections = [
  {
    title: "Your Orders",
    description: "Track, return, or buy things again",
    icon: Package,
    href: "/orders",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Login & Security",
    description: "Edit login, name, and mobile number",
    icon: Shield,
    href: "/account/security",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Your Addresses",
    description: "Edit addresses for orders and gifts",
    icon: MapPin,
    href: "/account/addresses",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Payment Options",
    description: "Edit or add payment methods",
    icon: CreditCard,
    href: "/account/payments",
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Your Wishlist",
    description: "View and manage your saved items",
    icon: Heart,
    href: "/wishlist",
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Customer Service",
    description: "Browse help topics and contact us",
    icon: HelpCircle,
    href: "/help",
    color: "bg-teal-100 text-teal-600",
  },
]

export default function AccountPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout, orders, wishlist, recentlyViewed } = useStore()

  const handleSignOut = () => {
    logout()
    router.push("/")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your Account</h1>
          <p className="text-muted-foreground mb-6">
            Sign in to access your account settings and order history.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signin">
              <Button className="bg-primary hover:bg-primary/90">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline">Create Account</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Your Account</h1>
            <p className="text-muted-foreground">
              Hello, {user?.name || "Customer"}
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{orders.length}</p>
                <p className="text-sm text-muted-foreground">Orders</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-full bg-red-100">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{wishlist.length}</p>
                <p className="text-sm text-muted-foreground">Wishlist</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{recentlyViewed.length}</p>
                <p className="text-sm text-muted-foreground">Viewed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-100">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Addresses</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account sections grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {accountSections.map((section) => (
            <Link key={section.title} href={section.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className={`p-3 rounded-full ${section.color}`}>
                    <section.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium mb-1">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent orders */}
        {orders.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Link href="/orders" className="text-sm text-amazon-teal hover:underline">
                View all orders
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <Link
                    key={order.id}
                    href={`/orders/${order.id}`}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div>
                      <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} items - ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace("_", " ")}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  )
}
