/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
  };
}

export default function TaskISRPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    if (id) fetchProduct();
  }, [id]);

  // Hàm chuyển đến trang giỏ hàng
  const goToCart = () => {
    router.push('/cart');
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Product Detail Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-96 md:h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-8">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={product.category.image}
                    alt={product.category.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-500">{product.category.name}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <div className="text-2xl font-bold text-blue-600 mb-4">${product.price}</div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  🛒 Add to Cart
                </button>
                <button 
                  onClick={goToCart}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  💳 Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products hoặc Additional Info */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Product Details</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Category</h3>
                <p className="text-gray-600">{product.category.name}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Product ID</h3>
                <p className="text-gray-600">#{product.id}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Price</h3>
                <p className="text-gray-600 font-bold">${product.price}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Availability</h3>
                <p className="text-green-600 font-semibold">In Stock</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}