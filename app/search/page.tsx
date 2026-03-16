"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Heart, ChevronDown, Grid, List, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCart, Product } from "@/components/cart-context"
import { useStore } from "@/components/store-context"
import { searchProducts, products, categories } from "@/lib/products"
import { Footer } from "@/components/footer"

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const categoryParam = searchParams.get("category") || ""
  
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist, addNotification } = useStore()
  
  const [results, setResults] = useState<Product[]>([])
  const [filteredResults, setFilteredResults] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  )
  const [priceRange, setPriceRange] = useState([0, 500])
  const [minRating, setMinRating] = useState(0)
  const [primeOnly, setPrimeOnly] = useState(false)

  // Search products
  useEffect(() => {
    if (query) {
      const searchResults = searchProducts(query)
      setResults(searchResults)
    } else {
      setResults(products)
    }
  }, [query])

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...results]
    
    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category))
    }
    
    // Price filter
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    
    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= minRating)
    }
    
    // Prime filter
    if (primeOnly) {
      filtered = filtered.filter((p) => p.prime)
    }
    
    // Sorting
    switch (sortBy) {
      case "price_low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price_high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
    }
    
    setFilteredResults(filtered)
  }, [results, selectedCategories, priceRange, minRating, primeOnly, sortBy])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    addNotification(`${product.name.slice(0, 30)}... added to cart`, "success")
  }

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      addNotification("Removed from wishlist", "info")
    } else {
      addToWishlist(product)
      addNotification("Added to wishlist", "success")
    }
  }

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "rating", label: "Avg. Customer Review" },
    { value: "reviews", label: "Most Reviews" },
  ]

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-bold mb-3">Department</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat.name}`}
                checked={selectedCategories.includes(cat.name)}
                onCheckedChange={() => handleCategoryToggle(cat.name)}
              />
              <Label htmlFor={`cat-${cat.name}`} className="text-sm cursor-pointer">
                {cat.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Range */}
      <div>
        <h3 className="font-bold mb-3">Price</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={500}
            step={10}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>
      </div>
      
      {/* Customer Reviews */}
      <div>
        <h3 className="font-bold mb-3">Customer Reviews</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={`flex items-center gap-1 text-sm hover:text-primary ${
                minRating === rating ? "text-primary font-medium" : ""
              }`}
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                />
              ))}
              <span className="ml-1">& Up</span>
            </button>
          ))}
          {minRating > 0 && (
            <button
              onClick={() => setMinRating(0)}
              className="text-sm text-amazon-teal hover:underline"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      {/* Prime */}
      <div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="prime"
            checked={primeOnly}
            onCheckedChange={(checked) => setPrimeOnly(checked === true)}
          />
          <Label htmlFor="prime" className="text-sm cursor-pointer flex items-center gap-1">
            <span className="text-amazon-teal font-bold italic">prime</span>
            <span>Free Delivery</span>
          </Label>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search header */}
        <div className="mb-6">
          <h1 className="text-xl font-medium">
            {query ? (
              <>
                Results for <span className="text-primary font-bold">&quot;{query}&quot;</span>
              </>
            ) : (
              "All Products"
            )}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredResults.length} results
          </p>
        </div>
        
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <Card>
              <CardContent className="p-4">
                <FilterSidebar />
              </CardContent>
            </Card>
          </aside>
          
          {/* Main content */}
          <div className="flex-1">
            {/* Sort and view controls */}
            <div className="flex items-center justify-between mb-4 gap-4">
              {/* Mobile filter button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>
              
              <div className="flex items-center gap-4 ml-auto">
                {/* Sort dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      Sort by: {sortOptions.find((o) => o.value === sortBy)?.label}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {sortOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className="gap-2"
                      >
                        {sortBy === option.value && <Check className="h-4 w-4" />}
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* View toggle */}
                <div className="hidden sm:flex items-center border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Results */}
            {filteredResults.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-lg font-medium mb-2">No results found</p>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </Card>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredResults.map((product) => (
                  <Card key={product.id} className="group">
                    <CardContent className="p-4">
                      <div className="relative">
                        <Link href={`/product/${product.id}`}>
                          <div className="aspect-square relative mb-3 bg-muted rounded-lg overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                        </Link>
                        <button
                          onClick={() => handleWishlistToggle(product)}
                          className="absolute top-2 right-2 p-2 bg-card/80 rounded-full hover:bg-card"
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              isInWishlist(product.id)
                                ? "fill-red-500 text-red-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      </div>
                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-sm font-medium line-clamp-2 hover:text-primary mb-1">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews.toLocaleString()})
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-lg font-bold">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      {product.prime && (
                        <p className="text-xs text-amazon-teal font-medium mb-2">
                          <span className="font-bold italic">prime</span> FREE Delivery
                        </p>
                      )}
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        size="sm"
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResults.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-4 flex gap-4">
                      <Link href={`/product/${product.id}`} className="shrink-0">
                        <div className="w-40 h-40 relative bg-muted rounded-lg overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${product.id}`}>
                          <h3 className="text-lg font-medium hover:text-primary mb-1 line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground">
                            ({product.reviews.toLocaleString()})
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-2xl font-bold">${product.price}</span>
                          {product.originalPrice && (
                            <>
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </span>
                              <span className="text-sm text-green-600 font-medium">
                                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                              </span>
                            </>
                          )}
                        </div>
                        {product.prime && (
                          <p className="text-sm text-amazon-teal font-medium mb-2">
                            <span className="font-bold italic">prime</span> FREE Delivery
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {product.description}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            Add to Cart
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleWishlistToggle(product)}
                          >
                            <Heart
                              className={`h-4 w-4 mr-2 ${
                                isInWishlist(product.id)
                                  ? "fill-red-500 text-red-500"
                                  : ""
                              }`}
                            />
                            {isInWishlist(product.id) ? "Saved" : "Save"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
