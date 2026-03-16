"use client"

import Link from "next/link"
import { ArrowLeft, Target, BarChart2, Eye, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"

const adTypes = [
  {
    title: "Sponsored Products",
    description: "Promote individual listings in search results and product pages",
    icon: Target,
  },
  {
    title: "Sponsored Brands",
    description: "Showcase your brand with custom headlines and multiple products",
    icon: Eye,
  },
  {
    title: "Display Ads",
    description: "Reach relevant audiences both on and off Nile",
    icon: BarChart2,
  },
  {
    title: "Video Ads",
    description: "Engage shoppers with streaming TV and online video ads",
    icon: Zap,
  },
]

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/sell" className="inline-flex items-center gap-2 text-secondary-foreground/70 hover:text-secondary-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Sell
          </Link>
          <h1 className="text-4xl font-bold mb-4">Advertise Your Products</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-2xl">
            Reach millions of customers and grow your sales with Nile Advertising.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Advertising Solutions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {adTypes.map((ad) => (
              <Card key={ad.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <ad.icon className="h-6 w-6 text-primary" />
                    {ad.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{ad.description}</p>
                  <Button variant="outline">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Advertising
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
