"use client"

import { useState } from "react"
import Link from "next/link"
import {
  HelpCircle,
  Package,
  CreditCard,
  Truck,
  RotateCcw,
  User,
  Shield,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  Search,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Footer } from "@/components/footer"

const helpTopics = [
  {
    icon: Package,
    title: "Your Orders",
    description: "Track, cancel, or return orders",
    links: [
      { label: "Track your order", href: "/orders" },
      { label: "Cancel an order", href: "/orders" },
      { label: "Return or replace items", href: "/help/returns" },
    ],
  },
  {
    icon: Truck,
    title: "Shipping & Delivery",
    description: "Delivery options and tracking",
    links: [
      { label: "Shipping rates", href: "/help/shipping" },
      { label: "Delivery times", href: "/help/shipping" },
      { label: "Missing package", href: "/help/shipping" },
    ],
  },
  {
    icon: RotateCcw,
    title: "Returns & Refunds",
    description: "Return policies and refund status",
    links: [
      { label: "Return policy", href: "/help/returns" },
      { label: "Start a return", href: "/orders" },
      { label: "Refund status", href: "/orders" },
    ],
  },
  {
    icon: CreditCard,
    title: "Payment & Gift Cards",
    description: "Payment methods and gift cards",
    links: [
      { label: "Payment methods", href: "/account/payments" },
      { label: "Gift card balance", href: "/gift-cards" },
      { label: "Promo codes", href: "/help/payments" },
    ],
  },
  {
    icon: User,
    title: "Account Settings",
    description: "Manage your account",
    links: [
      { label: "Your profile", href: "/account" },
      { label: "Change password", href: "/account/security" },
      { label: "Address book", href: "/account/addresses" },
    ],
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Keep your account safe",
    links: [
      { label: "Privacy settings", href: "/privacy" },
      { label: "Two-step verification", href: "/account/security" },
      { label: "Report suspicious activity", href: "/help/security" },
    ],
  },
]

const faqs = [
  {
    question: "How do I track my order?",
    answer:
      "Go to Your Orders and select the order you want to track. You'll see the current status and tracking number if available. You can also track your package directly through our shipping partner's website.",
  },
  {
    question: "What is the return policy?",
    answer:
      "Most items can be returned within 30 days of delivery for a full refund. Some categories like electronics have a 15-day return window. Items must be in original condition with all tags attached.",
  },
  {
    question: "How do I change or cancel my order?",
    answer:
      "You can modify or cancel your order if it hasn't shipped yet. Go to Your Orders, find the order, and click 'Cancel items' or 'Change order'. Once shipped, you'll need to wait for delivery and then return the item.",
  },
  {
    question: "When will I receive my refund?",
    answer:
      "Refunds are typically processed within 3-5 business days after we receive your return. It may take an additional 5-10 business days for the refund to appear in your account, depending on your payment method.",
  },
  {
    question: "How do I use a promo code?",
    answer:
      "Enter your promo code in the 'Gift cards & promotional codes' box on the checkout page and click 'Apply'. The discount will be reflected in your order total if the code is valid and applicable.",
  },
  {
    question: "How do I contact customer service?",
    answer:
      "You can reach our customer service team 24/7 through live chat, email, or phone. Scroll down to find our contact options. We typically respond to emails within 24 hours.",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-secondary text-secondary-foreground py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <HelpCircle className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">How can we help you?</h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg bg-card text-card-foreground"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick actions for signed-in users */}
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-medium">Need help with a recent order?</h2>
              <p className="text-sm text-muted-foreground">
                View your orders to track, return, or get help with items.
              </p>
            </div>
            <Link href="/orders">
              <Button className="bg-primary hover:bg-primary/90">
                Your Orders
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Help topics grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse Help Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpTopics.map((topic) => (
              <Card key={topic.title} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <topic.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{topic.title}</h3>
                      <p className="text-xs text-muted-foreground font-normal">
                        {topic.description}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {topic.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-amazon-teal hover:underline flex items-center gap-1"
                        >
                          {link.label}
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          {filteredFaqs.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                No FAQs match your search. Try different keywords or browse help topics above.
              </p>
            </Card>
          ) : (
            <Accordion type="single" collapsible className="space-y-2">
              {filteredFaqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </section>

        {/* Contact options */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-medium mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with a customer service representative
                </p>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-4">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-medium mb-2">Phone Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Call us at 1-800-NILE-123
                </p>
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="p-4 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                  <Mail className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-medium mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We&apos;ll respond within 24 hours
                </p>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
