import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingBag, TrendingUp } from "lucide-react";
import type { Product } from "@/types";

interface ProductDetailPageProps {
  onNavigate: (
    page: "home" | "products" | "addProduct" | "productDetail"
  ) => void;
  product: Product | null;
}

export default function ProductDetailPage({
  onNavigate,
  product,
}: ProductDetailPageProps) {
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="border border-gray-200">
          <CardContent className="pt-6">
            <p className="text-gray-600">Product not found</p>
            <Button
              onClick={() => onNavigate("products")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Back to Inventory
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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

  const totalQuantity = product.batches.reduce(
    (sum, batch) => sum + batch.quantity,
    0
  );
  const totalValue = product.batches.reduce(
    (sum, batch) => sum + batch.sellingPrice * batch.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate("products")}
            className="p-2 hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-blue-600">Product Details</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Product Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Header Card */}
            <Card className="border border-gray-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <CardTitle className="text-3xl">{product.name}</CardTitle>
                    <p className="text-gray-600 text-lg">{product.brand}</p>
                  </div>
                  <Badge className="h-fit bg-blue-100 text-blue-800 text-base px-3 py-1">
                    {product.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">SKU</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {product.sku}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Total Quantity
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {totalQuantity} units
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-600 font-medium">
                    Total Inventory Value
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{totalValue.toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Batches */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Batches ({product.batches.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {product.batches.map((batch, index) => {
                  const days = getDaysUntilExpiry(batch.expiryDate);
                  const status = getExpiryStatus(days);
                  const batchValue = batch.sellingPrice * batch.quantity;

                  return (
                    <div
                      key={batch.id}
                      className={`border rounded-lg p-4 ${status.bgLight} border-gray-200`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-600 font-medium">
                            Batch {index + 1}
                          </p>
                          <p className="text-gray-900 font-semibold">
                            {batch.id}
                          </p>
                        </div>
                        <Badge className={`${status.color}`}>
                          {status.label}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 font-medium">
                            Quantity
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {batch.quantity}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-medium">
                            Cost Price
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            ₹{batch.costPrice.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-medium">
                            Selling Price
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            ₹{batch.sellingPrice.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-medium">
                            Profit/Unit
                          </p>
                          <p className="text-lg font-semibold text-green-600">
                            ₹{(batch.sellingPrice - batch.costPrice).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-300">
                        <div>
                          <p className="text-xs text-gray-600 font-medium">
                            Expiry Date
                          </p>
                          <p className="text-base font-semibold text-gray-900">
                            {new Date(batch.expiryDate).toLocaleDateString(
                              "en-IN",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-medium">
                            Days Remaining
                          </p>
                          <p
                            className={`text-base font-semibold ${
                              days < 0 ? "text-red-600" : "text-green-600"
                            }`}
                          >
                            {days < 0
                              ? `${Math.abs(days)} days expired`
                              : `${days} days`}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-300">
                        <p className="text-xs text-gray-600 font-medium">
                          Batch Value
                        </p>
                        <p className="text-xl font-bold text-blue-600">
                          ₹{batchValue.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-lg">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600 font-medium">
                      Total Units
                    </span>
                  </div>
                  <p className="font-bold text-gray-900">{totalQuantity}</p>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm text-gray-600 font-medium">
                    Batches
                  </span>
                  <p className="font-bold text-gray-900">
                    {product.batches.length}
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm text-gray-600 font-medium">
                    Avg. Cost Price
                  </span>
                  <p className="font-bold text-gray-900">
                    ₹
                    {(
                      product.batches.reduce((sum, b) => sum + b.costPrice, 0) /
                      product.batches.length
                    ).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm text-gray-600 font-medium">
                    Avg. Selling Price
                  </span>
                  <p className="font-bold text-gray-900">
                    ₹
                    {(
                      product.batches.reduce(
                        (sum, b) => sum + b.sellingPrice,
                        0
                      ) / product.batches.length
                    ).toFixed(2)}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 font-medium mb-2">
                    Total Inventory Value
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    ₹{totalValue.toFixed(2)}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 font-medium mb-2">
                    Total Profit
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    ₹
                    {product.batches
                      .reduce(
                        (sum, batch) =>
                          sum +
                          (batch.sellingPrice - batch.costPrice) *
                            batch.quantity,
                        0
                      )
                      .toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                onClick={() => onNavigate("products")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Back to Inventory
              </Button>
              <Button variant="outline" className="w-full border-gray-300">
                Edit Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
