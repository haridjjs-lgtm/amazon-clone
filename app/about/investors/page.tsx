"use client"

import Link from "next/link"
import { ArrowLeft, TrendingUp, Download, Calendar, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

const financials = [
  { label: "Revenue (TTM)", value: "$524B", change: "+12%" },
  { label: "Net Income", value: "$30.4B", change: "+15%" },
  { label: "Market Cap", value: "$1.92T", change: "+8%" },
  { label: "EPS", value: "$2.90", change: "+18%" },
]

const reports = [
  { title: "Q4 2025 Earnings Report", date: "January 30, 2026", type: "Quarterly" },
  { title: "2025 Annual Report", date: "February 15, 2026", type: "Annual" },
  { title: "Q3 2025 Earnings Report", date: "October 26, 2025", type: "Quarterly" },
  { title: "Q2 2025 Earnings Report", date: "July 27, 2025", type: "Quarterly" },
  { title: "Q1 2025 Earnings Report", date: "April 27, 2025", type: "Quarterly" },
]

const events = [
  { title: "Q1 2026 Earnings Call", date: "April 25, 2026", time: "2:00 PM PT" },
  { title: "Annual Shareholders Meeting", date: "May 21, 2026", time: "9:00 AM PT" },
  { title: "Investor Day", date: "September 15, 2026", time: "10:00 AM PT" },
]

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/about" className="inline-flex items-center gap-2 text-secondary-foreground/70 hover:text-secondary-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to About
          </Link>
          <h1 className="text-4xl font-bold mb-4">Investor Relations</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-2xl">
            Financial information, SEC filings, and resources for Nile investors.
          </p>
        </div>
      </section>

      {/* Key Financials */}
      <section className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Key Financials</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {financials.map((item) => (
              <Card key={item.label}>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {item.change}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            *Figures are for demonstration purposes only and do not represent actual company data.
          </p>
        </div>
      </section>

      {/* Reports and Events */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Reports */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Financial Reports</h2>
              <div className="space-y-4">
                {reports.map((report, idx) => (
                  <Card key={idx}>
                    <CardContent className="py-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <p className="text-sm text-muted-foreground">{report.date}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Events */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {events.map((event, idx) => (
                  <Card key={idx}>
                    <CardContent className="py-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                          <p className="text-sm text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEC Filings */}
      <section className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">SEC Filings</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Filings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["10-K", "10-Q", "8-K", "DEF 14A", "4"].map((filing) => (
                  <div key={filing} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="font-medium">{filing}</span>
                    <Button variant="link" className="text-primary">View Filing</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Contact Investor Relations</h2>
          <p className="text-muted-foreground mb-6">
            For investor inquiries, please contact our Investor Relations team.
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            Contact IR Team
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
