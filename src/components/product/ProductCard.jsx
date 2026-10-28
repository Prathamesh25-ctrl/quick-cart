import { Heart, ScanEye, ShoppingCartPlus } from 'lucide-react';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import ProductContext from '../context/ProductContext';
import toast from "react-hot-toast";

function ProductCard({ productDetails }) {
   const { id, image, title, description, price, isFavorite } = productDetails;

   const { cartProducts, SetCartProducts , productsList , setProductsList } = useContext(ProductContext);

   const handleAddToCart = (productDetails) => {
      const isProductAlreadyInCart = cartProducts.some((cart) =>
         cart.id === productDetails.id,
      );
      if (isProductAlreadyInCart) {
         return toast.error("item already in cart", { position: "top-right" })
      }

      toast.success("Item added in cart", {
         position: "top-right",
      })
      SetCartProducts((prevState) => ([...prevState, productDetails]))
   }

   const handleAddToWishlist = (productId) => {
      const modifiedProductList = productsList.map((prod) =>
         prod.id === productId ? { ...prod, isFavorite: !prod.isFavorite } : prod,
      );

      setProductsList(modifiedProductList)
   };

   return (
      <div className="border border-slate-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between h-full">
         
         
         <div className="p-3 bg-slate-50 border-b border-slate-100 relative flex flex-col justify-center items-center">
            {/* add to favourite button */}
            <button onClick={() => handleAddToWishlist(id)}
               className="absolute right-3 top-3 z-10 p-1 rounded-full bg-white/80 hover:bg-white shadow-sm transition active:scale-90">
               <Heart size={24} strokeWidth="1.5px"
                  fill={isFavorite ? "red" : "transparent"}
                  className={isFavorite ? "text-red-600" : "text-gray-600"}
               />
            </button>
            
            <div className='w-full h-48 md:h-52 flex justify-center items-center p-2'>
               <img
                  className="max-w-full max-h-full object-contain"
                  src={`${image}`}
                  alt={`${title} image`}
               />
            </div>
         </div>

         {/* card body -> product title, description, price */}
         <div className="px-4 py-4 flex-grow flex flex-col justify-between space-y-3">
            <div>
               {/* title */}
               <h2 className="font-bold text-slate-800 line-clamp-2 text-base md:text-lg mb-1"> {title} </h2>
               {/* description */}
               <p className="text-gray-500 text-xs md:text-sm line-clamp-3 leading-relaxed">{description}</p>
            </div>

            <div>
               {/* `Price` */}
               <span className="capitalize text-sm text-gray-700 block mb-3">
                  price: <span className="font-bold text-xl text-slate-900"> ₹{price}</span>
               </span>
               
            
               <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <Link 
                     to={`/product/${id}`} 
                     className="bg-green-600 hover:bg-green-700 active:scale-98 transition flex items-center justify-center gap-1.5 text-xs md:text-sm text-white font-semibold px-3 py-2 rounded-lg flex-1 text-center"
                  >
                     <ScanEye size={18} />
                     View Details
                  </Link>
                  <button 
                     onClick={() => handleAddToCart(productDetails)} 
                     className="bg-blue-600 hover:bg-blue-700 active:scale-98 transition flex items-center justify-center gap-1.5 text-xs md:text-sm text-white font-semibold px-3 py-2 rounded-lg flex-1 text-center"
                  >
                     <ShoppingCartPlus size={18} />
                     Add to Cart
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductCard;
