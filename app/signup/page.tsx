"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useStore } from "@/components/store-context"

export default function SignUpPage() {
  const router = useRouter()
  const { signup, addNotification } = useStore()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Password strength indicators
  const hasMinLength = password.length >= 6
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const passwordsMatch = password === confirmPassword && password.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }
    
    if (!hasMinLength) {
      setError("Password must be at least 6 characters")
      return
    }
    
    if (!passwordsMatch) {
      setError("Passwords do not match")
      return
    }
    
    setIsLoading(true)
    
    try {
      const success = await signup(name, email, password)
      if (success) {
        addNotification("Account created successfully! Welcome to Nile.", "success")
        router.push("/account")
      } else {
        setError("Failed to create account. Please try again.")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-8 px-4 pb-12">
      {/* Logo */}
      <Link href="/" className="mb-6">
        <span className="text-3xl font-bold">nile</span>
        <span className="text-primary text-sm">.com</span>
      </Link>
      
      {/* Sign up form */}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <h1 className="text-2xl font-medium">Create account</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First and last name"
                className="w-full"
              />
            </div>
            
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
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
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
              
              {/* Password strength indicators */}
              {password.length > 0 && (
                <div className="space-y-1 mt-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Check className={`h-3 w-3 ${hasMinLength ? "text-green-500" : "text-muted-foreground"}`} />
                    <span className={hasMinLength ? "text-green-500" : "text-muted-foreground"}>
                      At least 6 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Check className={`h-3 w-3 ${hasUppercase ? "text-green-500" : "text-muted-foreground"}`} />
                    <span className={hasUppercase ? "text-green-500" : "text-muted-foreground"}>
                      Contains uppercase letter (recommended)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Check className={`h-3 w-3 ${hasNumber ? "text-green-500" : "text-muted-foreground"}`} />
                    <span className={hasNumber ? "text-green-500" : "text-muted-foreground"}>
                      Contains number (recommended)
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Re-enter password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full"
              />
              {confirmPassword.length > 0 && (
                <div className="flex items-center gap-2 text-xs mt-1">
                  <Check className={`h-3 w-3 ${passwordsMatch ? "text-green-500" : "text-red-500"}`} />
                  <span className={passwordsMatch ? "text-green-500" : "text-red-500"}>
                    {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                  </span>
                </div>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create your Nile account"
              )}
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground mt-4">
            By creating an account, you agree to Nile&apos;s{" "}
            <Link href="/terms" className="text-amazon-teal hover:underline">
              Conditions of Use
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-amazon-teal hover:underline">
              Privacy Notice
            </Link>
            .
          </p>
          
          <div className="h-px bg-border my-6" />
          
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/signin" className="text-amazon-teal hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
