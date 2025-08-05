import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import CryptoCard from "@/components/CryptoCard";
import { ArrowRight, Shield, Zap, BarChart3, TrendingUp, Coins, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-crypto.jpg";

const Index = () => {
  const cryptoData = [
    { symbol: "BTC", name: "Bitcoin", price: 45234.67, change24h: 2.34, icon: "₿" },
    { symbol: "ETH", name: "Ethereum", price: 3456.89, change24h: -1.23, icon: "Ξ" },
    { symbol: "BNB", name: "Binance Coin", price: 345.67, change24h: 4.56, icon: "🔶" },
    { symbol: "ADA", name: "Cardano", price: 1.23, change24h: 7.89, icon: "🔵" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Trading",
      description: "Bank-grade security with multi-layer protection for your assets"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Execute trades in milliseconds with our advanced matching engine"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time charts and analytics to make informed decisions"
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Trade 24/7 from anywhere in the world with our platform"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Trade <span className="bg-gradient-primary bg-clip-text text-transparent">Crypto</span> with
                  <br />
                  <span className="text-crypto-green">Confidence</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Join millions of traders on the world's leading cryptocurrency exchange. 
                  Experience lightning-fast trades, advanced charts, and secure storage.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/trading">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                    Start Trading
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="bg-gradient-card border-primary/20">
                  View Markets
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-crypto-green">$2.1T</div>
                  <div className="text-sm text-muted-foreground">Market Cap</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-crypto-blue">500+</div>
                  <div className="text-sm text-muted-foreground">Cryptocurrencies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-crypto-orange">24/7</div>
                  <div className="text-sm text-muted-foreground">Trading</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-3xl blur-3xl animate-float"></div>
              <img 
                src={heroImage} 
                alt="Crypto Trading Dashboard" 
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Live Crypto Prices */}
      <section className="py-12 px-4 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Live Market Prices</h2>
            <p className="text-muted-foreground">Real-time updates every few seconds</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cryptoData.map((crypto) => (
              <CryptoCard key={crypto.symbol} data={crypto} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose CryptoDeFi?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the next generation of cryptocurrency trading with our advanced platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-primary/10">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Ready to Start Trading?</h2>
            <p className="text-xl text-muted-foreground">
              Join millions of users and start your crypto journey today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/trading">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Trading Now
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-gradient-card border-primary/20">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
