"use client"

import Link from "next/link"
import { Store, Package, Truck, BarChart3, Shield, Globe, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"

const benefits = [
  {
    icon: Globe,
    title: "Reach Millions of Customers",
    description: "Sell to customers across the country with our massive marketplace.",
  },
  {
    icon: Truck,
    title: "Fulfillment Services",
    description: "Let us handle storage, packing, and shipping with Fulfillment by Nile.",
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    description: "Track sales, inventory, and customer insights with our dashboard.",
  },
  {
    icon: Shield,
    title: "Seller Protection",
    description: "Our policies help protect you from fraud and unfair claims.",
  },
]

const plans = [
  {
    name: "Individual",
    price: "$0.99",
    period: "per item sold",
    description: "For sellers with fewer than 40 items per month",
    features: [
      "List products in 20+ categories",
      "Basic selling tools",
      "Pay only when you sell",
      "Access to millions of customers",
    ],
  },
  {
    name: "Professional",
    price: "$39.99",
    period: "per month",
    description: "For sellers with more than 40 items per month",
    features: [
      "Everything in Individual",
      "Advanced selling tools",
      "Bulk listing and management",
      "Advertising tools",
      "API access",
      "Custom shipping rates",
    ],
    popular: true,
  },
]

export default function SellPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-r from-secondary to-sidebar text-secondary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Store className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Sell on Nile
          </h1>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join millions of sellers and reach customers worldwide. Start your business today with our powerful selling tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signin">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Selling
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-secondary-foreground/30 hover:bg-secondary-foreground/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why Sell on Nile?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing plans */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Choose Your Selling Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={plan.popular ? "border-primary shadow-lg" : ""}
              >
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>
                    <span className="text-xl">{plan.name}</span>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground text-base font-normal">
                        {" "}{plan.period}
                      </span>
                    </div>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signin">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-primary hover:bg-primary/90"
                          : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Create Your Account",
                description: "Sign up and choose your selling plan. Verify your identity and payment info.",
              },
              {
                step: 2,
                title: "List Your Products",
                description: "Add product details, photos, and pricing. Use our tools to optimize listings.",
              },
              {
                step: 3,
                title: "Start Selling",
                description: "Customers find and buy your products. Ship directly or use our fulfillment services.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Seller resources */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Seller Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Seller University", description: "Free courses to help you succeed" },
              { title: "Seller Forums", description: "Connect with other sellers" },
              { title: "Help Center", description: "Get answers to common questions" },
              { title: "Fee Calculator", description: "Estimate your selling fees" },
              { title: "Brand Registry", description: "Protect your brand on Nile" },
              { title: "Advertising", description: "Promote your products to more customers" },
            ].map((resource) => (
              <Card key={resource.title} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
