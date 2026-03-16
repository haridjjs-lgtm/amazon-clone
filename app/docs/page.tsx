"use client"

import Link from "next/link"
import { useState } from "react"
import { 
  ChevronRight, 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  CreditCard, 
  Truck,
  Package,
  Gift,
  Store,
  HelpCircle,
  Code,
  Database,
  Layers,
  Zap
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"

const sections = [
  {
    id: "overview",
    title: "Overview",
    icon: Layers,
    content: `
      This is a fully functional Amazon clone called "Nile" built with Next.js 15, React, and Tailwind CSS.
      It demonstrates e-commerce patterns including product browsing, search, cart management, checkout,
      user authentication, wishlists, order tracking, and more.
    `,
  },
  {
    id: "architecture",
    title: "Architecture",
    icon: Code,
    subsections: [
      {
        title: "Tech Stack",
        items: [
          "Next.js 15 with App Router for server-side rendering and routing",
          "React 19 with hooks for state management",
          "Tailwind CSS v4 for styling with custom design tokens",
          "shadcn/ui components for consistent UI elements",
          "Context API for global state (cart, auth, wishlist)",
          "Local storage for data persistence (demo mode)",
        ],
      },
      {
        title: "Project Structure",
        items: [
          "/app - Page routes and layouts",
          "/components - Reusable React components",
          "/lib - Utility functions and data",
          "/components/ui - shadcn UI components",
        ],
      },
    ],
  },
  {
    id: "features",
    title: "Features Guide",
    icon: Zap,
    subsections: [
      {
        title: "Product Browsing",
        description: "Browse products by category, search, or featured sections",
        features: [
          "Homepage with hero banner, deals, and category grid",
          "Product listing with filters (category, price, rating)",
          "Sort by featured, price, rating, reviews",
          "Grid/List view toggle",
          "Product detail pages with images, descriptions, ratings",
        ],
      },
      {
        title: "Search System",
        description: "Full-text search across all products",
        features: [
          "Real-time search suggestions as you type",
          "Category filter in search dropdown",
          "Search history tracking (persisted)",
          "Results page with filters and sorting",
          "Highlights matching terms in results",
        ],
      },
      {
        title: "Shopping Cart",
        description: "Full cart functionality with quantity management",
        features: [
          "Add/remove items from any page",
          "Quantity adjustment in cart",
          "Price calculation with savings display",
          "Persistent cart (survives page refresh)",
          "Cart badge shows item count in header",
        ],
      },
      {
        title: "Wishlist",
        description: "Save products for later",
        features: [
          "Add/remove from product cards or detail pages",
          "Heart icon indicates wishlist status",
          "Dedicated wishlist page",
          "Move items from wishlist to cart",
          "Persistent across sessions",
        ],
      },
      {
        title: "User Authentication",
        description: "Demo authentication system",
        features: [
          "Sign up with name, email, password",
          "Sign in with email/password",
          "Password visibility toggle",
          "Session persistence",
          "Account management pages",
        ],
      },
      {
        title: "Checkout Flow",
        description: "Complete checkout experience",
        features: [
          "Shipping address selection/creation",
          "Payment method selection",
          "Order summary with totals",
          "Order placement and confirmation",
          "Order history tracking",
        ],
      },
      {
        title: "Order Management",
        description: "Track and manage orders",
        features: [
          "Order history list",
          "Order detail pages",
          "Order status tracking",
          "Estimated delivery dates",
          "Reorder functionality",
        ],
      },
    ],
  },
  {
    id: "state",
    title: "State Management",
    icon: Database,
    content: `
      The app uses React Context for global state management with two main contexts:
      
      **CartContext** - Manages shopping cart state:
      - items: Array of products with quantities
      - addToCart(product): Add item to cart
      - removeFromCart(id): Remove item from cart
      - updateQuantity(id, qty): Update item quantity
      - clearCart(): Empty the cart
      - totalItems: Computed total item count
      - totalPrice: Computed total price
      
      **StoreContext** - Manages user/app state:
      - user: Current user object
      - isAuthenticated: Auth status
      - login(email, password): Sign in
      - register(name, email, password): Sign up
      - logout(): Sign out
      - wishlist: Array of saved products
      - addToWishlist(product): Save product
      - removeFromWishlist(id): Remove saved product
      - orders: Array of past orders
      - addOrder(order): Place new order
      - addresses: Saved addresses
      - addAddress(address): Add new address
      - searchHistory: Recent searches
      - recentlyViewed: Recently viewed products
    `,
  },
  {
    id: "algorithms",
    title: "Algorithms & Logic",
    icon: Code,
    subsections: [
      {
        title: "Product Search",
        description: "Multi-field fuzzy matching",
        code: `
// Search matches against:
// - Product name (highest priority)
// - Description
// - Category
// - Case-insensitive matching
function searchProducts(query) {
  const terms = query.toLowerCase().split(' ')
  return products.filter(product => 
    terms.every(term =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    )
  )
}`,
      },
      {
        title: "Price Calculation",
        description: "Cart totals with savings",
        code: `
// Calculate totals
const subtotal = items.reduce(
  (sum, item) => sum + item.price * item.quantity, 0
)

// Calculate savings from original prices
const savings = items.reduce((sum, item) => {
  if (item.originalPrice) {
    return sum + (item.originalPrice - item.price) * item.quantity
  }
  return sum
}, 0)

// Free shipping threshold
const freeShipping = subtotal >= 35`,
      },
      {
        title: "Product Filtering",
        description: "Multi-criteria filtering",
        code: `
// Apply filters
let filtered = products

// Category filter
if (category !== 'All') {
  filtered = filtered.filter(p => p.category === category)
}

// Price range filter
filtered = filtered.filter(p => 
  p.price >= minPrice && p.price <= maxPrice
)

// Rating filter
if (minRating > 0) {
  filtered = filtered.filter(p => p.rating >= minRating)
}

// Prime only
if (primeOnly) {
  filtered = filtered.filter(p => p.prime)
}`,
      },
      {
        title: "Product Sorting",
        description: "Multiple sort options",
        code: `
// Sort products
switch(sortBy) {
  case 'price-low':
    products.sort((a, b) => a.price - b.price)
    break
  case 'price-high':
    products.sort((a, b) => b.price - a.price)
    break
  case 'rating':
    products.sort((a, b) => b.rating - a.rating)
    break
  case 'reviews':
    products.sort((a, b) => b.reviews - a.reviews)
    break
  default: // featured
    products.sort((a, b) => b.featured - a.featured)
}`,
      },
      {
        title: "Discount Calculation",
        description: "Percentage off display",
        code: `
// Calculate discount percentage
const discount = product.originalPrice
  ? Math.round(
      ((product.originalPrice - product.price) / 
       product.originalPrice) * 100
    )
  : 0

// Display: "25% off"`,
      },
    ],
  },
  {
    id: "pages",
    title: "All Pages",
    icon: Layers,
    pages: [
      { path: "/", name: "Homepage", description: "Main landing page with featured products and categories" },
      { path: "/products", name: "Products", description: "Browse all products with filters and sorting" },
      { path: "/product/[id]", name: "Product Detail", description: "Individual product page with full details" },
      { path: "/search", name: "Search Results", description: "Search results with filters" },
      { path: "/cart", name: "Shopping Cart", description: "View and manage cart items" },
      { path: "/checkout", name: "Checkout", description: "Complete your purchase" },
      { path: "/wishlist", name: "Wishlist", description: "Saved products for later" },
      { path: "/orders", name: "Orders", description: "Order history list" },
      { path: "/orders/[id]", name: "Order Detail", description: "Individual order tracking" },
      { path: "/signin", name: "Sign In", description: "User login page" },
      { path: "/signup", name: "Sign Up", description: "New user registration" },
      { path: "/account", name: "Account", description: "Account overview and settings" },
      { path: "/account/addresses", name: "Addresses", description: "Manage shipping addresses" },
      { path: "/account/payments", name: "Payments", description: "Manage payment methods" },
      { path: "/account/security", name: "Security", description: "Password and security settings" },
      { path: "/deals", name: "Today's Deals", description: "Current deals and discounts" },
      { path: "/gift-cards", name: "Gift Cards", description: "Purchase and redeem gift cards" },
      { path: "/registry", name: "Registry", description: "Create and manage gift registries" },
      { path: "/sell", name: "Sell", description: "Information about selling on Nile" },
      { path: "/sell/affiliate", name: "Affiliate", description: "Affiliate program information" },
      { path: "/sell/advertise", name: "Advertise", description: "Advertising solutions" },
      { path: "/sell/publish", name: "Self-Publish", description: "Publishing information" },
      { path: "/help", name: "Help Center", description: "Customer service and FAQs" },
      { path: "/about", name: "About", description: "Company information" },
      { path: "/about/careers", name: "Careers", description: "Job listings" },
      { path: "/about/blog", name: "Blog", description: "Company blog" },
      { path: "/about/investors", name: "Investors", description: "Investor relations" },
    ],
  },
]

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Nile Documentation</h1>
          <p className="text-secondary-foreground/80">
            Complete guide to features, architecture, and logic
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            <nav className="sticky top-20 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-left transition-colors ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <section.icon className="h-4 w-4" />
                  {section.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {sections.map((section) => (
              <div
                key={section.id}
                className={activeSection === section.id ? "block" : "hidden"}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <section.icon className="h-6 w-6 text-primary" />
                  {section.title}
                </h2>

                {section.content && (
                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground whitespace-pre-line">
                        {section.content}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {section.subsections && (
                  <div className="space-y-6">
                    {section.subsections.map((sub, idx) => (
                      <Card key={idx}>
                        <CardHeader>
                          <CardTitle className="text-lg">{sub.title}</CardTitle>
                          {sub.description && (
                            <p className="text-sm text-muted-foreground">
                              {sub.description}
                            </p>
                          )}
                        </CardHeader>
                        <CardContent>
                          {sub.items && (
                            <ul className="space-y-2">
                              {sub.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <ChevronRight className="h-4 w-4 mt-1 text-primary shrink-0" />
                                  <span className="text-foreground">{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {sub.features && (
                            <ul className="space-y-2">
                              {sub.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <ChevronRight className="h-4 w-4 mt-1 text-primary shrink-0" />
                                  <span className="text-foreground">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {sub.code && (
                            <pre className="bg-secondary text-secondary-foreground p-4 rounded-lg overflow-x-auto text-sm mt-4">
                              <code>{sub.code.trim()}</code>
                            </pre>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {section.pages && (
                  <div className="grid gap-3">
                    {section.pages.map((page, idx) => (
                      <Link key={idx} href={page.path.replace("[id]", "1")}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="py-4 flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{page.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {page.path}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {page.description}
                              </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
