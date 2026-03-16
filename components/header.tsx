"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, MapPin, ShoppingCart, Menu, ChevronDown, Heart, User, Package, LogOut, X, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCart } from "@/components/cart-context"
import { useStore } from "@/components/store-context"
import { useState, useEffect, useRef } from "react"
import { searchProducts } from "@/lib/products"

const categories = [
  "All",
  "Electronics",
  "Computers",
  "Smart Home",
  "Books",
  "Fashion",
  "Home & Kitchen",
  "Sports",
  "Toys & Games",
]

const navLinks = [
  { label: "Today's Deals", href: "/deals" },
  { label: "Customer Service", href: "/help" },
  { label: "Registry", href: "/registry" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Sell", href: "/sell" },
]

const menuCategories = [
  { name: "Electronics", href: "/products?category=Electronics" },
  { name: "Computers", href: "/products?category=Computers" },
  { name: "Smart Home", href: "/products?category=Smart+Home" },
  { name: "Home & Kitchen", href: "/products?category=Home+%26+Kitchen" },
  { name: "Fashion", href: "/products?category=Fashion" },
  { name: "Sports", href: "/products?category=Sports" },
  { name: "Books", href: "/products?category=Books" },
  { name: "Toys & Games", href: "/products?category=Toys+%26+Games" },
]

export function Header() {
  const router = useRouter()
  const { totalItems } = useCart()
  const { user, isAuthenticated, logout, searchHistory, addToSearchHistory, addresses } = useStore()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // Get default address
  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0]

  // Handle search suggestions
  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = searchProducts(searchQuery)
      const suggestions = [...new Set(results.map((p) => p.name))].slice(0, 5)
      setSearchSuggestions(suggestions)
    } else {
      setSearchSuggestions([])
    }
  }, [searchQuery])

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      addToSearchHistory(searchQuery.trim())
      const categoryParam = selectedCategory !== "All" ? `&category=${encodeURIComponent(selectedCategory)}` : ""
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}${categoryParam}`)
      setShowSearchSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    addToSearchHistory(suggestion)
    const categoryParam = selectedCategory !== "All" ? `&category=${encodeURIComponent(selectedCategory)}` : ""
    router.push(`/search?q=${encodeURIComponent(suggestion)}${categoryParam}`)
    setShowSearchSuggestions(false)
  }

  return (
    <header className="bg-secondary text-secondary-foreground sticky top-0 z-50">
      {/* Main header */}
      <div className="flex items-center gap-2 px-2 py-2 md:gap-4 md:px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 p-2 hover:outline hover:outline-1 hover:outline-secondary-foreground rounded-sm shrink-0">
          <span className="text-xl md:text-2xl font-bold">nile</span>
          <span className="text-primary text-xs">.com</span>
        </Link>

        {/* Deliver to */}
        <Link
          href="/account/addresses"
          className="hidden md:flex items-center gap-1 p-2 hover:outline hover:outline-1 hover:outline-secondary-foreground rounded-sm cursor-pointer"
        >
          <MapPin className="h-5 w-5 text-secondary-foreground/70" />
          <div className="text-xs leading-tight">
            <span className="text-secondary-foreground/70">Deliver to</span>
            <p className="font-bold">
              {defaultAddress ? `${defaultAddress.city} ${defaultAddress.zipCode}` : "Select location"}
            </p>
          </div>
        </Link>

        {/* Search bar */}
        <div className="flex flex-1 max-w-3xl relative" ref={searchRef}>
          <form onSubmit={handleSearch} className="flex flex-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="hidden sm:flex h-10 rounded-r-none rounded-l-md bg-muted text-muted-foreground hover:bg-muted/80 border-r border-border px-3 gap-1"
                >
                  <span className="text-xs">{selectedCategory}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {categories.map((cat) => (
                  <DropdownMenuItem
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Input
              type="search"
              placeholder="Search Nile"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchSuggestions(true)}
              className="h-10 rounded-none border-0 bg-card text-card-foreground flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" className="h-10 rounded-l-none rounded-r-md bg-primary hover:bg-primary/90 px-3 md:px-4">
              <Search className="h-5 w-5 text-primary-foreground" />
            </Button>
          </form>
          
          {/* Search suggestions dropdown */}
          {showSearchSuggestions && (searchSuggestions.length > 0 || searchHistory.length > 0) && (
            <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-b-md shadow-lg z-50 max-h-80 overflow-y-auto">
              {searchQuery.length > 1 && searchSuggestions.length > 0 && (
                <div className="p-2">
                  <p className="text-xs text-muted-foreground px-2 py-1">Suggestions</p>
                  {searchSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-2 py-2 hover:bg-muted rounded text-sm flex items-center gap-2 text-foreground"
                    >
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
              {searchHistory.length > 0 && searchQuery.length <= 1 && (
                <div className="p-2">
                  <p className="text-xs text-muted-foreground px-2 py-1">Recent searches</p>
                  {searchHistory.slice(0, 5).map((query, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(query)}
                      className="w-full text-left px-2 py-2 hover:bg-muted rounded text-sm flex items-center gap-2 text-foreground"
                    >
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{query}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Account dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hidden lg:flex flex-col p-2 hover:outline hover:outline-1 hover:outline-secondary-foreground rounded-sm cursor-pointer text-left">
              <span className="text-xs text-secondary-foreground/70">
                Hello, {isAuthenticated ? user?.name : "sign in"}
              </span>
              <span className="text-sm font-bold flex items-center gap-1">
                Account & Lists <ChevronDown className="h-3 w-3" />
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {isAuthenticated ? (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Your Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="cursor-pointer">
                    <Package className="mr-2 h-4 w-4" />
                    Your Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wishlist" className="cursor-pointer">
                    <Heart className="mr-2 h-4 w-4" />
                    Your Wishlist
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => {
                    logout()
                    router.push("/")
                  }}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <div className="p-3">
                  <Link href="/signin">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Sign In
                    </Button>
                  </Link>
                  <p className="text-xs text-center mt-2 text-muted-foreground">
                    New customer?{" "}
                    <Link href="/signup" className="text-amazon-teal hover:underline">
                      Start here
                    </Link>
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Your Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="cursor-pointer">
                    <Package className="mr-2 h-4 w-4" />
                    Your Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wishlist" className="cursor-pointer">
                    <Heart className="mr-2 h-4 w-4" />
                    Your Lists
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Returns & Orders */}
        <Link
          href="/orders"
          className="hidden lg:flex flex-col p-2 hover:outline hover:outline-1 hover:outline-secondary-foreground rounded-sm cursor-pointer"
        >
          <span className="text-xs text-secondary-foreground/70">Returns</span>
          <span className="text-sm font-bold">& Orders</span>
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className="flex items-center gap-1 p-2 hover:outline hover:outline-1 hover:outline-secondary-foreground rounded-sm relative"
        >
          <div className="relative">
            <ShoppingCart className="h-7 w-7" />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          </div>
          <span className="hidden md:block text-sm font-bold">Cart</span>
        </Link>
      </div>

      {/* Secondary nav */}
      <div className="bg-sidebar text-sidebar-foreground px-2 py-1 flex items-center gap-1 overflow-x-auto">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1 text-sm hover:outline hover:outline-1 hover:outline-sidebar-foreground px-2 py-1 h-auto shrink-0">
              <Menu className="h-5 w-5" />
              <span>All</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-card p-0">
            <SheetHeader className="bg-secondary text-secondary-foreground p-4">
              <SheetTitle className="text-left flex items-center gap-2 text-secondary-foreground">
                <User className="h-6 w-6" />
                {isAuthenticated ? `Hello, ${user?.name}` : "Hello, Sign in"}
              </SheetTitle>
              <SheetDescription className="sr-only">
                Browse categories, programs, and account settings
              </SheetDescription>
            </SheetHeader>
            <div className="overflow-y-auto">
              {/* Shop By Department */}
              <div className="border-b border-border">
                <h3 className="font-bold px-4 py-3 text-lg">Shop By Department</h3>
                {menuCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 hover:bg-muted text-foreground"
                  >
                    {cat.name}
                  </Link>
                ))}
                <Link
                  href="/products"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 hover:bg-muted text-foreground font-medium"
                >
                  See All Categories
                </Link>
              </div>
              
              {/* Programs & Features */}
              <div className="border-b border-border">
                <h3 className="font-bold px-4 py-3 text-lg">Programs & Features</h3>
                <Link href="/deals" onClick={() => setMenuOpen(false)} className="block px-4 py-3 hover:bg-muted text-foreground">
                  Today&apos;s Deals
                </Link>
                <Link href="/gift-cards" onClick={() => setMenuOpen(false)} className="block px-4 py-3 hover:bg-muted text-foreground">
                  Gift Cards
                </Link>
                <Link href="/registry" onClick={() => setMenuOpen(false)} className="block px-4 py-3 hover:bg-muted text-foreground">
                  Registry
                </Link>
              </div>
              
              {/* Help & Settings */}
              <div className="border-b border-border">
                <h3 className="font-bold px-4 py-3 text-lg">Help & Settings</h3>
                <Link href="/account" onClick={() => setMenuOpen(false)} className="block px-4 py-3 hover:bg-muted text-foreground">
                  Your Account
                </Link>
                <Link href="/help" onClick={() => setMenuOpen(false)} className="block px-4 py-3 hover:bg-muted text-foreground">
                  Customer Service
                </Link>
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout()
                      setMenuOpen(false)
                      router.push("/")
                    }}
                    className="block w-full text-left px-4 py-3 hover:bg-muted text-foreground"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link href="/signin" onClick={() => setMenuOpen(false)} className="block px-4 py-3 hover:bg-muted text-foreground">
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-sm hover:outline hover:outline-1 hover:outline-sidebar-foreground px-2 py-1 rounded-sm shrink-0"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  )
}
