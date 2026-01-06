import { useState, useEffect } from "react";
import LandingPage from "@/pages/LandingPage";
import ProductPage from "@/pages/ProductPage";
import AddProductPage from "@/pages/AddProductPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import type { Product } from "@/types";

function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "products" | "addProduct" | "productDetail"
  >("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };
    load();
  }, []);

  const handleNavigate = (
    page: "home" | "products" | "addProduct" | "productDetail"
  ) => {
    setCurrentPage(page);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage("productDetail");
  };

  const handleAddProduct = async (newProduct: Product) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) throw new Error("Failed to create");
      const created = await res.json();
      setProducts((p) => [...p, created]);
    } catch (err) {
      console.error("Create product failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage === "home" ? (
        <LandingPage onNavigate={handleNavigate} />
      ) : currentPage === "addProduct" ? (
        <AddProductPage
          onNavigate={handleNavigate}
          onAddProduct={handleAddProduct}
        />
      ) : currentPage === "productDetail" ? (
        <ProductDetailPage
          onNavigate={handleNavigate}
          product={selectedProduct}
        />
      ) : (
        <ProductPage
          onNavigate={handleNavigate}
          products={products}
          onAddProduct={() => handleNavigate("addProduct")}
          onViewProduct={handleViewProduct}
        />
      )}
    </div>
  );
}

export default App;
