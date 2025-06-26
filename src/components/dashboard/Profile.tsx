import { useState } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  Building,
  CreditCard,
  Clock,
  MessageSquare,
  Shield,
  Bell,
  Moon,
  Sun,
  Settings,
  Crown,
  Zap,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Profile = () => {
  const { theme, toggleTheme } = useTheme();
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@company.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corp",
    role: "Marketing Manager",
  });

  const [subscription, setSubscription] = useState({
    plan: "Pro",
    creditsRemaining: 1250,
    minutesRemaining: 840,
    billingCycle: "Monthly",
    nextBilling: "2025-01-20",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    lowCreditsAlert: true,
  });

  const handleProfileUpdate = () => {
    // Handle profile update logic
    console.log("Profile updated:", profile);
  };

  const handlePurchaseCredits = () => {
    // Handle credit purchase logic
    console.log("Purchasing credits...");
  };

  const handlePurchaseMinutes = () => {
    // Handle minutes purchase logic
    console.log("Purchasing minutes...");
  };

  const handleUpgradePlan = () => {
    // Handle plan upgrade logic
    console.log("Upgrading plan...");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
        <Settings className="w-8 h-8 text-muted-foreground" />
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Update your personal information and contact details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, name: e.target.value }))
                }
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, email: e.target.value }))
                }
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={profile.company}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, company: e.target.value }))
                }
                className="bg-background"
              />
            </div>
          </div>
          <Button onClick={handleProfileUpdate} className="w-full md:w-auto">
            Update Profile
          </Button>
        </CardContent>
      </Card>

      {/* Subscription & Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            Subscription & Usage
          </CardTitle>
          <CardDescription>
            Manage your subscription and monitor usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h3 className="font-semibold text-lg">
                Current Plan: {subscription.plan}
              </h3>
              <p className="text-sm text-muted-foreground">
                {subscription.billingCycle} billing • Next payment:{" "}
                {subscription.nextBilling}
              </p>
            </div>
            <Button
              onClick={handleUpgradePlan}
              variant="outline"
              className="gap-2"
            >
              <Zap className="w-4 h-4" />
              Upgrade Plan
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Credits */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Credits</span>
                  </div>
                  <Badge variant="secondary">
                    {subscription.creditsRemaining} left
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (subscription.creditsRemaining / 2000) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{subscription.creditsRemaining} / 2000</span>
                    <span>62.5% remaining</span>
                  </div>
                  <Button
                    onClick={handlePurchaseCredits}
                    size="sm"
                    className="w-full"
                  >
                    Purchase More Credits
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Minutes */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Call Minutes</span>
                  </div>
                  <Badge variant="secondary">
                    {subscription.minutesRemaining} left
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (subscription.minutesRemaining / 1000) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{subscription.minutesRemaining} / 1000</span>
                    <span>84% remaining</span>
                  </div>
                  <Button
                    onClick={handlePurchaseMinutes}
                    size="sm"
                    className="w-full"
                    variant="outline"
                  >
                    Purchase More Minutes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Preferences
          </CardTitle>
          <CardDescription>
            Customize your experience and notification settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === "dark" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
              <div>
                <Label className="text-base font-medium">Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Choose between light and dark mode
                </p>
              </div>
            </div>
            <Button onClick={toggleTheme} variant="outline" size="sm">
              {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
            </Button>
          </div>

          <Separator />

          {/* Notification Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              <Label className="text-base font-medium">Notifications</Label>
            </div>

            <div className="space-y-3 ml-7">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      emailNotifications: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Browser push notifications
                  </p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      pushNotifications: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Weekly summary emails
                  </p>
                </div>
                <Switch
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      weeklyReports: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Low Credits Alert</Label>
                  <p className="text-sm text-muted-foreground">
                    Alert when credits are running low
                  </p>
                </div>
                <Switch
                  checked={notifications.lowCreditsAlert}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      lowCreditsAlert: checked,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security
          </CardTitle>
          <CardDescription>
            Manage your account security and password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full md:w-auto">
            Change Password
          </Button>
          <Button variant="outline" className="w-full md:w-auto">
            Enable Two-Factor Authentication
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
