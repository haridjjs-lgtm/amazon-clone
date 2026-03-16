"use client"

import Link from "next/link"
import { ArrowLeft, DollarSign, Users, TrendingUp, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"

const benefits = [
  { title: "Earn Up to 10%", description: "Commission on qualifying purchases", icon: DollarSign },
  { title: "Millions of Products", description: "Promote from our entire catalog", icon: Users },
  { title: "Real-Time Reporting", description: "Track clicks, sales, and earnings", icon: TrendingUp },
]

const steps = [
  "Sign up for the Associates Program",
  "Get approved within 24 hours",
  "Create affiliate links for products",
  "Share links on your website, blog, or social media",
  "Earn commissions on qualifying purchases",
]

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/sell" className="inline-flex items-center gap-2 text-secondary-foreground/70 hover:text-secondary-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Sell
          </Link>
          <h1 className="text-4xl font-bold mb-4">Become an Affiliate</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-2xl">
            Earn money by promoting Nile products. Join the world&apos;s largest affiliate program.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit) => (
              <Card key={benefit.title}>
                <CardContent className="pt-6 text-center">
                  <benefit.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                Join Now - It&apos;s Free
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
