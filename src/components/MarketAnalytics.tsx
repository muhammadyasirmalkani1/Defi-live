import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Activity, Users, Globe } from "lucide-react";
import { cryptoUtils } from "@/lib/utils";

const MarketAnalytics = () => {
  const [marketData, setMarketData] = useState({
    totalMarketCap: 2.1e12,
    totalVolume: 89.5e9,
    btcDominance: 42.3,
    activeUsers: 125000000,
    fearGreedIndex: 72
  });

  const marketCapData = [
    { name: 'Bitcoin', value: 42.3, color: '#F7931A' },
    { name: 'Ethereum', value: 18.7, color: '#627EEA' },
    { name: 'BNB', value: 4.2, color: '#F3BA2F' },
    { name: 'Others', value: 34.8, color: '#8B5CF6' }
  ];

  const volumeData = [
    { name: 'Spot', volume: 45.2 },
    { name: 'Futures', volume: 78.3 },
    { name: 'Options', volume: 12.1 },
    { name: 'DeFi', volume: 23.8 },
    { name: 'NFT', volume: 8.9 }
  ];

  const trendingCoins = [
    { symbol: 'SHIB', change: '+23.5%', volume: '2.1B' },
    { symbol: 'DOGE', change: '+18.2%', volume: '1.8B' },
    { symbol: 'MATIC', change: '+15.7%', volume: '892M' },
    { symbol: 'SOL', change: '+12.4%', volume: '1.2B' },
    { symbol: 'AVAX', change: '+9.8%', volume: '567M' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        totalMarketCap: prev.totalMarketCap * (1 + (Math.random() - 0.5) * 0.001),
        totalVolume: prev.totalVolume * (1 + (Math.random() - 0.5) * 0.02),
        fearGreedIndex: Math.max(0, Math.min(100, prev.fearGreedIndex + (Math.random() - 0.5) * 2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getFearGreedLabel = (value: number) => {
    if (value <= 25) return { label: 'Extreme Fear', color: 'text-crypto-red' };
    if (value <= 45) return { label: 'Fear', color: 'text-crypto-orange' };
    if (value <= 55) return { label: 'Neutral', color: 'text-muted-foreground' };
    if (value <= 75) return { label: 'Greed', color: 'text-crypto-green' };
    return { label: 'Extreme Greed', color: 'text-crypto-green' };
  };

  const fearGreed = getFearGreedLabel(marketData.fearGreedIndex);

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Market Cap</p>
              <p className="text-xl font-bold">{cryptoUtils.formatMarketCap(marketData.totalMarketCap)}</p>
              <p className="text-sm text-crypto-green flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2.34%
              </p>
            </div>
            <div className="w-10 h-10 bg-crypto-blue/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-crypto-blue" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">24h Volume</p>
              <p className="text-xl font-bold">{cryptoUtils.formatMarketCap(marketData.totalVolume)}</p>
              <p className="text-sm text-crypto-red flex items-center">
                <TrendingDown className="w-3 h-3 mr-1" />
                -1.23%
              </p>
            </div>
            <div className="w-10 h-10 bg-crypto-green/20 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-crypto-green" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-xl font-bold">{cryptoUtils.formatMarketCap(marketData.activeUsers)}</p>
              <p className="text-sm text-crypto-green flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +5.67%
              </p>
            </div>
            <div className="w-10 h-10 bg-crypto-orange/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-crypto-orange" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Fear & Greed</p>
              <p className="text-xl font-bold">{marketData.fearGreedIndex.toFixed(0)}</p>
              <p className={`text-sm ${fearGreed.color}`}>{fearGreed.label}</p>
            </div>
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Market Cap Distribution */}
        <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
          <h3 className="text-lg font-semibold mb-4">Market Cap Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marketCapData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {marketCapData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: any) => [`${value}%`, 'Market Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {marketCapData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">{item.name}</span>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Trading Volume by Category */}
        <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
          <h3 className="text-lg font-semibold mb-4">Trading Volume by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}B`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: any) => [`$${value}B`, 'Volume']}
                />
                <Bar 
                  dataKey="volume" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Trending Coins */}
        <Card className="lg:col-span-2 p-6 bg-gradient-card backdrop-blur-sm border-border/50">
          <h3 className="text-lg font-semibold mb-4">🔥 Trending Coins</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {trendingCoins.map((coin, index) => (
              <div 
                key={coin.symbol}
                className="p-4 bg-background/50 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-center">
                  <h4 className="font-semibold text-lg">{coin.symbol}</h4>
                  <p className="text-crypto-green font-medium">{coin.change}</p>
                  <p className="text-sm text-muted-foreground">Vol: {coin.volume}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MarketAnalytics;
