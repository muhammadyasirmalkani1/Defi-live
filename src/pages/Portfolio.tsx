import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Wallet, DollarSign, PieChart, BarChart3 } from "lucide-react";

const Portfolio = () => {
  const [totalValue, setTotalValue] = useState(12456.78);

  const portfolio = [
    { 
      symbol: "BTC", 
      name: "Bitcoin", 
      amount: 0.2534, 
      value: 11467.89, 
      change24h: 2.34,
      allocation: 45.2,
      icon: "₿"
    },
    { 
      symbol: "ETH", 
      name: "Ethereum", 
      amount: 3.4567, 
      value: 11945.67, 
      change24h: -1.23,
      allocation: 35.8,
      icon: "Ξ"
    },
    { 
      symbol: "BNB", 
      name: "Binance Coin", 
      amount: 12.8901, 
      value: 4456.23, 
      change24h: 4.56,
      allocation: 12.3,
      icon: "🔶"
    },
    { 
      symbol: "ADA", 
      name: "Cardano", 
      amount: 1250.45, 
      value: 1587.99, 
      change24h: 7.89,
      allocation: 6.7,
      icon: "🔵"
    },
  ];

  const portfolioStats = [
    { label: "Total Balance", value: `$${totalValue.toLocaleString()}`, icon: DollarSign, color: "text-foreground" },
    { label: "24h Change", value: "+$234.56 (+1.88%)", icon: TrendingUp, color: "text-crypto-green" },
    { label: "Total Assets", value: "4", icon: Wallet, color: "text-crypto-blue" },
    { label: "Best Performer", value: "ADA (+7.89%)", icon: BarChart3, color: "text-crypto-orange" },
  ];

  const transactions = [
    { type: "buy", asset: "BTC", amount: 0.0123, price: 44567.89, time: "2 hours ago" },
    { type: "sell", asset: "ETH", amount: 0.5, price: 3445.67, time: "5 hours ago" },
    { type: "buy", asset: "BNB", amount: 5.0, price: 342.45, time: "1 day ago" },
    { type: "buy", asset: "ADA", amount: 100.0, price: 1.21, time: "2 days ago" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = (Math.random() - 0.5) * 0.005;
      setTotalValue(prev => prev * (1 + fluctuation));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Portfolio</h1>
            <p className="text-muted-foreground">Track your crypto investments and performance</p>
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {portfolioStats.map((stat, index) => (
              <Card key={index} className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
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

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Holdings */}
            <Card className="lg:col-span-2 p-6 bg-gradient-card backdrop-blur-sm border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Holdings</h2>
                <Button variant="outline" size="sm" className="bg-gradient-card border-primary/20">
                  Rebalance
                </Button>
              </div>
              
              <div className="space-y-4">
                {portfolio.map((asset) => (
                  <div key={asset.symbol} className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-2xl">
                          {asset.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{asset.symbol}</h3>
                          <p className="text-sm text-muted-foreground">{asset.name}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold">${asset.value.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{asset.amount} {asset.symbol}</div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`flex items-center space-x-1 ${
                          asset.change24h > 0 ? 'text-crypto-green' : 'text-crypto-red'
                        }`}>
                          {asset.change24h > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span>{asset.change24h > 0 ? '+' : ''}{asset.change24h.toFixed(2)}%</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{asset.allocation}% of portfolio</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Portfolio Allocation */}
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
              <h2 className="text-xl font-semibold mb-6">Allocation</h2>
              
              <div className="space-y-4">
                {portfolio.map((asset) => (
                  <div key={asset.symbol} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{asset.symbol}</span>
                      <span className="text-sm text-muted-foreground">{asset.allocation}%</span>
                    </div>
                    <div className="w-full bg-background/50 rounded-full h-2">
                      <div
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${asset.allocation}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-background/50 rounded-lg border border-border/50">
                <div className="flex items-center justify-center space-x-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Diversification Score: 82/100</span>
                </div>
              </div>
            </Card>

            {/* Recent Transactions */}
            <Card className="lg:col-span-3 p-6 bg-gradient-card backdrop-blur-sm border-border/50">
              <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
              
              <div className="space-y-3">
                <div className="grid grid-cols-5 gap-4 text-sm text-muted-foreground pb-2 border-b border-border">
                  <span>Type</span>
                  <span>Asset</span>
                  <span>Amount</span>
                  <span>Price</span>
                  <span>Time</span>
                </div>
                
                {transactions.map((tx, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4 items-center py-2">
                    <Badge 
                      variant="outline" 
                      className={tx.type === 'buy' ? 'text-crypto-green border-crypto-green' : 'text-crypto-red border-crypto-red'}
                    >
                      {tx.type.toUpperCase()}
                    </Badge>
                    <span className="font-medium">{tx.asset}</span>
                    <span>{tx.amount.toFixed(4)}</span>
                    <span>${tx.price.toLocaleString()}</span>
                    <span className="text-muted-foreground">{tx.time}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline" className="bg-gradient-card border-primary/20">
                  View All Transactions
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
