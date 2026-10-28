import React, { Children, useContext, useState } from "react";
import ProductContext from "./ProductContext";

function ProductContextProvider({ children }) {
  const [productsList, setProductsList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //! Defening state  for Add to cart Products
  const [cartProducts, SetCartProducts] = useState([]);

  const [wishlistProducts, setWishlistProducts] = useState([]);


  const handleGetAllProducts = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`https://fakestoreapi.com/products`);
      let data = await response.json();

      // !Adding quantity field to handle increment and decrement to the product from cart page
      data = data.map((product) => ({ ...product, quantity: 1 }))

      setProductsList(data);
      setIsLoading(false);
    } catch (error) {
      console.log("erorr", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        isLoading,
        setIsLoading,
        error,
        setError,
        productsList,
        setProductsList,
        handleGetAllProducts,
        cartProducts,
        SetCartProducts,
        wishlistProducts,
        setWishlistProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;
