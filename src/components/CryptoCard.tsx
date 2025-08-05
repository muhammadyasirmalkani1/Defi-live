import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
}

interface CryptoCardProps {
  data: CryptoData;
}

const CryptoCard = ({ data }: CryptoCardProps) => {
  const [currentPrice, setCurrentPrice] = useState(data.price);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      // Simulate price fluctuation
      const fluctuation = (Math.random() - 0.5) * 0.02; // ±1% max change
      setCurrentPrice(prev => prev * (1 + fluctuation));
      
      setTimeout(() => setIsUpdating(false), 300);
    }, 3000 + Math.random() * 2000); // Random intervals between 3-5 seconds

    return () => clearInterval(interval);
  }, []);

  const isPositive = data.change24h > 0;

  return (
    <Card className={`p-6 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 ${
      isUpdating ? 'animate-pulse-glow' : ''
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-2xl">
            {data.icon}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{data.symbol}</h3>
            <p className="text-sm text-muted-foreground">{data.name}</p>
          </div>
        </div>
        {isPositive ? (
          <TrendingUp className="w-5 h-5 text-crypto-green" />
        ) : (
          <TrendingDown className="w-5 h-5 text-crypto-red" />
        )}
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-foreground">
          ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className={`flex items-center space-x-1 text-sm ${
          isPositive ? 'text-crypto-green' : 'text-crypto-red'
        }`}>
          <span>{isPositive ? '+' : ''}{data.change24h.toFixed(2)}%</span>
          <span className="text-muted-foreground">24h</span>
        </div>
      </div>
    </Card>
  );
};

export default CryptoCard;
