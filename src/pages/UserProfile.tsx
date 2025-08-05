"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Shield, Trophy, TrendingUp, Activity, Camera, Edit, Star, Award, Target } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuth } from "@/contexts/AuthContext"

const UserProfile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    location: "",
    bio: "",
    website: "",
    twitter: "",
    linkedin: "",
  })

  const userStats = [
    { label: "Total Trades", value: "1,234", icon: Activity, color: "text-crypto-blue" },
    { label: "Win Rate", value: "78.5%", icon: Target, color: "text-crypto-green" },
    { label: "Total Profit", value: "$45,230", icon: TrendingUp, color: "text-crypto-orange" },
    { label: "Rank", value: "#156", icon: Trophy, color: "text-crypto-purple" },
  ]

  const achievements = [
    { title: "First Trade", description: "Completed your first trade", icon: "🎯", earned: true },
    { title: "Profitable Week", description: "7 consecutive profitable days", icon: "📈", earned: true },
    { title: "Diamond Hands", description: "Held position for 30+ days", icon: "💎", earned: true },
    { title: "Risk Manager", description: "Never exceeded 5% portfolio risk", icon: "🛡️", earned: false },
    { title: "Social Trader", description: "Shared 10+ trading insights", icon: "👥", earned: false },
    { title: "Crypto Expert", description: "Traded 50+ different cryptocurrencies", icon: "🏆", earned: false },
  ]

  const tradingHistory = [
    { pair: "BTC/USDT", type: "Buy", amount: "0.1234", price: "$45,230", profit: "+$1,234", date: "2024-01-15" },
    { pair: "ETH/USDT", type: "Sell", amount: "2.5678", price: "$3,456", profit: "+$892", date: "2024-01-14" },
    { pair: "BNB/USDT", type: "Buy", amount: "15.0", price: "$345", profit: "-$156", date: "2024-01-13" },
    { pair: "ADA/USDT", type: "Sell", amount: "1000", price: "$1.23", profit: "+$234", date: "2024-01-12" },
  ]

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false)
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-crypto-red border-crypto-red"
      case "premium":
        return "text-crypto-orange border-crypto-orange"
      default:
        return "text-crypto-blue border-crypto-blue"
    }
  }

  return (
    <ProtectedRoute requiredPermission="read">
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />

        <div className="pt-20 px-4">
          <div className="container mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">User Profile</h1>
              <p className="text-muted-foreground">Manage your account and view your trading performance</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              {/* Profile Sidebar */}
              <Card className="lg:col-span-1 p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                        {user && getInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">
                      {user?.firstName} {user?.lastName}
                    </h2>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <Badge variant="outline" className={`${getRoleColor(user?.role || "user")}`}>
                        <Shield className="w-3 h-3 mr-1" />
                        {user?.role?.charAt(0).toUpperCase()}
                        {user?.role?.slice(1)}
                      </Badge>
                      {user?.isVerified && (
                        <Badge variant="outline" className="text-crypto-green border-crypto-green">
                          <Star className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(user?.createdAt || "").toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>Location not set</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-full"
                    variant={isEditing ? "outline" : "default"}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
              </Card>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* User Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {userStats.map((stat, index) => (
                    <Card
                      key={index}
                      className="p-4 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                        </div>
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                    </Card>
                  ))}
                </div>

                <Tabs defaultValue="profile" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4 bg-background/50">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="trading">Trading</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile">
                    <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold">Profile Information</h3>
                        {isEditing && (
                          <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90">
                            Save Changes
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              value={profileData.firstName}
                              onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                              disabled={!isEditing}
                              className="bg-background/50"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              value={profileData.lastName}
                              onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                              disabled={!isEditing}
                              className="bg-background/50"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                              disabled={!isEditing}
                              className="bg-background/50"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                              disabled={!isEditing}
                              className="bg-background/50"
                              placeholder="Enter phone number"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={profileData.location}
                              onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                              disabled={!isEditing}
                              className="bg-background/50"
                              placeholder="Enter your location"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              value={profileData.website}
                              onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                              disabled={!isEditing}
                              className="bg-background/50"
                              placeholder="https://yourwebsite.com"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="twitter">Twitter</Label>
                            <Input
                              id="twitter"
                              value={profileData.twitter}
                              onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                              disabled={!isEditing}
                              className="bg-background/50"
                              placeholder="@username"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <Input
                              id="linkedin"
                              value={profileData.linkedin}
                              onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                              disabled={!isEditing}
                              className="bg-background/50"
                              placeholder="linkedin.com/in/username"
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="trading">
                    <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                      <h3 className="text-xl font-semibold mb-6">Trading History</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-6 gap-4 text-sm text-muted-foreground pb-2 border-b border-border">
                          <span>Pair</span>
                          <span>Type</span>
                          <span>Amount</span>
                          <span>Price</span>
                          <span>Profit/Loss</span>
                          <span>Date</span>
                        </div>

                        {tradingHistory.map((trade, index) => (
                          <div key={index} className="grid grid-cols-6 gap-4 items-center py-2">
                            <span className="font-medium">{trade.pair}</span>
                            <Badge
                              variant="outline"
                              className={
                                trade.type === "Buy"
                                  ? "text-crypto-green border-crypto-green"
                                  : "text-crypto-red border-crypto-red"
                              }
                            >
                              {trade.type}
                            </Badge>
                            <span>{trade.amount}</span>
                            <span>{trade.price}</span>
                            <span className={trade.profit.startsWith("+") ? "text-crypto-green" : "text-crypto-red"}>
                              {trade.profit}
                            </span>
                            <span className="text-muted-foreground">{trade.date}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="achievements">
                    <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                      <h3 className="text-xl font-semibold mb-6">Achievements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {achievements.map((achievement, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border transition-all duration-300 ${
                              achievement.earned
                                ? "bg-primary/10 border-primary/30 hover:border-primary/50"
                                : "bg-background/50 border-border/50 opacity-60"
                            }`}
                          >
                            <div className="text-center space-y-2">
                              <div className="text-3xl">{achievement.icon}</div>
                              <h4 className="font-semibold">{achievement.title}</h4>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                              {achievement.earned && (
                                <Badge variant="outline" className="text-crypto-green border-crypto-green">
                                  <Award className="w-3 h-3 mr-1" />
                                  Earned
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="security">
                    <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                      <h3 className="text-xl font-semibold mb-6">Security Settings</h3>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Badge variant="outline" className="text-crypto-green border-crypto-green">
                            Enabled
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
                          <div>
                            <h4 className="font-medium">Email Notifications</h4>
                            <p className="text-sm text-muted-foreground">Receive security alerts via email</p>
                          </div>
                          <Badge variant="outline" className="text-crypto-green border-crypto-green">
                            Enabled
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
                          <div>
                            <h4 className="font-medium">Login Notifications</h4>
                            <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                          </div>
                          <Badge variant="outline" className="text-crypto-blue border-crypto-blue">
                            Disabled
                          </Badge>
                        </div>

                        <div className="pt-4 border-t border-border/50">
                          <Button variant="outline" className="mr-4 bg-background/50">
                            Change Password
                          </Button>
                          <Button variant="outline" className="bg-background/50">
                            Download Backup Codes
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default UserProfile
