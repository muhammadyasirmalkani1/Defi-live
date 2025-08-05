"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Activity, Globe, Zap } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import ProtectedRoute from "@/components/ProtectedRoute"

const Trends = () => {
  const [timeframe, setTimeframe] = useState("24h")

  const trendingCryptos = [
    {
      symbol: "SHIB",
      name: "Shiba Inu",
      price: 0.000024,
      change: 23.45,
      volume: "2.1B",
      marketCap: "14.2B",
      icon: "🐕",
    },
    {
      symbol: "DOGE",
      name: "Dogecoin",
      price: 0.087,
      change: 18.23,
      volume: "1.8B",
      marketCap: "12.4B",
      icon: "🐶",
    },
    {
      symbol: "MATIC",
      name: "Polygon",
      price: 1.23,
      change: 15.67,
      volume: "892M",
      marketCap: "11.8B",
      icon: "🔷",
    },
    {
      symbol: "SOL",
      name: "Solana",
      price: 98.45,
      change: 12.34,
      volume: "1.2B",
      marketCap: "42.1B",
      icon: "☀️",
    },
    {
      symbol: "AVAX",
      name: "Avalanche",
      price: 34.56,
      change: 9.87,
      volume: "567M",
      marketCap: "13.2B",
      icon: "🏔️",
    },
  ]

  const marketTrends = [
    { category: "DeFi", change: "+12.5%", volume: "$4.2B", projects: 234 },
    { category: "NFTs", change: "+8.3%", volume: "$1.8B", projects: 89 },
    { category: "Gaming", change: "+15.7%", volume: "$2.1B", projects: 156 },
    { category: "Metaverse", change: "+6.9%", volume: "$1.4B", projects: 67 },
    { category: "Layer 2", change: "+18.2%", volume: "$3.5B", projects: 45 },
  ]

  const socialTrends = [
    { platform: "Twitter", mentions: "45.2K", sentiment: "Bullish", change: "+23%" },
    { platform: "Reddit", mentions: "12.8K", sentiment: "Neutral", change: "+5%" },
    { platform: "Discord", mentions: "8.9K", sentiment: "Bullish", change: "+18%" },
    { platform: "Telegram", mentions: "23.4K", sentiment: "Bearish", change: "-12%" },
  ]

  const newsEvents = [
    {
      title: "Major Exchange Lists New DeFi Token",
      impact: "High",
      time: "2 hours ago",
      category: "Listings",
    },
    {
      title: "Regulatory Update: New Crypto Guidelines",
      impact: "Medium",
      time: "4 hours ago",
      category: "Regulation",
    },
    {
      title: "Whale Movement: 10,000 BTC Transferred",
      impact: "High",
      time: "6 hours ago",
      category: "On-Chain",
    },
    {
      title: "Partnership Announcement: Major Tech Company",
      impact: "Medium",
      time: "8 hours ago",
      category: "Partnership",
    },
  ]

  const chartData = [
    { time: "00:00", value: 100 },
    { time: "04:00", value: 105 },
    { time: "08:00", value: 98 },
    { time: "12:00", value: 112 },
    { time: "16:00", value: 108 },
    { time: "20:00", value: 115 },
    { time: "24:00", value: 118 },
  ]

  return (
    <ProtectedRoute requiredPermission="read">
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />

        <div className="pt-20 px-4">
          <div className="container mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Market Trends</h1>
              <p className="text-muted-foreground">Real-time market analysis and trending cryptocurrencies</p>
            </div>

            {/* Trending Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Trending Coins</p>
                    <p className="text-2xl font-bold text-crypto-green">+15</p>
                    <p className="text-sm text-crypto-green">↑ 23% from yesterday</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-crypto-green" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Market Sentiment</p>
                    <p className="text-2xl font-bold text-crypto-orange">Bullish</p>
                    <p className="text-sm text-crypto-green">Fear & Greed: 72</p>
                  </div>
                  <Activity className="w-8 h-8 text-crypto-orange" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Social Volume</p>
                    <p className="text-2xl font-bold text-crypto-blue">89.2K</p>
                    <p className="text-sm text-crypto-green">↑ 12% mentions</p>
                  </div>
                  <Globe className="w-8 h-8 text-crypto-blue" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Trends</p>
                    <p className="text-2xl font-bold text-crypto-purple">24</p>
                    <p className="text-sm text-crypto-green">↑ 8 new trends</p>
                  </div>
                  <Zap className="w-8 h-8 text-crypto-purple" />
                </div>
              </Card>
            </div>

            <Tabs defaultValue="trending" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-background/50">
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
                <TabsTrigger value="losers">Top Losers</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
              </TabsList>

              <TabsContent value="trending">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Trending Cryptocurrencies */}
                  <Card className="lg:col-span-2 p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">🔥 Trending Cryptocurrencies</h2>
                      <div className="flex space-x-2">
                        {["1H", "24H", "7D", "30D"].map((period) => (
                          <Button
                            key={period}
                            variant={timeframe === period.toLowerCase() ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTimeframe(period.toLowerCase())}
                            className={timeframe === period.toLowerCase() ? "bg-primary" : "bg-background/50"}
                          >
                            {period}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {trendingCryptos.map((crypto, index) => (
                        <div
                          key={crypto.symbol}
                          className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-all duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{crypto.icon}</span>
                                <div>
                                  <h3 className="font-semibold">{crypto.symbol}</h3>
                                  <p className="text-sm text-muted-foreground">{crypto.name}</p>
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="font-semibold">${crypto.price.toFixed(6)}</div>
                              <div className="flex items-center space-x-1 text-crypto-green">
                                <TrendingUp className="w-4 h-4" />
                                <span>+{crypto.change.toFixed(2)}%</span>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">Volume</div>
                              <div className="font-medium">{crypto.volume}</div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">Market Cap</div>
                              <div className="font-medium">${crypto.marketCap}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Market Trends */}
                  <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                    <h3 className="font-semibold mb-4">Market Categories</h3>
                    <div className="space-y-4">
                      {marketTrends.map((trend, index) => (
                        <div key={index} className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{trend.category}</span>
                            <Badge variant="outline" className="text-crypto-green border-crypto-green">
                              {trend.change}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <div>Volume: {trend.volume}</div>
                            <div>Projects: {trend.projects}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="gainers">
                <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                  <h2 className="text-xl font-semibold mb-6">📈 Top Gainers (24h)</h2>
                  <div className="space-y-4">
                    {trendingCryptos.slice(0, 10).map((crypto, index) => (
                      <div
                        key={crypto.symbol}
                        className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50"
                      >
                        <div className="flex items-center space-x-4">
                          <span className="w-8 text-center font-medium">{index + 1}</span>
                          <span className="text-2xl">{crypto.icon}</span>
                          <div>
                            <div className="font-semibold">{crypto.symbol}</div>
                            <div className="text-sm text-muted-foreground">{crypto.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${crypto.price.toFixed(6)}</div>
                          <div className="text-crypto-green">+{crypto.change.toFixed(2)}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="losers">
                <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                  <h2 className="text-xl font-semibold mb-6">📉 Top Losers (24h)</h2>
                  <div className="text-center py-12">
                    <TrendingDown className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Market Looking Strong</h3>
                    <p className="text-muted-foreground">Most cryptocurrencies are showing positive trends today</p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="social">
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                    <h2 className="text-xl font-semibold mb-6">Social Media Trends</h2>
                    <div className="space-y-4">
                      {socialTrends.map((trend, index) => (
                        <div key={index} className="p-4 rounded-lg bg-background/50 border border-border/50">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{trend.platform}</div>
                              <div className="text-sm text-muted-foreground">{trend.mentions} mentions</div>
                            </div>
                            <div className="text-right">
                              <Badge
                                variant="outline"
                                className={
                                  trend.sentiment === "Bullish"
                                    ? "text-crypto-green border-crypto-green"
                                    : trend.sentiment === "Bearish"
                                      ? "text-crypto-red border-crypto-red"
                                      : "text-muted-foreground border-muted-foreground"
                                }
                              >
                                {trend.sentiment}
                              </Badge>
                              <div className="text-sm mt-1">{trend.change}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                    <h2 className="text-xl font-semibold mb-6">Sentiment Analysis</h2>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--crypto-green))" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="hsl(var(--crypto-green))" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--background))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="hsl(var(--crypto-green))"
                            strokeWidth={2}
                            fill="url(#sentimentGradient)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="news">
                <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                  <h2 className="text-xl font-semibold mb-6">📰 Market Moving News</h2>
                  <div className="space-y-4">
                    {newsEvents.map((news, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-all duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium mb-2">{news.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{news.time}</span>
                              <Badge variant="outline" className="text-xs">
                                {news.category}
                              </Badge>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              news.impact === "High"
                                ? "text-crypto-red border-crypto-red"
                                : news.impact === "Medium"
                                  ? "text-crypto-orange border-crypto-orange"
                                  : "text-crypto-green border-crypto-green"
                            }
                          >
                            {news.impact} Impact
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Trends
