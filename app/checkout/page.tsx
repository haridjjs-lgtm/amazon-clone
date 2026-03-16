"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, CreditCard, MapPin, Truck, Shield, Lock, Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCart } from "@/components/cart-context"
import { useStore, Address } from "@/components/store-context"
import { Footer } from "@/components/footer"

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
]

const SHIPPING_OPTIONS = [
  { id: "standard", name: "Standard Shipping", price: 5.99, days: "5-7 business days" },
  { id: "express", name: "Express Shipping", price: 12.99, days: "2-3 business days" },
  { id: "overnight", name: "Overnight Shipping", price: 24.99, days: "Next business day" },
]

const PAYMENT_METHODS = [
  { id: "card", name: "Credit or Debit Card", icon: CreditCard },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { addresses, addAddress, createOrder, addNotification, isAuthenticated } = useStore()
  
  const [step, setStep] = useState(1)
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(
    addresses.findIndex((a) => a.isDefault) >= 0
      ? addresses.findIndex((a) => a.isDefault)
      : 0
  )
  const [showNewAddressForm, setShowNewAddressForm] = useState(addresses.length === 0)
  const [newAddress, setNewAddress] = useState<Address>({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
  })
  const [selectedShipping, setSelectedShipping] = useState("standard")
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const shippingOption = SHIPPING_OPTIONS.find((o) => o.id === selectedShipping)!
  const shippingCost = totalPrice >= 35 && selectedShipping === "standard" ? 0 : shippingOption.price
  const tax = totalPrice * 0.08
  const orderTotal = totalPrice + shippingCost + tax

  const selectedAddress = addresses[selectedAddressIndex] || newAddress

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add items to your cart to checkout.</p>
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90">Continue Shopping</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const handleAddressSubmit = () => {
    if (showNewAddressForm) {
      if (!newAddress.fullName || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode || !newAddress.phone) {
        addNotification("Please fill in all address fields", "error")
        return
      }
      addAddress(newAddress)
      setSelectedAddressIndex(addresses.length)
      setShowNewAddressForm(false)
    }
    setStep(2)
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    const orderItems = items.map((item) => ({
      product: item,
      quantity: item.quantity,
      priceAtPurchase: item.price,
    }))
    
    const order = createOrder(orderItems, selectedAddress, selectedPayment)
    clearCart()
    
    addNotification("Order placed successfully!", "success")
    router.push(`/orders/${order.id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary text-secondary-foreground py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold">nile</span>
            <span className="text-primary text-sm">.com</span>
          </Link>
          <h1 className="text-xl font-medium">Checkout</h1>
          <Lock className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 space-y-6">
            {/* Progress steps */}
            <div className="flex items-center gap-4 mb-8">
              {[
                { num: 1, label: "Address" },
                { num: 2, label: "Shipping" },
                { num: 3, label: "Payment" },
              ].map((s, idx) => (
                <div key={s.num} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step >= s.num
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.num ? <Check className="h-4 w-4" /> : s.num}
                  </div>
                  <span className={`ml-2 text-sm ${step >= s.num ? "font-medium" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                  {idx < 2 && <div className="w-8 h-px bg-border mx-4" />}
                </div>
              ))}
            </div>

            {/* Step 1: Address */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {addresses.length > 0 && !showNewAddressForm && (
                    <RadioGroup
                      value={selectedAddressIndex.toString()}
                      onValueChange={(v) => setSelectedAddressIndex(parseInt(v))}
                      className="space-y-3"
                    >
                      {addresses.map((addr, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-4 border rounded-lg">
                          <RadioGroupItem value={idx.toString()} id={`addr-${idx}`} />
                          <Label htmlFor={`addr-${idx}`} className="cursor-pointer flex-1">
                            <p className="font-medium">{addr.fullName}</p>
                            <p className="text-sm text-muted-foreground">
                              {addr.street}, {addr.city}, {addr.state} {addr.zipCode}
                            </p>
                            <p className="text-sm text-muted-foreground">Phone: {addr.phone}</p>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  
                  {!showNewAddressForm && addresses.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => setShowNewAddressForm(true)}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add a new address
                    </Button>
                  )}
                  
                  {showNewAddressForm && (
                    <div className="space-y-4 p-4 border rounded-lg">
                      <h4 className="font-medium">New Address</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Full name</Label>
                          <Input
                            value={newAddress.fullName}
                            onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                            placeholder="Full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone</Label>
                          <Input
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                            placeholder="Phone number"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Street address</Label>
                        <Input
                          value={newAddress.street}
                          onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                          placeholder="Street address"
                        />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Input
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            placeholder="City"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>State</Label>
                          <Select
                            value={newAddress.state}
                            onValueChange={(v) => setNewAddress({ ...newAddress, state: v })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="State" />
                            </SelectTrigger>
                            <SelectContent>
                              {US_STATES.map((state) => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>ZIP</Label>
                          <Input
                            value={newAddress.zipCode}
                            onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                            placeholder="ZIP"
                          />
                        </div>
                      </div>
                      {addresses.length > 0 && (
                        <Button
                          variant="ghost"
                          onClick={() => setShowNewAddressForm(false)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  )}
                  
                  <Button
                    onClick={handleAddressSubmit}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Continue to Shipping
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Shipping */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={selectedShipping}
                    onValueChange={setSelectedShipping}
                    className="space-y-3"
                  >
                    {SHIPPING_OPTIONS.map((option) => (
                      <div key={option.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <Label htmlFor={option.id} className="cursor-pointer">
                            <p className="font-medium">{option.name}</p>
                            <p className="text-sm text-muted-foreground">{option.days}</p>
                          </Label>
                        </div>
                        <span className="font-medium">
                          {totalPrice >= 35 && option.id === "standard" ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            `$${option.price.toFixed(2)}`
                          )}
                        </span>
                      </div>
                    ))}
                  </RadioGroup>
                  
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      <span className="font-medium">Credit or Debit Card</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Card number</Label>
                        <Input
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Name on card</Label>
                        <Input
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                          placeholder="Full name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Expiry date</Label>
                          <Input
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>CVV</Label>
                          <Input
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            placeholder="123"
                            maxLength={4}
                            type="password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">Demo Mode</p>
                    <p>This is a demo checkout. No real payment will be processed. Enter any card details to continue.</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      {isProcessing ? "Processing..." : `Place Order - $${orderTotal.toFixed(2)}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Order summary sidebar */}
          <div className="lg:w-80">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items preview */}
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 relative bg-muted rounded overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? "text-green-600" : ""}>
                      {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Order total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
                
                {/* Trust badges */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout - SSL encrypted</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
