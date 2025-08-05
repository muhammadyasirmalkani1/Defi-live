"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  Heart,
  Share2,
  TrendingUp,
  Users,
  Trophy,
  Star,
  Send,
  Search,
  MoreHorizontal,
  Pin,
  Flag,
} from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuth } from "@/contexts/AuthContext"

const Community = () => {
  const { user } = useAuth()
  const [newPost, setNewPost] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const communityStats = [
    { label: "Active Members", value: "12.5K", icon: Users, color: "text-crypto-blue" },
    { label: "Posts Today", value: "234", icon: MessageSquare, color: "text-crypto-green" },
    { label: "Top Traders", value: "89", icon: Trophy, color: "text-crypto-orange" },
    { label: "Live Discussions", value: "45", icon: TrendingUp, color: "text-crypto-purple" },
  ]

  const trendingTopics = [
    { tag: "#Bitcoin", posts: 1234, trend: "+12%" },
    { tag: "#DeFi", posts: 892, trend: "+8%" },
    { tag: "#Ethereum", posts: 756, trend: "+15%" },
    { tag: "#Trading", posts: 645, trend: "+5%" },
    { tag: "#NFT", posts: 423, trend: "+22%" },
  ]

  const communityPosts = [
    {
      id: 1,
      author: {
        name: "Alex Chen",
        username: "@alexchen",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
        role: "Premium Trader",
      },
      content:
        "Just hit a 25% gain on my DeFi portfolio this month! The key is diversification and patience. Here's my strategy breakdown... 🚀",
      timestamp: "2 hours ago",
      likes: 156,
      comments: 23,
      shares: 12,
      tags: ["#DeFi", "#Trading", "#Strategy"],
      isPinned: true,
    },
    {
      id: 2,
      author: {
        name: "Sarah Johnson",
        username: "@sarahj",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: false,
        role: "Community Member",
      },
      content:
        "What's everyone's thoughts on the recent Bitcoin surge? Thinking of increasing my position but want to hear different perspectives first.",
      timestamp: "4 hours ago",
      likes: 89,
      comments: 45,
      shares: 8,
      tags: ["#Bitcoin", "#Discussion"],
    },
    {
      id: 3,
      author: {
        name: "Mike Rodriguez",
        username: "@miketrader",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
        role: "Expert Analyst",
      },
      content:
        "Technical analysis update: ETH showing strong support at $3,200. Expecting a breakout above $3,500 in the next few days. Chart attached 📈",
      timestamp: "6 hours ago",
      likes: 234,
      comments: 67,
      shares: 34,
      tags: ["#Ethereum", "#TechnicalAnalysis", "#Charts"],
    },
  ]

  const topTraders = [
    { name: "CryptoKing", profit: "+$45,230", winRate: "87%", followers: "2.3K" },
    { name: "DeFiMaster", profit: "+$38,940", winRate: "82%", followers: "1.8K" },
    { name: "BlockchainPro", profit: "+$32,150", winRate: "79%", followers: "1.5K" },
    { name: "TokenWizard", profit: "+$28,670", winRate: "76%", followers: "1.2K" },
  ]

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      // Add new post logic here
      setNewPost("")
    }
  }

  return (
    <ProtectedRoute requiredPermission="read">
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />

        <div className="pt-20 px-4">
          <div className="container mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Community</h1>
              <p className="text-muted-foreground">Connect with traders, share insights, and learn together</p>
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {communityStats.map((stat, index) => (
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

            <div className="grid lg:grid-cols-4 gap-6">
              {/* Main Feed */}
              <div className="lg:col-span-3 space-y-6">
                {/* Create Post */}
                <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {user?.firstName?.charAt(0)}
                        {user?.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-4">
                      <Textarea
                        placeholder="Share your trading insights, ask questions, or start a discussion..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="bg-background/50 border-border/50 resize-none"
                        rows={3}
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            📊 Chart
                          </Button>
                          <Button variant="ghost" size="sm">
                            🏷️ Tag
                          </Button>
                          <Button variant="ghost" size="sm">
                            📷 Image
                          </Button>
                        </div>
                        <Button
                          onClick={handlePostSubmit}
                          disabled={!newPost.trim()}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Feed Tabs */}
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-background/50">
                    <TabsTrigger value="all">All Posts</TabsTrigger>
                    <TabsTrigger value="following">Following</TabsTrigger>
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                    <TabsTrigger value="questions">Q&A</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4 mt-6">
                    {communityPosts.map((post) => (
                      <Card
                        key={post.id}
                        className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="space-y-4">
                          {/* Post Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {post.author.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-semibold">{post.author.name}</span>
                                  {post.author.verified && <Star className="w-4 h-4 text-crypto-orange fill-current" />}
                                  {post.isPinned && <Pin className="w-4 h-4 text-primary" />}
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                  <span>{post.author.username}</span>
                                  <span>•</span>
                                  <span>{post.author.role}</span>
                                  <span>•</span>
                                  <span>{post.timestamp}</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Post Content */}
                          <div className="space-y-3">
                            <p className="text-foreground leading-relaxed">{post.content}</p>
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-primary border-primary/30">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Post Actions */}
                          <div className="flex items-center justify-between pt-4 border-t border-border/50">
                            <div className="flex items-center space-x-6">
                              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-crypto-red">
                                <Heart className="w-4 h-4 mr-2" />
                                {post.likes}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                {post.comments}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-crypto-blue"
                              >
                                <Share2 className="w-4 h-4 mr-2" />
                                {post.shares}
                              </Button>
                            </div>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <Flag className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="following">
                    <Card className="p-12 bg-gradient-card backdrop-blur-sm border-border/50 text-center">
                      <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">Follow Traders</h3>
                      <p className="text-muted-foreground">Start following other traders to see their posts here</p>
                    </Card>
                  </TabsContent>

                  <TabsContent value="trending">
                    <Card className="p-12 bg-gradient-card backdrop-blur-sm border-border/50 text-center">
                      <TrendingUp className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">Trending Posts</h3>
                      <p className="text-muted-foreground">Most popular posts in the community</p>
                    </Card>
                  </TabsContent>

                  <TabsContent value="questions">
                    <Card className="p-12 bg-gradient-card backdrop-blur-sm border-border/50 text-center">
                      <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">Questions & Answers</h3>
                      <p className="text-muted-foreground">Get help from the community</p>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Search */}
                <Card className="p-4 bg-gradient-card backdrop-blur-sm border-border/50">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search community..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-background/50"
                    />
                  </div>
                </Card>

                {/* Trending Topics */}
                <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                  <h3 className="font-semibold mb-4">Trending Topics</h3>
                  <div className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-primary">{topic.tag}</div>
                          <div className="text-sm text-muted-foreground">{topic.posts} posts</div>
                        </div>
                        <Badge variant="outline" className="text-crypto-green border-crypto-green">
                          {topic.trend}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Top Traders */}
                <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                  <h3 className="font-semibold mb-4">Top Traders</h3>
                  <div className="space-y-4">
                    {topTraders.map((trader, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{trader.name}</div>
                            <div className="text-sm text-muted-foreground">{trader.followers} followers</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-crypto-green">{trader.profit}</div>
                          <div className="text-xs text-muted-foreground">{trader.winRate} win</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Community
