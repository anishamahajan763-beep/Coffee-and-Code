import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Package, ShoppingCart, BarChart3 } from "lucide-react";

interface LandingPageProps {
  onNavigate: (
    page: "home" | "products" | "addProduct" | "productDetail"
  ) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const features = [
    {
      icon: Package,
      title: "Smart Inventory",
      description: "Manage your inventory efficiently with real-time tracking",
    },
    {
      icon: ShoppingCart,
      title: "Easy Management",
      description: "Add, update, and manage products with just a few clicks",
    },
    {
      icon: TrendingUp,
      title: "Analytics",
      description: "Get detailed insights about your stock and sales trends",
    },
    {
      icon: BarChart3,
      title: "Reports",
      description: "Generate comprehensive reports for better decision making",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">SmartStock AI</h1>
          <Button
            onClick={() => onNavigate("products")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            View Inventory
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6">
            Intelligent Inventory Management
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your inventory management with AI-powered insights. Track
            stock levels, monitor expiry dates, and optimize your supply chain
            effortlessly.
          </p>
          <Button
            onClick={() => onNavigate("products")}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Why Choose SmartStock?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className="w-8 h-8 text-blue-600 mb-4" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2">10K+</div>
              <p className="text-blue-100">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2">99.9%</div>
              <p className="text-blue-100">Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2">24/7</div>
              <p className="text-blue-100">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6">
          Ready to Transform Your Inventory Management?
        </h3>
        <Button
          onClick={() => onNavigate("products")}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
        >
          Explore Products
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2026 SmartStock AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
