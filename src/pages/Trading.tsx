import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import TradingChart from "@/components/TradingChart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";
import { cryptoUtils } from "@/lib/utils";
import { animations } from "@/lib/animations";

const Trading = () => {
  const [selectedPair, setSelectedPair] = useState("BTC/USDT");
  const [orderType, setOrderType] = useState("market");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const tradingPairs = [
    { pair: "BTC/USDT", price: 45234.67, change: 2.34, volume: "1.2B" },
    { pair: "ETH/USDT", price: 3456.89, change: -1.23, volume: "890M" },
    { pair: "BNB/USDT", price: 345.67, change: 4.56, volume: "234M" },
    { pair: "ADA/USDT", price: 1.23, change: 7.89, volume: "156M" },
    { pair: "SOL/USDT", price: 98.45, change: -2.11, volume: "445M" },
  ];

  const [currentPrice, setCurrentPrice] = useState(45234.67);

  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = (Math.random() - 0.5) * 0.01;
      setCurrentPrice(prev => prev * (1 + fluctuation));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const orderBook = {
    bids: [
      { price: 45230.50, amount: 0.5234, total: 23679.82 },
      { price: 45225.25, amount: 1.2456, total: 56345.12 },
      { price: 45220.00, amount: 0.8901, total: 40245.67 },
      { price: 45215.75, amount: 2.1234, total: 95987.45 },
    ],
    asks: [
      { price: 45235.25, amount: 0.3456, total: 15634.78 },
      { price: 45240.50, amount: 0.7890, total: 35698.23 },
      { price: 45245.75, amount: 1.5678, total: 70934.56 },
      { price: 45250.00, amount: 0.9012, total: 40789.34 },
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Trading Dashboard</h1>
            <p className="text-muted-foreground">Professional crypto trading interface</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Trading Pairs */}
            <Card className="lg:col-span-1 p-4 bg-gradient-card backdrop-blur-sm border-border/50">
              <h3 className="font-semibold mb-4">Markets</h3>
              <div className="space-y-2">
                {tradingPairs.map((pair) => (
                  <div
                    key={pair.pair}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedPair === pair.pair
                        ? "bg-primary/20 border border-primary/30"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedPair(pair.pair)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{pair.pair}</div>
                        <div className="text-sm text-muted-foreground">Vol: {pair.volume}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${pair.price.toLocaleString()}</div>
                        <div className={`text-sm flex items-center ${
                          pair.change > 0 ? 'text-crypto-green' : 'text-crypto-red'
                        }`}>
                          {pair.change > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                          {pair.change.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Interactive Trading Chart */}
            <div className="lg:col-span-2">
              <TradingChart 
                symbol={selectedPair} 
                currentPrice={currentPrice}
              />
            </div>

            {/* Order Form */}
            <Card className="lg:col-span-1 p-4 bg-gradient-card backdrop-blur-sm border-border/50">
              <Tabs value={orderType} onValueChange={setOrderType} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="market">Market</TabsTrigger>
                  <TabsTrigger value="limit">Limit</TabsTrigger>
                </TabsList>
                
                <TabsContent value="market" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="bg-crypto-green hover:bg-crypto-green/90">Buy</Button>
                    <Button variant="outline" className="border-crypto-red text-crypto-red hover:bg-crypto-red/10">Sell</Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Available: 0.00 USDT
                    </div>
                    
                    <Button className="w-full bg-crypto-green hover:bg-crypto-green/90">
                      Buy BTC
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="limit" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="bg-crypto-green hover:bg-crypto-green/90">Buy</Button>
                    <Button variant="outline" className="border-crypto-red text-crypto-red hover:bg-crypto-red/10">Sell</Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="limit-price">Price</Label>
                      <Input
                        id="limit-price"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="limit-amount">Amount</Label>
                      <Input
                        id="limit-amount"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    
                    <Button className="w-full bg-crypto-green hover:bg-crypto-green/90">
                      Place Order
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Order Book */}
            <Card className="lg:col-span-2 p-4 bg-gradient-card backdrop-blur-sm border-border/50">
              <h3 className="font-semibold mb-4">Order Book</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm text-crypto-red mb-2">Asks (Sell Orders)</h4>
                  <div className="space-y-1">
                    {orderBook.asks.map((ask, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                        <span className="text-crypto-red">{ask.price.toFixed(2)}</span>
                        <span>{ask.amount.toFixed(4)}</span>
                        <span className="text-muted-foreground">{ask.total.toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm text-crypto-green mb-2">Bids (Buy Orders)</h4>
                  <div className="space-y-1">
                    {orderBook.bids.map((bid, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                        <span className="text-crypto-green">{bid.price.toFixed(2)}</span>
                        <span>{bid.amount.toFixed(4)}</span>
                        <span className="text-muted-foreground">{bid.total.toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Trades */}
            <Card className="lg:col-span-2 p-4 bg-gradient-card backdrop-blur-sm border-border/50">
              <h3 className="font-semibold mb-4">Recent Trades</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground pb-2 border-b border-border">
                  <span>Price</span>
                  <span>Amount</span>
                  <span>Time</span>
                </div>
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="grid grid-cols-3 gap-4 text-xs">
                    <span className={Math.random() > 0.5 ? 'text-crypto-green' : 'text-crypto-red'}>
                      {(45230 + Math.random() * 20).toFixed(2)}
                    </span>
                    <span>{(Math.random() * 2).toFixed(4)}</span>
                    <span className="text-muted-foreground">
                      {new Date(Date.now() - Math.random() * 300000).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trading;
