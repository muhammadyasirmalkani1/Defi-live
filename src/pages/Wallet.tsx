import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, Copy, QrCode, Shield, Wallet as WalletIcon } from "lucide-react";

const Wallet = () => {
  const walletBalances = [
    { symbol: "BTC", name: "Bitcoin", balance: 0.2534, value: 11467.89, icon: "₿" },
    { symbol: "ETH", name: "Ethereum", balance: 3.4567, value: 11945.67, icon: "Ξ" },
    { symbol: "USDT", name: "Tether", balance: 5234.56, value: 5234.56, icon: "₮" },
    { symbol: "BNB", name: "Binance Coin", balance: 12.8901, value: 4456.23, icon: "🔶" },
  ];

  const recentActivity = [
    { type: "received", asset: "BTC", amount: 0.0123, hash: "1A1zP1...eP2yNe", time: "2 hours ago" },
    { type: "sent", asset: "ETH", amount: 0.5, hash: "0x742d...35Bdf", time: "5 hours ago" },
    { type: "received", asset: "USDT", amount: 1000, hash: "3J98t1...7kF2q", time: "1 day ago" },
    { type: "sent", asset: "BNB", amount: 2.5, hash: "bnb1...4h8k", time: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Wallet</h1>
            <p className="text-muted-foreground">Manage your crypto assets securely</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Wallet Overview */}
            <Card className="lg:col-span-2 p-6 bg-gradient-card backdrop-blur-sm border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Wallet Balances</h2>
                <Button variant="outline" size="sm" className="bg-gradient-card border-primary/20">
                  <QrCode className="w-4 h-4 mr-2" />
                  Show QR
                </Button>
              </div>
              
              <div className="space-y-4">
                {walletBalances.map((asset) => (
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
                        <div className="font-semibold">{asset.balance.toLocaleString()} {asset.symbol}</div>
                        <div className="text-sm text-muted-foreground">${asset.value.toLocaleString()}</div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="bg-gradient-card border-crypto-green text-crypto-green hover:bg-crypto-green/10">
                          <ArrowDownLeft className="w-4 h-4 mr-1" />
                          Receive
                        </Button>
                        <Button size="sm" variant="outline" className="bg-gradient-card border-crypto-blue text-crypto-blue hover:bg-crypto-blue/10">
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Send/Receive */}
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
              <Tabs defaultValue="send" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="send">Send</TabsTrigger>
                  <TabsTrigger value="receive">Receive</TabsTrigger>
                </TabsList>
                
                <TabsContent value="send" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="asset">Asset</Label>
                      <select className="w-full p-3 rounded-lg bg-background/50 border border-border focus:border-primary">
                        <option>Bitcoin (BTC)</option>
                        <option>Ethereum (ETH)</option>
                        <option>Tether (USDT)</option>
                        <option>Binance Coin (BNB)</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="recipient">Recipient Address</Label>
                      <Input
                        id="recipient"
                        placeholder="Enter wallet address"
                        className="bg-background/50"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="send-amount">Amount</Label>
                      <Input
                        id="send-amount"
                        placeholder="0.00"
                        className="bg-background/50"
                      />
                      <div className="text-sm text-muted-foreground mt-1">
                        Available: 0.2534 BTC
                      </div>
                    </div>
                    
                    <div className="p-3 bg-background/50 rounded-lg border border-border/50">
                      <div className="flex justify-between text-sm">
                        <span>Network Fee:</span>
                        <span>0.0001 BTC (~$4.52)</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-crypto-blue hover:bg-crypto-blue/90">
                      <ArrowUpRight className="w-4 h-4 mr-2" />
                      Send Crypto
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="receive" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="receive-asset">Asset</Label>
                      <select className="w-full p-3 rounded-lg bg-background/50 border border-border focus:border-primary">
                        <option>Bitcoin (BTC)</option>
                        <option>Ethereum (ETH)</option>
                        <option>Tether (USDT)</option>
                        <option>Binance Coin (BNB)</option>
                      </select>
                    </div>
                    
                    <div className="text-center p-6 bg-background/50 rounded-lg border border-border/50">
                      <QrCode className="w-24 h-24 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">Your BTC Address</p>
                      <div className="p-2 bg-background rounded text-xs break-all font-mono">
                        1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full bg-gradient-card border-primary/20">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Address
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Wallet Security */}
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-crypto-green" />
                Security
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50">
                  <div>
                    <div className="font-medium">2FA Authentication</div>
                    <div className="text-sm text-muted-foreground">Enabled</div>
                  </div>
                  <Badge variant="outline" className="text-crypto-green border-crypto-green">
                    Active
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50">
                  <div>
                    <div className="font-medium">Email Verification</div>
                    <div className="text-sm text-muted-foreground">Verified</div>
                  </div>
                  <Badge variant="outline" className="text-crypto-green border-crypto-green">
                    Verified
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50">
                  <div>
                    <div className="font-medium">Backup Phrase</div>
                    <div className="text-sm text-muted-foreground">Secured</div>
                  </div>
                  <Badge variant="outline" className="text-crypto-green border-crypto-green">
                    Backed Up
                  </Badge>
                </div>
                
                <Button variant="outline" className="w-full bg-gradient-card border-primary/20 mt-4">
                  Security Settings
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="lg:col-span-2 p-6 bg-gradient-card backdrop-blur-sm border-border/50">
              <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
              
              <div className="space-y-3">
                <div className="grid grid-cols-5 gap-4 text-sm text-muted-foreground pb-2 border-b border-border">
                  <span>Type</span>
                  <span>Asset</span>
                  <span>Amount</span>
                  <span>Transaction Hash</span>
                  <span>Time</span>
                </div>
                
                {recentActivity.map((activity, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4 items-center py-2">
                    <Badge 
                      variant="outline" 
                      className={activity.type === 'received' ? 'text-crypto-green border-crypto-green' : 'text-crypto-blue border-crypto-blue'}
                    >
                      {activity.type === 'received' ? (
                        <ArrowDownLeft className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                      )}
                      {activity.type.toUpperCase()}
                    </Badge>
                    <span className="font-medium">{activity.asset}</span>
                    <span>{activity.amount.toLocaleString()} {activity.asset}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono">{activity.hash}</span>
                      <Button variant="ghost" size="sm" className="h-auto p-1">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <span className="text-muted-foreground">{activity.time}</span>
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

export default Wallet;
