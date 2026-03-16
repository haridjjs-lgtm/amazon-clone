"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-full py-3 bg-sidebar hover:bg-sidebar/80 text-sidebar-foreground transition-colors"
          >
            Back to top
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li><Link href="/about/careers" className="hover:underline">Careers</Link></li>
              <li><Link href="/about/blog" className="hover:underline">Blog</Link></li>
              <li><Link href="/about" className="hover:underline">About Nile</Link></li>
              <li><Link href="/about/investors" className="hover:underline">Investor Relations</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Make Money with Us</h3>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li><Link href="/sell" className="hover:underline">Sell products</Link></li>
              <li><Link href="/sell/affiliate" className="hover:underline">Become an Affiliate</Link></li>
              <li><Link href="/sell/advertise" className="hover:underline">Advertise Your Products</Link></li>
              <li><Link href="/sell/publish" className="hover:underline">Self-Publish</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Payment Products</h3>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li><Link href="/account/payments" className="hover:underline">Business Card</Link></li>
              <li><Link href="/gift-cards" className="hover:underline">Shop with Points</Link></li>
              <li><Link href="/gift-cards" className="hover:underline">Reload Your Balance</Link></li>
              <li><Link href="/help" className="hover:underline">Currency Converter</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Let Us Help You</h3>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li><Link href="/account" className="hover:underline">Your Account</Link></li>
              <li><Link href="/orders" className="hover:underline">Your Orders</Link></li>
              <li><Link href="/help" className="hover:underline">Shipping Rates</Link></li>
              <li><Link href="/help" className="hover:underline">Returns</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-sidebar-border pt-8 text-center">
          <span className="text-xl font-bold">nile</span>
          <span className="text-primary text-sm">.com</span>
          <p className="text-sm text-secondary-foreground/60 mt-4">
            © 2026 Nile.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </footer>
  )
}
