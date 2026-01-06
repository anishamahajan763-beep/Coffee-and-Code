import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, ShoppingBag, ArrowLeft } from "lucide-react";
import type { Product } from "@/types";

interface ProductPageProps {
  onNavigate: (
    page: "home" | "products" | "addProduct" | "productDetail"
  ) => void;
  products: Product[];
  onAddProduct: () => void;
  onViewProduct: (product: Product) => void;
}

export default function ProductPage({
  onNavigate,
  products,
  onAddProduct,
  onViewProduct,
}: ProductPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const getDaysUntilExpiry = (expiryDate: string): number => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (days: number) => {
    if (days < 0)
      return {
        color: "bg-red-500 text-white",
        label: "Expired",
        bgLight: "bg-red-50",
      };
    if (days <= 7)
      return {
        color: "bg-red-500 text-white",
        label: "Critical",
        bgLight: "bg-red-50",
      };
    if (days <= 15)
      return {
        color: "bg-orange-500 text-white",
        label: "Warning",
        bgLight: "bg-orange-50",
      };
    if (days <= 30)
      return {
        color: "bg-yellow-500 text-white",
        label: "Caution",
        bgLight: "bg-yellow-50",
      };
    return {
      color: "bg-green-500 text-white",
      label: "Safe",
      bgLight: "bg-green-50",
    };
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => onNavigate("home")}
              className="p-2 hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-blue-600">Inventory</h1>
          </div>
          <Button
            onClick={() => onAddProduct()}
            className="bg-blue-600 hover:bg-blue-700 text-white hidden sm:flex"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
          <Button
            onClick={() => onAddProduct()}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:hidden"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-8">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search products by name, brand..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="pl-10 border border-gray-300 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filterCategory === category ? "default" : "outline"}
                  onClick={() => setFilterCategory(category)}
                  className={filterCategory === category ? "bg-blue-600" : ""}
                  size="sm"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id}>
                {product.batches.map((batch) => {
                  const days = getDaysUntilExpiry(batch.expiryDate);
                  const status = getExpiryStatus(days);

                  return (
                    <Card
                      key={batch.id}
                      className={`hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer ${status.bgLight}`}
                      onClick={() => onViewProduct(product)}
                    >
                      {/* Product Image Placeholder */}
                      <div className="w-full h-40 sm:h-48 bg-linear-to-br from-blue-100 to-blue-50 flex items-center justify-center relative">
                        <ShoppingBag className="w-16 h-16 sm:w-20 sm:h-20 text-blue-300" />
                        <Badge
                          className={`absolute top-2 right-2 ${status.color}`}
                        >
                          {status.label}
                        </Badge>
                      </div>

                      {/* Product Info */}
                      <CardHeader className="pb-3">
                        <div className="space-y-2">
                          <CardTitle className="text-base sm:text-lg line-clamp-2">
                            {product.name}
                          </CardTitle>
                          <p className="text-sm text-gray-600">
                            {product.brand}
                          </p>
                          <Badge variant="outline" className="w-fit text-xs">
                            {product.category}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Price Section */}
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Price
                          </p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600 line-through">
                                ₹{batch.costPrice.toFixed(2)}
                              </p>
                              <p className="text-xl sm:text-2xl font-bold text-blue-600">
                                ₹{batch.sellingPrice.toFixed(2)}
                              </p>
                            </div>
                            <p className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              {Math.round(
                                ((batch.sellingPrice - batch.costPrice) /
                                  batch.costPrice) *
                                  100
                              )}
                              % off
                            </p>
                          </div>
                        </div>

                        {/* Stock Info */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white p-2 rounded border border-gray-200">
                            <p className="text-xs text-gray-500">Quantity</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {batch.quantity}
                            </p>
                          </div>
                          <div className="bg-white p-2 rounded border border-gray-200">
                            <p className="text-xs text-gray-500">Days Left</p>
                            <p
                              className={`text-lg font-semibold ${status.color
                                .split(" ")[0]
                                .replace("bg-", "text-")}`}
                            >
                              {days}d
                            </p>
                          </div>
                        </div>

                        {/* Expiry Date */}
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">
                            Expiry Date
                          </p>
                          <p className="font-semibold text-gray-900">
                            {new Date(batch.expiryDate).toLocaleDateString(
                              "en-IN",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>

                        {/* Action Button */}
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewProduct(product);
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No products found</p>
            <p className="text-gray-400 text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
