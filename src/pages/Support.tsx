"use client"

import type React from "react"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  MessageSquare,
  Phone,
  Mail,
  Search,
  Book,
  Video,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Star,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuth } from "@/contexts/AuthContext"

const Support = () => {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  })

  const supportStats = [
    { label: "Avg Response Time", value: "< 2 hours", icon: Clock, color: "text-crypto-green" },
    { label: "Resolution Rate", value: "98.5%", icon: CheckCircle, color: "text-crypto-blue" },
    { label: "Active Tickets", value: "12", icon: AlertCircle, color: "text-crypto-orange" },
    { label: "Satisfaction", value: "4.9/5", icon: Star, color: "text-crypto-purple" },
  ]

  const faqCategories = [
    {
      title: "Getting Started",
      icon: "🚀",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "To create an account, click the 'Sign Up' button and fill in your details. You'll need to verify your email address before you can start trading.",
        },
        {
          question: "What documents do I need for verification?",
          answer:
            "You'll need a government-issued ID (passport, driver's license) and proof of address (utility bill, bank statement) not older than 3 months.",
        },
        {
          question: "How long does verification take?",
          answer:
            "Account verification typically takes 1-3 business days. You'll receive an email notification once your account is verified.",
        },
      ],
    },
    {
      title: "Trading",
      icon: "📈",
      questions: [
        {
          question: "What are the trading fees?",
          answer:
            "Our trading fees start at 0.1% for makers and 0.1% for takers. Premium users enjoy reduced fees starting at 0.075%.",
        },
        {
          question: "What order types are available?",
          answer:
            "We support market orders, limit orders, stop-loss orders, and take-profit orders to help you manage your trades effectively.",
        },
        {
          question: "What is the minimum trade amount?",
          answer: "The minimum trade amount varies by cryptocurrency but is typically around $10 USD equivalent.",
        },
      ],
    },
    {
      title: "Security",
      icon: "🔒",
      questions: [
        {
          question: "How do you protect my funds?",
          answer:
            "We use industry-standard security measures including cold storage for 95% of funds, 2FA, and regular security audits.",
        },
        {
          question: "What is 2FA and how do I enable it?",
          answer:
            "Two-Factor Authentication adds an extra layer of security. Enable it in your account settings using Google Authenticator or SMS.",
        },
        {
          question: "What should I do if I suspect unauthorized access?",
          answer:
            "Immediately change your password, enable 2FA if not already active, and contact our support team for assistance.",
        },
      ],
    },
    {
      title: "Deposits & Withdrawals",
      icon: "💰",
      questions: [
        {
          question: "How long do deposits take?",
          answer:
            "Crypto deposits are credited after network confirmations (usually 10-30 minutes). Bank transfers may take 1-3 business days.",
        },
        {
          question: "Are there withdrawal limits?",
          answer:
            "Daily withdrawal limits depend on your verification level. Verified users can withdraw up to $100,000 per day.",
        },
        {
          question: "What are the withdrawal fees?",
          answer: "Withdrawal fees vary by cryptocurrency and are clearly displayed before you confirm any withdrawal.",
        },
      ],
    },
  ]

  const supportTickets = [
    {
      id: "TK-2024-001",
      subject: "Unable to withdraw funds",
      status: "In Progress",
      priority: "High",
      created: "2 hours ago",
      lastUpdate: "1 hour ago",
    },
    {
      id: "TK-2024-002",
      subject: "2FA setup assistance",
      status: "Resolved",
      priority: "Medium",
      created: "1 day ago",
      lastUpdate: "6 hours ago",
    },
    {
      id: "TK-2024-003",
      subject: "Trading fee inquiry",
      status: "Waiting for Response",
      priority: "Low",
      created: "3 days ago",
      lastUpdate: "2 days ago",
    },
  ]

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle ticket submission
    console.log("Ticket submitted:", ticketForm)
    setTicketForm({ subject: "", category: "", priority: "", description: "" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "text-crypto-green border-crypto-green"
      case "In Progress":
        return "text-crypto-blue border-crypto-blue"
      case "Waiting for Response":
        return "text-crypto-orange border-crypto-orange"
      default:
        return "text-muted-foreground border-muted-foreground"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-crypto-red border-crypto-red"
      case "Medium":
        return "text-crypto-orange border-crypto-orange"
      case "Low":
        return "text-crypto-green border-crypto-green"
      default:
        return "text-muted-foreground border-muted-foreground"
    }
  }

  return (
    <ProtectedRoute requiredPermission="read">
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />

        <div className="pt-20 px-4">
          <div className="container mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Support Center</h1>
              <p className="text-muted-foreground">Get help with your account, trading, and platform features</p>
            </div>

            {/* Support Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {supportStats.map((stat, index) => (
                <Card
                  key={index}
                  className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="p-6 mb-8 bg-gradient-card backdrop-blur-sm border-border/50">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-background/50 hover:bg-primary/10">
                  <MessageSquare className="w-6 h-6" />
                  <span>Live Chat</span>
                </Button>
                <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-background/50 hover:bg-primary/10">
                  <Mail className="w-6 h-6" />
                  <span>Email Support</span>
                </Button>
                <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-background/50 hover:bg-primary/10">
                  <Phone className="w-6 h-6" />
                  <span>Phone Support</span>
                </Button>
                <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-background/50 hover:bg-primary/10">
                  <Video className="w-6 h-6" />
                  <span>Video Call</span>
                </Button>
              </div>
            </Card>

            <Tabs defaultValue="faq" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-background/50">
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="tickets">My Tickets</TabsTrigger>
                <TabsTrigger value="create">Create Ticket</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="faq">
                <div className="space-y-6">
                  {/* Search */}
                  <Card className="p-4 bg-gradient-card backdrop-blur-sm border-border/50">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search frequently asked questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-background/50"
                      />
                    </div>
                  </Card>

                  {/* FAQ Categories */}
                  <div className="grid gap-6">
                    {faqCategories.map((category, categoryIndex) => (
                      <Card key={categoryIndex} className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                        <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                          <span className="text-2xl">{category.icon}</span>
                          <span>{category.title}</span>
                        </h3>
                        <Accordion type="single" collapsible className="w-full">
                          {category.questions.map((faq, faqIndex) => (
                            <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                              <AccordionTrigger className="text-left hover:text-primary">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                                <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-border/50">
                                  <span className="text-sm">Was this helpful?</span>
                                  <Button variant="ghost" size="sm">
                                    <ThumbsUp className="w-4 h-4 mr-1" />
                                    Yes
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <ThumbsDown className="w-4 h-4 mr-1" />
                                    No
                                  </Button>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tickets">
                <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                  <h2 className="text-xl font-semibold mb-6">My Support Tickets</h2>
                  <div className="space-y-4">
                    {supportTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-all duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="font-medium">{ticket.id}</span>
                              <Badge variant="outline" className={getStatusColor(ticket.status)}>
                                {ticket.status}
                              </Badge>
                              <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                                {ticket.priority}
                              </Badge>
                            </div>
                            <h3 className="font-medium mb-2">{ticket.subject}</h3>
                            <div className="text-sm text-muted-foreground">
                              <span>Created: {ticket.created}</span>
                              <span className="mx-2">•</span>
                              <span>Last update: {ticket.lastUpdate}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="bg-background/50">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="create">
                <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                  <h2 className="text-xl font-semibold mb-6">Create Support Ticket</h2>
                  <form onSubmit={handleTicketSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <select
                          className="w-full p-3 rounded-lg bg-background/50 border border-border focus:border-primary"
                          value={ticketForm.category}
                          onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                          required
                        >
                          <option value="">Select category</option>
                          <option value="account">Account Issues</option>
                          <option value="trading">Trading Support</option>
                          <option value="deposits">Deposits & Withdrawals</option>
                          <option value="security">Security Concerns</option>
                          <option value="technical">Technical Issues</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Priority</label>
                        <select
                          className="w-full p-3 rounded-lg bg-background/50 border border-border focus:border-primary"
                          value={ticketForm.priority}
                          onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                          required
                        >
                          <option value="">Select priority</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Input
                        placeholder="Brief description of your issue"
                        value={ticketForm.subject}
                        onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                        className="bg-background/50"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        placeholder="Please provide detailed information about your issue..."
                        value={ticketForm.description}
                        onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                        className="bg-background/50 min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        We typically respond within 2 hours during business hours
                      </p>
                      <Button type="submit" className="bg-primary hover:bg-primary/90">
                        <Send className="w-4 h-4 mr-2" />
                        Submit Ticket
                      </Button>
                    </div>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="resources">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                        <Book className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">User Guide</h3>
                      <p className="text-muted-foreground">Comprehensive guide to using our platform</p>
                      <Button variant="outline" className="bg-background/50">
                        Read Guide
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                        <Video className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">Video Tutorials</h3>
                      <p className="text-muted-foreground">Step-by-step video guides</p>
                      <Button variant="outline" className="bg-background/50">
                        Watch Videos
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                        <FileText className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">API Documentation</h3>
                      <p className="text-muted-foreground">Technical documentation for developers</p>
                      <Button variant="outline" className="bg-background/50">
                        View Docs
                      </Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Support
