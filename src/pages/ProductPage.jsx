import React, { useContext, useEffect } from "react";
import ProductCard from "../components/product/ProductCard";
import ProductContext from "../components/context/ProductContext";
import { Loader2 } from "lucide-react"; 

function ProductPage() {
  const { productsList, error, isLoading, handleGetAllProducts } = useContext(ProductContext);

  useEffect(() => {
    handleGetAllProducts();
  }, []);


  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 w-full gap-3">
        {/* Loader2 आयकॉन 'animate-spin' मुळे गोल गोल फिरेल */}
        <Loader2 className="animate-spin text-blue-600" size={48} />
        <p className="text-gray-500 font-medium tracking-wide animate-pulse">
          Fetching Products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96 w-full px-4 text-center">
        <h1 className="text-xl font-semibold text-red-600">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 my-6 md:my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsList && productsList.map((productDetails) => {
          return (
            <ProductCard
              key={productDetails.id}
              productDetails={productDetails}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductPage;
