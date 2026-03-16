"use client"

import Link from "next/link"
import { Building, Users, Globe, Award, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"

const stats = [
  { label: "Products Available", value: "350M+", icon: Building },
  { label: "Active Customers", value: "300M+", icon: Users },
  { label: "Countries Served", value: "180+", icon: Globe },
  { label: "Years in Business", value: "30+", icon: Award },
]

const values = [
  {
    title: "Customer Obsession",
    description: "We start with the customer and work backwards. We work vigorously to earn and keep customer trust."
  },
  {
    title: "Invent and Simplify",
    description: "We expect and require innovation and invention from our teams and always find ways to simplify."
  },
  {
    title: "Deliver Results",
    description: "We focus on the key inputs and deliver them with the right quality and in a timely fashion."
  },
  {
    title: "Think Big",
    description: "Thinking small is a self-fulfilling prophecy. We create and communicate a bold direction that inspires results."
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            About Nile
          </h1>
          <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto text-pretty">
            We are guided by four principles: customer obsession rather than competitor focus, 
            passion for invention, commitment to operational excellence, and long-term thinking.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Nile was founded in 1994 with the mission to be Earth&apos;s most customer-centric company. 
              What started as an online bookstore has grown into one of the world&apos;s most valuable companies, 
              offering millions of products across dozens of categories.
            </p>
            <p className="text-muted-foreground mb-4">
              Today, we offer customers low prices, vast selection, and convenience through our websites 
              and physical stores. We also provide cloud computing services, advertising services, and more.
            </p>
            <p className="text-muted-foreground">
              Our success is built on a foundation of innovation, customer trust, and a relentless focus 
              on delivering value to our customers, sellers, and partners.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value) => (
              <Card key={value.title}>
                <CardHeader>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Learn More</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/about/careers">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">Careers</h3>
                  <p className="text-muted-foreground mb-4">
                    Join our team and help us build the future of commerce.
                  </p>
                  <span className="text-primary flex items-center gap-1">
                    View openings <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/about/blog">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">Blog</h3>
                  <p className="text-muted-foreground mb-4">
                    Stay up to date with the latest news and announcements.
                  </p>
                  <span className="text-primary flex items-center gap-1">
                    Read articles <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/about/investors">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">Investors</h3>
                  <p className="text-muted-foreground mb-4">
                    Financial reports, press releases, and investor resources.
                  </p>
                  <span className="text-primary flex items-center gap-1">
                    View reports <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
