import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ChartData {
  time: string;
  price: number;
  volume: number;
}

interface TradingChartProps {
  symbol: string;
  currentPrice: number;
}

const TradingChart = ({ symbol, currentPrice }: TradingChartProps) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [timeframe, setTimeframe] = useState("1H");
  const [chartType, setChartType] = useState<"line" | "area">("area");

  // Generate initial chart data
  useEffect(() => {
    const generateData = () => {
      const data: ChartData[] = [];
      let basePrice = currentPrice;
      
      for (let i = 50; i >= 0; i--) {
        const variation = (Math.random() - 0.5) * 0.02;
        basePrice = basePrice * (1 + variation);
        
        data.push({
          time: new Date(Date.now() - i * 60000).toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          price: basePrice,
          volume: Math.random() * 1000000
        });
      }
      
      return data;
    };

    setChartData(generateData());
  }, [currentPrice]);

  // Update chart data in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prevData => {
        const newData = [...prevData];
        const lastPrice = newData[newData.length - 1]?.price || currentPrice;
        const variation = (Math.random() - 0.5) * 0.01;
        const newPrice = lastPrice * (1 + variation);
        
        newData.push({
          time: new Date().toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          price: newPrice,
          volume: Math.random() * 1000000
        });
        
        // Keep only last 50 data points
        return newData.slice(-50);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPrice]);

  const priceChange = chartData.length > 1 
    ? ((chartData[chartData.length - 1]?.price - chartData[0]?.price) / chartData[0]?.price) * 100 
    : 0;

  const isPositive = priceChange > 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm">
            <span className="text-muted-foreground">Price: </span>
            <span className="font-semibold">${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </p>
          {payload[1] && (
            <p className="text-sm">
              <span className="text-muted-foreground">Volume: </span>
              <span className="font-semibold">${(payload[1].value / 1000).toFixed(0)}K</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{symbol}</h2>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-2xl font-bold">
              ${chartData[chartData.length - 1]?.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || currentPrice.toLocaleString()}
            </span>
            <div className={`flex items-center space-x-1 ${isPositive ? 'text-crypto-green' : 'text-crypto-red'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{isPositive ? '+' : ''}{priceChange.toFixed(2)}%</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {["1H", "4H", "1D", "1W", "1M"].map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(tf)}
                className={timeframe === tf ? "bg-primary" : "bg-background/50"}
              >
                {tf}
              </Button>
            ))}
          </div>
          
          <div className="flex space-x-1 ml-4">
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("line")}
              className={chartType === "line" ? "bg-primary" : "bg-background/50"}
            >
              Line
            </Button>
            <Button
              variant={chartType === "area" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("area")}
              className={chartType === "area" ? "bg-primary" : "bg-background/50"}
            >
              Area
            </Button>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="time" 
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
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#priceGradient)"
              />
            </AreaChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="time" 
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
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TradingChart;
