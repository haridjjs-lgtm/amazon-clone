"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"

const posts = [
  {
    id: 1,
    title: "Introducing Same-Day Delivery in 50 New Cities",
    excerpt: "We're excited to announce the expansion of our same-day delivery service to 50 new cities across the country.",
    category: "News",
    author: "Sarah Johnson",
    date: "March 10, 2026",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=400&fit=crop",
  },
  {
    id: 2,
    title: "How We're Making Shopping More Sustainable",
    excerpt: "Learn about our initiatives to reduce packaging waste and carbon emissions across our supply chain.",
    category: "Sustainability",
    author: "Michael Chen",
    date: "March 5, 2026",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=400&fit=crop",
  },
  {
    id: 3,
    title: "New AI-Powered Product Recommendations",
    excerpt: "Discover how we're using machine learning to help you find exactly what you're looking for.",
    category: "Technology",
    author: "Emily Davis",
    date: "February 28, 2026",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Supporting Small Businesses on Our Platform",
    excerpt: "How we're helping small businesses reach millions of customers through our marketplace.",
    category: "Sellers",
    author: "David Kim",
    date: "February 20, 2026",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Behind the Scenes: Our Fulfillment Centers",
    excerpt: "Take a tour of our state-of-the-art fulfillment centers and see how orders get to your door.",
    category: "Operations",
    author: "Lisa Park",
    date: "February 15, 2026",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Customer Stories: How Nile Changed Their Lives",
    excerpt: "Real stories from customers about how shopping with us has made a difference in their daily lives.",
    category: "Community",
    author: "James Wilson",
    date: "February 8, 2026",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
  },
]

const categories = ["All", "News", "Technology", "Sustainability", "Sellers", "Operations", "Community"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/about" className="inline-flex items-center gap-2 text-secondary-foreground/70 hover:text-secondary-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to About
          </Link>
          <h1 className="text-4xl font-bold mb-4">Nile Blog</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-2xl">
            News, updates, and stories from across our company.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Badge key={cat} variant="outline" className="cursor-pointer hover:bg-muted shrink-0">
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image
                  src={posts[0].image}
                  alt={posts[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4">{posts[0].category}</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{posts[0].title}</h2>
                <p className="text-muted-foreground mb-4">{posts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {posts[0].author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {posts[0].date}
                  </span>
                </div>
                <span className="text-primary flex items-center gap-1 cursor-pointer hover:underline">
                  Read more <ArrowRight className="h-4 w-4" />
                </span>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Recent Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                  <h3 className="font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
