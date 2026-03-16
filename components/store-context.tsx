"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"
import { Product } from "@/components/cart-context"

// ============================================
// TYPES & INTERFACES
// ============================================

export interface User {
  id: string
  name: string
  email: string
  address?: Address
  createdAt: Date
}

export interface Address {
  fullName: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  isDefault?: boolean
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: OrderStatus
  shippingAddress: Address
  paymentMethod: string
  createdAt: Date
  estimatedDelivery: Date
  trackingNumber?: string
}

export interface OrderItem {
  product: Product
  quantity: number
  priceAtPurchase: number
}

export type OrderStatus = 
  | "pending"
  | "confirmed"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "returned"

export interface WishlistItem {
  product: Product
  addedAt: Date
  priority?: "low" | "medium" | "high"
  notes?: string
}

export interface SearchFilters {
  query: string
  category: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  primeOnly?: boolean
  sortBy: "featured" | "price_low" | "price_high" | "rating" | "reviews"
}

export interface RecentlyViewed {
  product: Product
  viewedAt: Date
}

// ============================================
// STORE CONTEXT
// ============================================

interface StoreContextType {
  // User & Auth
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  
  // Addresses
  addresses: Address[]
  addAddress: (address: Address) => void
  updateAddress: (index: number, address: Address) => void
  removeAddress: (index: number) => void
  setDefaultAddress: (index: number) => void
  
  // Wishlist
  wishlist: WishlistItem[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  moveToCart: (productId: string) => void
  
  // Orders
  orders: Order[]
  createOrder: (
    items: OrderItem[],
    shippingAddress: Address,
    paymentMethod: string
  ) => Order
  cancelOrder: (orderId: string) => boolean
  getOrderById: (orderId: string) => Order | undefined
  
  // Search & Filters
  searchFilters: SearchFilters
  setSearchFilters: (filters: Partial<SearchFilters>) => void
  searchHistory: string[]
  addToSearchHistory: (query: string) => void
  clearSearchHistory: () => void
  
  // Recently Viewed
  recentlyViewed: RecentlyViewed[]
  addToRecentlyViewed: (product: Product) => void
  clearRecentlyViewed: () => void
  
  // Notifications
  notifications: Notification[]
  addNotification: (message: string, type: NotificationType) => void
  dismissNotification: (id: string) => void
}

interface Notification {
  id: string
  message: string
  type: NotificationType
  createdAt: Date
}

type NotificationType = "success" | "error" | "info" | "warning"

const StoreContext = createContext<StoreContextType | undefined>(undefined)

// Local storage keys
const STORAGE_KEYS = {
  user: "nile_user",
  addresses: "nile_addresses",
  wishlist: "nile_wishlist",
  orders: "nile_orders",
  searchHistory: "nile_search_history",
  recentlyViewed: "nile_recently_viewed",
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
}

function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    console.error("Failed to save to localStorage")
  }
}

// ============================================
// PROVIDER COMPONENT
// ============================================

export function StoreProvider({ children }: { children: ReactNode }) {
  // User state
  const [user, setUser] = useState<User | null>(null)
  const [addresses, setAddresses] = useState<Address[]>([])
  
  // Wishlist state
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  
  // Orders state
  const [orders, setOrders] = useState<Order[]>([])
  
  // Search state
  const [searchFilters, setSearchFiltersState] = useState<SearchFilters>({
    query: "",
    category: "All",
    sortBy: "featured",
  })
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  
  // Recently viewed state
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewed[]>([])
  
  // Notifications state
  const [notifications, setNotifications] = useState<Notification[]>([])
  
  // Load from localStorage on mount
  useEffect(() => {
    setUser(getFromStorage(STORAGE_KEYS.user, null))
    setAddresses(getFromStorage(STORAGE_KEYS.addresses, []))
    setWishlist(getFromStorage(STORAGE_KEYS.wishlist, []))
    setOrders(getFromStorage(STORAGE_KEYS.orders, []))
    setSearchHistory(getFromStorage(STORAGE_KEYS.searchHistory, []))
    setRecentlyViewed(getFromStorage(STORAGE_KEYS.recentlyViewed, []))
  }, [])
  
  // ========== AUTH FUNCTIONS ==========
  
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call - in real app, this would hit a backend
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    // For demo, accept any valid-looking credentials
    if (email && password.length >= 6) {
      const newUser: User = {
        id: generateId(),
        name: email.split("@")[0],
        email,
        createdAt: new Date(),
      }
      setUser(newUser)
      saveToStorage(STORAGE_KEYS.user, newUser)
      return true
    }
    return false
  }, [])
  
  const signup = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    if (name && email && password.length >= 6) {
      const newUser: User = {
        id: generateId(),
        name,
        email,
        createdAt: new Date(),
      }
      setUser(newUser)
      saveToStorage(STORAGE_KEYS.user, newUser)
      return true
    }
    return false
  }, [])
  
  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEYS.user)
  }, [])
  
  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null
      const updated = { ...prev, ...updates }
      saveToStorage(STORAGE_KEYS.user, updated)
      return updated
    })
  }, [])
  
  // ========== ADDRESS FUNCTIONS ==========
  
  const addAddress = useCallback((address: Address) => {
    setAddresses((prev) => {
      const updated = [...prev, address]
      saveToStorage(STORAGE_KEYS.addresses, updated)
      return updated
    })
  }, [])
  
  const updateAddress = useCallback((index: number, address: Address) => {
    setAddresses((prev) => {
      const updated = [...prev]
      updated[index] = address
      saveToStorage(STORAGE_KEYS.addresses, updated)
      return updated
    })
  }, [])
  
  const removeAddress = useCallback((index: number) => {
    setAddresses((prev) => {
      const updated = prev.filter((_, i) => i !== index)
      saveToStorage(STORAGE_KEYS.addresses, updated)
      return updated
    })
  }, [])
  
  const setDefaultAddress = useCallback((index: number) => {
    setAddresses((prev) => {
      const updated = prev.map((addr, i) => ({
        ...addr,
        isDefault: i === index,
      }))
      saveToStorage(STORAGE_KEYS.addresses, updated)
      return updated
    })
  }, [])
  
  // ========== WISHLIST FUNCTIONS ==========
  
  const addToWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.product.id === product.id)) return prev
      const updated = [...prev, { product, addedAt: new Date() }]
      saveToStorage(STORAGE_KEYS.wishlist, updated)
      return updated
    })
  }, [])
  
  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const updated = prev.filter((item) => item.product.id !== productId)
      saveToStorage(STORAGE_KEYS.wishlist, updated)
      return updated
    })
  }, [])
  
  const isInWishlist = useCallback((productId: string): boolean => {
    return wishlist.some((item) => item.product.id === productId)
  }, [wishlist])
  
  const moveToCart = useCallback((productId: string) => {
    // This will be connected to cart context separately
    removeFromWishlist(productId)
  }, [removeFromWishlist])
  
  // ========== ORDER FUNCTIONS ==========
  
  const createOrder = useCallback((
    items: OrderItem[],
    shippingAddress: Address,
    paymentMethod: string
  ): Order => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.priceAtPurchase * item.quantity,
      0
    )
    const shipping = subtotal >= 35 ? 0 : 5.99
    const tax = subtotal * 0.08 // 8% tax
    
    const order: Order = {
      id: generateId(),
      userId: user?.id || "guest",
      items,
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax,
      status: "confirmed",
      shippingAddress,
      paymentMethod,
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
      trackingNumber: `NIL${Date.now()}`,
    }
    
    setOrders((prev) => {
      const updated = [order, ...prev]
      saveToStorage(STORAGE_KEYS.orders, updated)
      return updated
    })
    
    return order
  }, [user?.id])
  
  const cancelOrder = useCallback((orderId: string): boolean => {
    setOrders((prev) => {
      const orderIndex = prev.findIndex((o) => o.id === orderId)
      if (orderIndex === -1) return prev
      
      const order = prev[orderIndex]
      if (order.status === "delivered" || order.status === "cancelled") {
        return prev
      }
      
      const updated = [...prev]
      updated[orderIndex] = { ...order, status: "cancelled" }
      saveToStorage(STORAGE_KEYS.orders, updated)
      return updated
    })
    return true
  }, [])
  
  const getOrderById = useCallback((orderId: string): Order | undefined => {
    return orders.find((o) => o.id === orderId)
  }, [orders])
  
  // ========== SEARCH FUNCTIONS ==========
  
  const setSearchFilters = useCallback((filters: Partial<SearchFilters>) => {
    setSearchFiltersState((prev) => ({ ...prev, ...filters }))
  }, [])
  
  const addToSearchHistory = useCallback((query: string) => {
    if (!query.trim()) return
    setSearchHistory((prev) => {
      const filtered = prev.filter((q) => q !== query)
      const updated = [query, ...filtered].slice(0, 10) // Keep last 10
      saveToStorage(STORAGE_KEYS.searchHistory, updated)
      return updated
    })
  }, [])
  
  const clearSearchHistory = useCallback(() => {
    setSearchHistory([])
    localStorage.removeItem(STORAGE_KEYS.searchHistory)
  }, [])
  
  // ========== RECENTLY VIEWED FUNCTIONS ==========
  
  const addToRecentlyViewed = useCallback((product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.product.id !== product.id)
      const updated = [{ product, viewedAt: new Date() }, ...filtered].slice(0, 20)
      saveToStorage(STORAGE_KEYS.recentlyViewed, updated)
      return updated
    })
  }, [])
  
  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([])
    localStorage.removeItem(STORAGE_KEYS.recentlyViewed)
  }, [])
  
  // ========== NOTIFICATION FUNCTIONS ==========
  
  const addNotification = useCallback((message: string, type: NotificationType) => {
    const notification: Notification = {
      id: generateId(),
      message,
      type,
      createdAt: new Date(),
    }
    setNotifications((prev) => [...prev, notification])
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      dismissNotification(notification.id)
    }, 5000)
  }, [])
  
  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])
  
  return (
    <StoreContext.Provider
      value={{
        // User & Auth
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
        
        // Addresses
        addresses,
        addAddress,
        updateAddress,
        removeAddress,
        setDefaultAddress,
        
        // Wishlist
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        moveToCart,
        
        // Orders
        orders,
        createOrder,
        cancelOrder,
        getOrderById,
        
        // Search
        searchFilters,
        setSearchFilters,
        searchHistory,
        addToSearchHistory,
        clearSearchHistory,
        
        // Recently Viewed
        recentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed,
        
        // Notifications
        notifications,
        addNotification,
        dismissNotification,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
