import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@/types";

const CATEGORIES = [
  "Dairy",
  "Grains",
  "FMCG",
  "Beverages",
  "Snacks",
  "Frozen",
  "Personal Care",
  "Household",
];

interface AddProductPageProps {
  onNavigate: (
    page: "home" | "products" | "addProduct" | "productDetail"
  ) => void;
  onAddProduct: (product: Product) => void;
}

export default function AddProductPage({
  onNavigate,
  onAddProduct,
}: AddProductPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "Dairy",
    sku: "",
    expiryDate: "",
    costPrice: "",
    sellingPrice: "",
    quantity: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (!formData.costPrice) newErrors.costPrice = "Cost price is required";
    if (!formData.sellingPrice)
      newErrors.sellingPrice = "Selling price is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = () => {
    if (!validateForm()) return;

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      sku: formData.sku || `SKU-${Date.now()}`,
      batches: [
        {
          id: `b-${Date.now()}`,
          expiryDate: formData.expiryDate,
          costPrice: parseFloat(formData.costPrice),
          sellingPrice: parseFloat(formData.sellingPrice),
          quantity: parseInt(formData.quantity),
        },
      ],
    };

    onAddProduct(newProduct);
    onNavigate("products");
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate("products")}
            className="p-2 hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-blue-600">Add New Product</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Product Name & Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Product Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g., Whole Milk"
                  className={`${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand" className="text-sm font-medium">
                  Brand *
                </Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => handleChange("brand", e.target.value)}
                  placeholder="e.g., Amul"
                  className={`${
                    errors.brand ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.brand && (
                  <p className="text-red-500 text-xs">{errors.brand}</p>
                )}
              </div>
            </div>

            {/* Category & SKU */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleChange("category", value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku" className="text-sm font-medium">
                  SKU
                </Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => handleChange("sku", e.target.value)}
                  placeholder="Auto-generated if left empty"
                  className="border-gray-300"
                />
              </div>
            </div>

            {/* Quantity & Expiry Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-sm font-medium">
                  Quantity *
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleChange("quantity", e.target.value)}
                  placeholder="100"
                  className={`${
                    errors.quantity ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.quantity && (
                  <p className="text-red-500 text-xs">{errors.quantity}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="text-sm font-medium">
                  Expiry Date *
                </Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleChange("expiryDate", e.target.value)}
                  className={`${
                    errors.expiryDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-xs">{errors.expiryDate}</p>
                )}
              </div>
            </div>

            {/* Cost Price & Selling Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="costPrice" className="text-sm font-medium">
                  Cost Price (₹) *
                </Label>
                <Input
                  id="costPrice"
                  type="number"
                  step="0.01"
                  value={formData.costPrice}
                  onChange={(e) => handleChange("costPrice", e.target.value)}
                  placeholder="25.00"
                  className={`${
                    errors.costPrice ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.costPrice && (
                  <p className="text-red-500 text-xs">{errors.costPrice}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sellingPrice" className="text-sm font-medium">
                  Selling Price (₹) *
                </Label>
                <Input
                  id="sellingPrice"
                  type="number"
                  step="0.01"
                  value={formData.sellingPrice}
                  onChange={(e) => handleChange("sellingPrice", e.target.value)}
                  placeholder="30.00"
                  className={`${
                    errors.sellingPrice ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.sellingPrice && (
                  <p className="text-red-500 text-xs">{errors.sellingPrice}</p>
                )}
              </div>
            </div>

            {/* Profit Display */}
            {formData.costPrice && formData.sellingPrice && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700">
                  Profit: ₹
                  {(
                    parseFloat(formData.sellingPrice) -
                    parseFloat(formData.costPrice)
                  ).toFixed(2)}{" "}
                  per unit (
                  {(
                    ((parseFloat(formData.sellingPrice) -
                      parseFloat(formData.costPrice)) /
                      parseFloat(formData.costPrice)) *
                      100 || 0
                  ).toFixed(1)}
                  %)
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => onNavigate("products")}
                className="flex-1 border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddProduct}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add Product
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
