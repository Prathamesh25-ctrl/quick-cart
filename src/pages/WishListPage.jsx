import React, { useContext } from "react";
import ProductContext from "../components/context/ProductContext";
import ProductCard from "../components/product/ProductCard";
import { Link } from "react-router-dom";

function WishListPage() {
  const { productsList } = useContext(ProductContext);

  // filter favorite products safely
  const wishlistProducts = productsList?.filter(prod => prod.isFavorite === true);

  if (!wishlistProducts) {
    return (
      <div className='flex justify-center text-center items-center flex-col gap-4 px-4 py-16 min-h-[300px]'>
        <h1 className="font-bold text-xl text-slate-800">WishList Not Found</h1>
        <Link to={"/product"} className='border-2 border-solid border-sky-300 p-3 shadow-md rounded-xl text-sky-800 font-semibold hover:bg-sky-50 transition'>
          Add Products
        </Link>
      </div>
    )
  }

  return (
  
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {
        wishlistProducts.length <= 0 ? (
          <div className='flex justify-center text-center items-center flex-col gap-4 px-4 py-16 min-h-[300px] col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4'>
            <h1 className="font-bold text-xl text-slate-800">Your Wishlist is Empty</h1>
            <p className="text-gray-500 text-sm max-w-xs -mt-2">Explore our collection and add your favorite items here.</p>
            <Link to={"/product"} className='border border-solid border-sky-400 px-5 py-2.5 shadow-sm rounded-xl text-sky-800 font-bold bg-sky-50 hover:bg-sky-100 transition active:scale-95'>
              Add Products
            </Link>
          </div>
        ) : (
          wishlistProducts.map((product) => {
            return <ProductCard productDetails={product} key={product.id} />
          })
        )
      }
    </div>
  );
}

export default WishListPage;
