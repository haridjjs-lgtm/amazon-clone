"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Filter, Grid, List, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ProductCard } from "@/components/product-card"
import { products, categories } from "@/lib/products"

type SortOption = "featured" | "price-low" | "price-high" | "rating" | "reviews"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get("category")

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFromUrl ? [categoryFromUrl] : []
  )
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [primeOnly, setPrimeOnly] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    // Filter by Prime
    if (primeOnly) {
      result = result.filter((p) => p.prime)
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        result.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        // featured - keep original order
        break
    }

    return result
  }, [selectedCategories, sortBy, primeOnly])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold mb-3 text-foreground">Department</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-2">
              <Checkbox
                id={cat.name}
                checked={selectedCategories.includes(cat.name)}
                onCheckedChange={() => toggleCategory(cat.name)}
              />
              <Label htmlFor={cat.name} className="text-sm cursor-pointer">
                {cat.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <h3 className="font-bold mb-3 text-foreground">Delivery</h3>
        <div className="flex items-center gap-2">
          <Checkbox
            id="prime"
            checked={primeOnly}
            onCheckedChange={(checked) => setPrimeOnly(checked as boolean)}
          />
          <Label htmlFor="prime" className="text-sm cursor-pointer">
            Free Delivery
          </Label>
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <h3 className="font-bold mb-3 text-foreground">Customer Review</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((stars) => (
            <button
              key={stars}
              className="flex items-center gap-1 text-sm hover:text-primary transition-colors w-full text-left"
            >
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={i < stars ? "text-primary" : "text-muted-foreground"}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-muted-foreground">& Up</span>
            </button>
          ))}
        </div>
      </div>

      {selectedCategories.length > 0 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setSelectedCategories([])}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-4">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">
            {selectedCategories.length === 1
              ? selectedCategories[0]
              : "All Products"}
          </span>
        </nav>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
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

                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {filteredProducts.length}
                  </span>{" "}
                  results
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Avg. Customer Review</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="hidden sm:flex items-center border border-border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    className="rounded-r-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    className="rounded-l-none"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No products found</p>
                <Button
                  variant="link"
                  className="text-primary"
                  onClick={() => setSelectedCategories([])}
                >
                  Clear filters
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
