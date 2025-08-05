"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  SettingsIcon,
  Bell,
  Shield,
  Palette,
  Globe,
  Smartphone,
  Mail,
  Lock,
  Eye,
  Download,
  Trash2,
  AlertTriangle,
  Moon,
  Sun,
  Monitor,
} from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuth } from "@/contexts/AuthContext"

const Settings = () => {
  const { user } = useAuth()
  const [theme, setTheme] = useState("dark")
  const [language, setLanguage] = useState("en")
  const [currency, setCurrency] = useState("USD")

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    trading: true,
    security: true,
    marketing: false,
    priceAlerts: true,
    orderUpdates: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    tradingStatsVisible: false,
    onlineStatus: true,
    activityVisible: false,
  })

  const [security, setSecurity] = useState({
    twoFactor: true,
    loginNotifications: true,
    sessionTimeout: "30",
    ipWhitelist: false,
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
  }

  const handleSecurityChange = (key: string, value: boolean | string) => {
    setSecurity((prev) => ({ ...prev, [key]: value }))
  }

  const exportData = () => {
    // Export user data logic
    console.log("Exporting user data...")
  }

  const deleteAccount = () => {
    // Delete account logic
    console.log("Account deletion requested...")
  }

  return (
    <ProtectedRoute requiredPermission="read">
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />

        <div className="pt-20 px-4">
          <div className="container mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-muted-foreground">Manage your account preferences and security settings</p>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6 bg-background/50">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="trading">Trading</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <div className="grid gap-6">
                  {/* Appearance */}
                  <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                    <div className="flex items-center space-x-2 mb-4">
                      <Palette className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">Appearance</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Theme</Label>
                        <div className="flex space-x-2">
                          {[
                            { value: "light", icon: Sun, label: "Light" },
                            { value: "dark", icon: Moon, label: "Dark" },
                            { value: "system", icon: Monitor, label: "System" },
                          ].map((themeOption) => (
                            <Button
                              key={themeOption.value}
                              variant={theme === themeOption.value ? "default" : "outline"}
                              onClick={() => setTheme(themeOption.value)}
                              className="flex items-center space-x-2"
                            >
                              <themeOption.icon className="w-4 h-4" />
                              <span>{themeOption.label}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Localization */}
                  <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                    <div className="flex items-center space-x-2 mb-4">
                      <Globe className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">Localization</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <select
                          id="language"
                          className="w-full p-3 rounded-lg bg-background/50 border border-border focus:border-primary"
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                        >
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                          <option value="zh">中文</option>
                          <option value="ja">日本語</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currency">Default Currency</Label>
                        <select
                          id="currency"
                          className="w-full p-3 rounded-lg bg-background/50 border border-border focus:border-primary"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                        >
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                          <option value="JPY">JPY - Japanese Yen</option>
                          <option value="CAD">CAD - Canadian Dollar</option>
                          <option value="AUD">AUD - Australian Dollar</option>
                        </select>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="notifications">
                <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                  <div className="flex items-center space-x-2 mb-6">
                    <Bell className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Notification Preferences</h3>
                  </div>

                  <div className="space-y-6">
                    {/* Notification Channels */}
                    <div>
                      <h4 className="font-medium mb-4">Notification Channels</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Email Notifications</p>
                              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                            </div>
                          </div>
                          <Switch
                            checked={notifications.email}
                            onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Smartphone className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Push Notifications</p>
                              <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                            </div>
                          </div>
                          <Switch
                            checked={notifications.push}
                            onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Smartphone className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">SMS Notifications</p>
                              <p className="text-sm text-muted-foreground">Receive important alerts via SMS</p>
                            </div>
                          </div>
                          <Switch
                            checked={notifications.sms}
                            onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Notification Types */}
                    <div>
                      <h4 className="font-medium mb-4">Notification Types</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Trading Alerts</p>
                            <p className="text-sm text-muted-foreground">Order fills, position updates</p>
                          </div>
                          <Switch
                            checked={notifications.trading}
                            onCheckedChange={(checked) => handleNotificationChange("trading", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Security Alerts</p>
                            <p className="text-sm text-muted-foreground">Login attempts, security changes</p>
                          </div>
                          <Switch
                            checked={notifications.security}
                            onCheckedChange={(checked) => handleNotificationChange("security", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Price Alerts</p>
                            <p className="text-sm text-muted-foreground">Cryptocurrency price movements</p>
                          </div>
                          <Switch
                            checked={notifications.priceAlerts}
                            onCheckedChange={(checked) => handleNotificationChange("priceAlerts", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Marketing Communications</p>
                            <p className="text-sm text-muted-foreground">Product updates, promotions</p>
                          </div>
                          <Switch
                            checked={notifications.marketing}
                            onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <div className="space-y-6">
                  {/* Two-Factor Authentication */}
                  <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                    <div className="flex items-center space-x-2 mb-4">
                      <Shield className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Authenticator App</p>
                          <p className="text-sm text-muted-foreground">Use Google Authenticator or similar app</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-crypto-green border-crypto-green">
                            Enabled
                          </Badge>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Authentication</p>
                          <p className="text-sm text-muted-foreground">Receive codes via SMS</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-muted-foreground border-muted-foreground">
                            Disabled
                          </Badge>
                          <Button variant="outline" size="sm">
                            Setup
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Login Security */}
                  <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                    <div className="flex items-center space-x-2 mb-4">
                      <Lock className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">Login Security</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Login Notifications</p>
                          <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                        </div>
                        <Switch
                          checked={security.loginNotifications}
                          onCheckedChange={(checked) => handleSecurityChange("loginNotifications", checked)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          value={security.sessionTimeout}
                          onChange={(e) => handleSecurityChange("sessionTimeout", e.target.value)}
                          className="bg-background/50 w-32"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">IP Whitelist</p>
                          <p className="text-sm text-muted-foreground">Only allow login from specific IP addresses</p>
                        </div>
                        <Switch
                          checked={security.ipWhitelist}
                          onCheckedChange={(checked) => handleSecurityChange("ipWhitelist", checked)}
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Password */}
                  <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                    <div className="flex items-center space-x-2 mb-4">
                      <Eye className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">Password</h3>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">Last changed: 30 days ago</p>
                      <Button variant="outline" className="bg-background/50">
                        Change Password
                      </Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="privacy">
                <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                  <div className="flex items-center space-x-2 mb-6">
                    <Eye className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Privacy Settings</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Profile Visibility</p>
                        <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                      </div>
                      <Switch
                        checked={privacy.profileVisible}
                        onCheckedChange={(checked) => handlePrivacyChange("profileVisible", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Trading Statistics</p>
                        <p className="text-sm text-muted-foreground">Show your trading performance publicly</p>
                      </div>
                      <Switch
                        checked={privacy.tradingStatsVisible}
                        onCheckedChange={(checked) => handlePrivacyChange("tradingStatsVisible", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Online Status</p>
                        <p className="text-sm text-muted-foreground">Show when you're online</p>
                      </div>
                      <Switch
                        checked={privacy.onlineStatus}
                        onCheckedChange={(checked) => handlePrivacyChange("onlineStatus", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Activity Visibility</p>
                        <p className="text-sm text-muted-foreground">Show your recent activity to followers</p>
                      </div>
                      <Switch
                        checked={privacy.activityVisible}
                        onCheckedChange={(checked) => handlePrivacyChange("activityVisible", checked)}
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="trading">
                <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                  <div className="flex items-center space-x-2 mb-6">
                    <SettingsIcon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Trading Preferences</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="defaultOrderType">Default Order Type</Label>
                        <select
                          id="defaultOrderType"
                          className="w-full p-3 rounded-lg bg-background/50 border border-border focus:border-primary"
                        >
                          <option value="market">Market Order</option>
                          <option value="limit">Limit Order</option>
                          <option value="stop">Stop Order</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="riskLevel">Risk Level</Label>
                        <select
                          id="riskLevel"
                          className="w-full p-3 rounded-lg bg-background/50 border border-border focus:border-primary"
                        >
                          <option value="conservative">Conservative</option>
                          <option value="moderate">Moderate</option>
                          <option value="aggressive">Aggressive</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Auto-confirm Orders</p>
                          <p className="text-sm text-muted-foreground">Skip confirmation for small orders</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Advanced Trading Features</p>
                          <p className="text-sm text-muted-foreground">Enable margin trading and derivatives</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="account">
                <div className="space-y-6">
                  {/* Data Export */}
                  <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
                    <div className="flex items-center space-x-2 mb-4">
                      <Download className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">Data Export</h3>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Download a copy of your account data, including trading history, transactions, and profile
                        information.
                      </p>
                      <Button onClick={exportData} variant="outline" className="bg-background/50">
                        <Download className="w-4 h-4 mr-2" />
                        Export My Data
                      </Button>
                    </div>
                  </Card>

                  {/* Account Deletion */}
                  <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 border-crypto-red/30">
                    <div className="flex items-center space-x-2 mb-4">
                      <AlertTriangle className="w-5 h-5 text-crypto-red" />
                      <h3 className="text-lg font-semibold text-crypto-red">Danger Zone</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Delete Account</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <Button
                          onClick={deleteAccount}
                          variant="outline"
                          className="border-crypto-red text-crypto-red hover:bg-crypto-red/10 bg-transparent"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Settings
