"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, CreditCard, Plus, Trash2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useStore } from "@/components/store-context"
import { Footer } from "@/components/footer"

interface PaymentMethod {
  id: string
  type: "visa" | "mastercard" | "amex"
  lastFour: string
  expiry: string
  isDefault: boolean
}

export default function PaymentsPage() {
  const { isAuthenticated, addNotification } = useStore()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "1", type: "visa", lastFour: "4242", expiry: "12/27", isDefault: true },
  ])
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")

  const handleAddCard = () => {
    if (!cardNumber || !cardName || !expiry || !cvv) {
      addNotification("Please fill in all fields", "error")
      return
    }
    
    const lastFour = cardNumber.slice(-4)
    const type = cardNumber.startsWith("4") ? "visa" : cardNumber.startsWith("5") ? "mastercard" : "amex"
    
    const newCard: PaymentMethod = {
      id: Date.now().toString(),
      type,
      lastFour,
      expiry,
      isDefault: paymentMethods.length === 0,
    }
    
    setPaymentMethods([...paymentMethods, newCard])
    addNotification("Card added successfully", "success")
    setDialogOpen(false)
    setCardNumber("")
    setCardName("")
    setExpiry("")
    setCvv("")
  }

  const handleRemoveCard = (id: string) => {
    setPaymentMethods(paymentMethods.filter((m) => m.id !== id))
    addNotification("Card removed", "info")
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((m) => ({
        ...m,
        isDefault: m.id === id,
      }))
    )
    addNotification("Default payment method updated", "success")
  }

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return "VISA"
      case "mastercard":
        return "MC"
      case "amex":
        return "AMEX"
      default:
        return "CARD"
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <CreditCard className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Payment Options</h1>
          <p className="text-muted-foreground mb-6">
            Sign in to manage your payment methods.
          </p>
          <Link href="/signin">
            <Button className="bg-primary hover:bg-primary/90">Sign In</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/account" className="inline-flex items-center text-amazon-teal hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Account
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            Payment Options
          </h1>
        </div>

        {/* Payment methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add new card */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Card className="border-dashed border-2 hover:border-primary cursor-pointer transition-colors">
                <CardContent className="p-6 flex flex-col items-center justify-center min-h-[180px] text-center">
                  <div className="p-4 rounded-full bg-muted mb-4">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">Add a payment method</h3>
                </CardContent>
              </Card>
            </DialogTrigger>
            
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new card</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card number</Label>
                  <Input
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on card</Label>
                  <Input
                    id="cardName"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Full name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry date</Label>
                    <Input
                      id="expiry"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-lg text-xs text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Demo Mode</p>
                  <p>This is a demo. No real card information is stored.</p>
                </div>
                <Button onClick={handleAddCard} className="w-full bg-primary hover:bg-primary/90">
                  Add Card
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Existing cards */}
          {paymentMethods.map((method) => (
            <Card key={method.id} className={method.isDefault ? "ring-2 ring-primary" : ""}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="text-xs font-bold bg-secondary text-secondary-foreground px-2 py-1 rounded">
                      {getCardIcon(method.type)}
                    </span>
                    **** {method.lastFour}
                  </CardTitle>
                  {method.isDefault && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Expires {method.expiry}
                </p>
                <div className="flex gap-2">
                  {!method.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(method.id)}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Set as default
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveCard(method.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gift card balance */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Gift Card Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">$0.00</p>
                <p className="text-sm text-muted-foreground">Available balance</p>
              </div>
              <Link href="/gift-cards">
                <Button variant="outline">Add Gift Card</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
