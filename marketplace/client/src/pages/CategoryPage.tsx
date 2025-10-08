import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/marketplace/ProductCard";
import { Skeleton } from "../components/ui/skeleton";
import CategoryBanner from "../components/category/CategoryBanner";

interface Farmer {
  _id: string;
  name: string;
  email: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  images: string[];
  farmerId: Farmer;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/category/${slug}`
        );

        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const productsWithFullImages = res.data.map((product: Product) => ({
          ...product,
          images: product.images.map((img: string) =>
            img.startsWith("http")
              ? img
              : `${baseUrl}${img.startsWith("/") ? "" : "/"}${img}`
          ),
        }));

        setProducts(productsWithFullImages);
      } catch (error) {
        console.error("Error fetching products by category", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProducts();
  }, [slug]);

  const handleProductClick = (productId: string) => {
    navigate(`/marketplace/product/${productId}`);
  };

  const handleDelete = async (productId: string) => {
    console.log("Delete product:", productId);
    // Optional: implement delete functionality
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-64 mx-auto mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} className="h-80 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground text-center max-w-sm">
          No products available in the "{slug?.replace("_", " ")}" category.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 ">
  <CategoryBanner slug={slug} />


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 cursor-pointer">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onUpdate={() => {}} // No-op for category page
              currentUserId="" // Replace with logged-in user ID if needed
              onClick={handleProductClick} // Navigate to product details page
              onDelete={handleDelete}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Showing {products.length} product{products.length !== 1 ? "s" : ""}{" "}
            in{" "}
            <span className="font-semibold text-foreground">
              {slug?.replace("_", " ")}
            </span>
          </p>
        </div>
      </div>
      </div>
    
  );
};

export default CategoryPage;
