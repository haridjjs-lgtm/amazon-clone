"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Gift, CreditCard, Mail, Printer, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useStore } from "@/components/store-context"
import { Footer } from "@/components/footer"

const GIFT_CARD_DESIGNS = [
  { id: "birthday", name: "Birthday", color: "from-pink-500 to-purple-500" },
  { id: "thank-you", name: "Thank You", color: "from-green-500 to-teal-500" },
  { id: "congrats", name: "Congratulations", color: "from-yellow-500 to-orange-500" },
  { id: "holiday", name: "Holiday", color: "from-red-500 to-green-500" },
  { id: "just-because", name: "Just Because", color: "from-blue-500 to-purple-500" },
  { id: "wedding", name: "Wedding", color: "from-pink-400 to-rose-500" },
]

const AMOUNTS = [25, 50, 75, 100, 150, 200, 500]

export default function GiftCardsPage() {
  const { addNotification, isAuthenticated } = useStore()
  const [deliveryType, setDeliveryType] = useState<"email" | "print" | "mail">("email")
  const [selectedDesign, setSelectedDesign] = useState(GIFT_CARD_DESIGNS[0].id)
  const [amount, setAmount] = useState(50)
  const [customAmount, setCustomAmount] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [senderName, setSenderName] = useState("")
  const [message, setMessage] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")

  const handlePurchase = () => {
    if (!isAuthenticated) {
      addNotification("Please sign in to purchase a gift card", "warning")
      return
    }
    
    const finalAmount = customAmount ? parseFloat(customAmount) : amount
    if (finalAmount < 1 || finalAmount > 2000) {
      addNotification("Amount must be between $1 and $2,000", "error")
      return
    }
    
    if (deliveryType === "email" && !recipientEmail) {
      addNotification("Please enter recipient email", "error")
      return
    }
    
    addNotification(`Gift card of $${finalAmount} created successfully!`, "success")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-orange-500 text-primary-foreground py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Gift className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Nile Gift Cards</h1>
          <p className="text-lg opacity-90">
            The perfect gift for any occasion. Choose from digital or physical cards.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gift card builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery type */}
            <Card>
              <CardHeader>
                <CardTitle>1. Choose Delivery Type</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={deliveryType}
                  onValueChange={(v) => setDeliveryType(v as typeof deliveryType)}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <Label
                    htmlFor="email"
                    className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      deliveryType === "email" ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value="email" id="email" className="sr-only" />
                    <Mail className="h-8 w-8 mb-2" />
                    <span className="font-medium">Email</span>
                    <span className="text-xs text-muted-foreground text-center">
                      Deliver instantly via email
                    </span>
                  </Label>
                  <Label
                    htmlFor="print"
                    className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      deliveryType === "print" ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value="print" id="print" className="sr-only" />
                    <Printer className="h-8 w-8 mb-2" />
                    <span className="font-medium">Print at Home</span>
                    <span className="text-xs text-muted-foreground text-center">
                      Print and give in person
                    </span>
                  </Label>
                  <Label
                    htmlFor="mail"
                    className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      deliveryType === "mail" ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value="mail" id="mail" className="sr-only" />
                    <CreditCard className="h-8 w-8 mb-2" />
                    <span className="font-medium">Physical Card</span>
                    <span className="text-xs text-muted-foreground text-center">
                      Ship a physical gift card
                    </span>
                  </Label>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Design selection */}
            <Card>
              <CardHeader>
                <CardTitle>2. Choose a Design</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {GIFT_CARD_DESIGNS.map((design) => (
                    <button
                      key={design.id}
                      onClick={() => setSelectedDesign(design.id)}
                      className={`relative aspect-video rounded-lg overflow-hidden ${
                        selectedDesign === design.id ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${design.color}`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Gift className="h-8 w-8 mx-auto mb-1" />
                          <span className="text-sm font-medium">{design.name}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Amount selection */}
            <Card>
              <CardHeader>
                <CardTitle>3. Select Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mb-4">
                  {AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => {
                        setAmount(amt)
                        setCustomAmount("")
                      }}
                      className={`py-3 px-2 rounded-lg border text-center font-medium transition-colors ${
                        amount === amt && !customAmount
                          ? "border-primary bg-primary text-primary-foreground"
                          : "hover:border-primary"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="custom" className="whitespace-nowrap">
                    Custom amount:
                  </Label>
                  <div className="relative flex-1 max-w-xs">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <Input
                      id="custom"
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="pl-7"
                      placeholder="1.00 - 2,000.00"
                      min={1}
                      max={2000}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Gift card amounts can range from $1.00 to $2,000.00
                </p>
              </CardContent>
            </Card>

            {/* Recipient details */}
            <Card>
              <CardHeader>
                <CardTitle>4. Add Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {deliveryType === "email" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipientEmail">Recipient Email</Label>
                        <Input
                          id="recipientEmail"
                          type="email"
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                          placeholder="recipient@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deliveryDate">Delivery Date (optional)</Label>
                        <Input
                          id="deliveryDate"
                          type="date"
                          value={deliveryDate}
                          onChange={(e) => setDeliveryDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Recipient Name</Label>
                    <Input
                      id="recipientName"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Their name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderName">Your Name</Label>
                    <Input
                      id="senderName"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message (optional)</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add a personal message..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview and checkout */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Gift card preview */}
                <div
                  className={`aspect-video rounded-lg overflow-hidden bg-gradient-to-br ${
                    GIFT_CARD_DESIGNS.find((d) => d.id === selectedDesign)?.color
                  }`}
                >
                  <div className="h-full flex flex-col items-center justify-center text-white p-4">
                    <Gift className="h-10 w-10 mb-2" />
                    <p className="text-3xl font-bold mb-1">
                      ${customAmount || amount}
                    </p>
                    <p className="text-sm opacity-90">Nile Gift Card</p>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Design</span>
                    <span>{GIFT_CARD_DESIGNS.find((d) => d.id === selectedDesign)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="capitalize">{deliveryType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span>${customAmount || amount}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePurchase}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  Purchase Gift Card
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Gift cards never expire and have no fees.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Gift card info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Check Your Balance",
              description: "Enter your gift card number to check your current balance.",
              link: "#",
            },
            {
              title: "Redeem a Gift Card",
              description: "Add a gift card to your account to use for purchases.",
              link: "#",
            },
            {
              title: "Corporate Gift Cards",
              description: "Buy gift cards in bulk for your business or organization.",
              link: "#",
            },
          ].map((item) => (
            <Card key={item.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
