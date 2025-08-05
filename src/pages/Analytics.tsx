import Navigation from "@/components/Navigation";
import MarketAnalytics from "@/components/MarketAnalytics";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, PieChart, Activity } from "lucide-react";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Market Analytics</h1>
            <p className="text-muted-foreground">Comprehensive crypto market analysis and insights</p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-background/50">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Trends</span>
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center space-x-2">
                <PieChart className="w-4 h-4" />
                <span>Analysis</span>
              </TabsTrigger>
              <TabsTrigger value="signals" className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Signals</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <MarketAnalytics />
            </TabsContent>

            <TabsContent value="trends">
              <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Advanced Trend Analysis</h3>
                  <p className="text-muted-foreground mb-4">
                    AI-powered trend analysis and market predictions would be available here.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Connect to Supabase to enable advanced analytics and AI features.
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="analysis">
              <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                <div className="text-center py-12">
                  <PieChart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Technical Analysis</h3>
                  <p className="text-muted-foreground mb-4">
                    Advanced technical indicators, pattern recognition, and market sentiment analysis.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Connect to Supabase to enable real-time technical analysis.
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="signals">
              <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                <div className="text-center py-12">
                  <Activity className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Trading Signals</h3>
                  <p className="text-muted-foreground mb-4">
                    Real-time trading signals, alerts, and automated strategies.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Connect to Supabase to enable AI-powered trading signals.
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
