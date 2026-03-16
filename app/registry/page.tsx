"use client"

import Link from "next/link"
import { Heart, Baby, Home, GraduationCap, Gift, Search, Plus, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Footer } from "@/components/footer"

const registryTypes = [
  {
    icon: Heart,
    name: "Wedding Registry",
    description: "Create your dream wedding registry with millions of products",
    color: "bg-pink-100 text-pink-600",
    href: "/registry/wedding",
  },
  {
    icon: Baby,
    name: "Baby Registry",
    description: "Everything you need for your growing family",
    color: "bg-blue-100 text-blue-600",
    href: "/registry/baby",
  },
  {
    icon: Home,
    name: "Housewarming",
    description: "Furnish your new home with items you love",
    color: "bg-green-100 text-green-600",
    href: "/registry/housewarming",
  },
  {
    icon: GraduationCap,
    name: "Graduation",
    description: "Celebrate achievements with thoughtful gifts",
    color: "bg-purple-100 text-purple-600",
    href: "/registry/graduation",
  },
  {
    icon: Gift,
    name: "Birthday",
    description: "Create a wishlist for your special day",
    color: "bg-yellow-100 text-yellow-600",
    href: "/registry/birthday",
  },
]

export default function RegistryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Gift className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Nile Gift Registry
          </h1>
          <p className="text-lg opacity-90 mb-8">
            Create registries for life&apos;s special moments. Share with friends and family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signin">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90">
                <Plus className="h-5 w-5 mr-2" />
                Create a Registry
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Search className="h-5 w-5 mr-2" />
              Find a Registry
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Find a Registry</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Enter registrant's name"
                className="flex-1"
              />
              <Input
                placeholder="City or state (optional)"
                className="flex-1"
              />
              <Button className="bg-primary hover:bg-primary/90">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Registry types */}
        <h2 className="text-2xl font-bold mb-6">Choose Your Registry Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {registryTypes.map((type) => (
            <Link key={type.name} href={type.href}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className={`p-4 rounded-full ${type.color} mb-4`}>
                    <type.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{type.name}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Benefits */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              Why Create a Registry with Nile?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Millions of Products",
                  description: "Choose from our vast selection across every category",
                },
                {
                  title: "Easy to Share",
                  description: "Share your registry link with friends and family",
                },
                {
                  title: "Free Shipping",
                  description: "Free delivery on qualifying orders",
                },
              ].map((benefit) => (
                <div key={benefit.title} className="text-center">
                  <h3 className="font-medium mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "How do I create a registry?",
                a: "Sign in to your account, go to the registry page, and click 'Create a Registry'. Choose your registry type and start adding items!",
              },
              {
                q: "Can I have multiple registries?",
                a: "Yes! You can create different registries for different occasions.",
              },
              {
                q: "How do I share my registry?",
                a: "Each registry has a unique link that you can share via email, text, or social media.",
              },
              {
                q: "What happens to unpurchased items?",
                a: "You can keep your registry active as long as you like, and purchase remaining items yourself with a completion discount.",
              },
            ].map((faq) => (
              <Card key={faq.q}>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
