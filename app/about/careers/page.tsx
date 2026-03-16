"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Search, MapPin, Briefcase, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"

const jobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Seattle, WA",
    type: "Full-time",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "San Francisco, CA",
    type: "Full-time",
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Data Scientist",
    department: "Data",
    location: "Remote",
    type: "Full-time",
    posted: "5 days ago",
  },
  {
    id: 5,
    title: "Operations Manager",
    department: "Operations",
    location: "Dallas, TX",
    type: "Full-time",
    posted: "1 day ago",
  },
  {
    id: 6,
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Los Angeles, CA",
    type: "Full-time",
    posted: "4 days ago",
  },
]

const benefits = [
  "Competitive compensation",
  "Health, dental, and vision insurance",
  "401(k) with company match",
  "Paid parental leave",
  "Employee discount",
  "Career development programs",
]

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")

  const departments = ["All", ...new Set(jobs.map((j) => j.department))]

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/about" className="inline-flex items-center gap-2 text-secondary-foreground/70 hover:text-secondary-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to About
          </Link>
          <h1 className="text-4xl font-bold mb-4">Careers at Nile</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-2xl">
            Join us in building the future of commerce. We&apos;re looking for talented people 
            who want to make a difference.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Why Work at Nile?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Search */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {departments.map((dept) => (
                <Button
                  key={dept}
                  variant={selectedDepartment === dept ? "default" : "outline"}
                  onClick={() => setSelectedDepartment(dept)}
                  size="sm"
                >
                  {dept}
                </Button>
              ))}
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{job.department}</Badge>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">Apply Now</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Posted {job.posted}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredJobs.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No jobs found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
