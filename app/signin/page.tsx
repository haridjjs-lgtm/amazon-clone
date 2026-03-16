"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useStore } from "@/components/store-context"

export default function SignInPage() {
  const router = useRouter()
  const { login, addNotification } = useStore()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }
    
    setIsLoading(true)
    
    try {
      const success = await login(email, password)
      if (success) {
        addNotification("Welcome back! You're now signed in.", "success")
        router.push("/account")
      } else {
        setError("Invalid email or password")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-8 px-4">
      {/* Logo */}
      <Link href="/" className="mb-6">
        <span className="text-3xl font-bold">nile</span>
        <span className="text-primary text-sm">.com</span>
      </Link>
      
      {/* Sign in form */}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <h1 className="text-2xl font-medium">Sign in</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-amazon-teal hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <Label htmlFor="remember" className="text-sm cursor-pointer">
                Keep me signed in
              </Label>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground mt-4 text-center">
            By continuing, you agree to Nile&apos;s{" "}
            <Link href="/terms" className="text-amazon-teal hover:underline">
              Conditions of Use
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-amazon-teal hover:underline">
              Privacy Notice
            </Link>
            .
          </p>
        </CardContent>
      </Card>
      
      {/* Divider */}
      <div className="w-full max-w-sm flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">New to Nile?</span>
        <div className="flex-1 h-px bg-border" />
      </div>
      
      {/* Create account button */}
      <Link href="/signup" className="w-full max-w-sm">
        <Button variant="outline" className="w-full">
          Create your Nile account
        </Button>
      </Link>
      
      {/* Demo credentials */}
      <div className="mt-6 p-4 bg-muted rounded-lg w-full max-w-sm">
        <p className="text-sm font-medium mb-2">Demo Mode</p>
        <p className="text-xs text-muted-foreground">
          Enter any email and password (6+ characters) to sign in. This is a demo app without a real backend.
        </p>
      </div>
    </div>
  )
}
