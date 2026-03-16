"use client"

import Link from "next/link"
import { ArrowLeft, BookOpen, DollarSign, Globe, Smartphone, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"

const features = [
  { title: "Keep Control", description: "You set the price, retain your rights, and make changes anytime", icon: BookOpen },
  { title: "Earn More", description: "Earn up to 70% royalty on sales to customers worldwide", icon: DollarSign },
  { title: "Reach Readers", description: "Reach millions of readers in Nile stores worldwide", icon: Globe },
  { title: "Go Digital", description: "Publish eBooks and reach readers on any device", icon: Smartphone },
]

const steps = [
  { title: "Write", description: "Create your manuscript in any format" },
  { title: "Format", description: "Use our free tools to prepare your book" },
  { title: "Publish", description: "Upload and publish in minutes" },
  { title: "Promote", description: "Market your book to millions" },
]

export default function PublishPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/sell" className="inline-flex items-center gap-2 text-secondary-foreground/70 hover:text-secondary-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Sell
          </Link>
          <h1 className="text-4xl font-bold mb-4">Self-Publish with Nile</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-2xl">
            Publish your books and reach millions of readers. Free to use, no upfront costs.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardContent className="pt-6">
                  <feature.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">How to Get Started</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                {steps.map((step, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                      {idx + 1}
                    </div>
                    <h4 className="font-bold mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Publishing
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
