import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useContext } from 'react'
import ProductContext from "../context/ProductContext";


function CartProductCard({ product }) {

  const { id, image, title, description, price , quantity } = product;
  const { cartProducts, SetCartProducts } = useContext(ProductContext);


  const handleDecrement = (productId) => {
    const modifiedCartProduct = cartProducts.map((prod) => {
      if (prod.id === productId && prod.quantity > 1) {
        console.log("product qunt", prod.quantity);
        return { ...prod, quantity: prod.quantity - 1 };
      } else {
        return prod;
      }
    });
    SetCartProducts(modifiedCartProduct)
  };

  // cart increment 

  const handleIncrement = (productId) => {
    const modifiedCartProduct = cartProducts.map((prod) => {
      if (prod.id === productId && prod.quantity >= 1) {
        console.log("product qunt", prod.quantity);
        return { ...prod, quantity: prod.quantity + 1 };
      } else {
        return prod;
      }
    });
    SetCartProducts(modifiedCartProduct)
  };

  const handleRemove = (productId)=>{
    const updateCart = cartProducts.filter((prod)=> prod.id !== productId);
    SetCartProducts(updateCart);
  }

  return (
    <div className="">
      <div className="screen overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-[0.5fr_1fr_0.5fr] gap-x-2 m-4 items-center shadow max-sm:grid-cols-1">
          <div className="h-40">
            <img
              className="w-full h-full object-contain"
              src={`${image}`}
              alt="Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops image"
            />
          </div>
          <div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">
                {" "}
                {`${title}`}
                {" "}
              </h2>
              <p className="text-slate-700 text-sm max-sm:line-clamp-3 line-clamp-2">
                {`${description}`}
              </p>
              <div>
                <span className="capitalize">
                  price :<span className="font-medium text-xl">{`${price}`} </span>
                </span>
                <span className="capitalize">
                  subtotal :<span className="font-medium text-xl"> {(price * quantity).toFixed(2)} </span>
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2.5 flex flex-col  items-center max-sm:flex-row max-sm:gap-4 max-sm:justify-center max-sm:py-2 max-sm:space-y-0">
            <div className="flex items-center">
              <button
                onClick={() => handleDecrement(id)}
                className="bg-blue-600 text-white p-2 rounded cursor-pointer duration-200 active:scale-105">

                <Minus />
              </button>
              <span className="px-2 text-xl font-semibold border border-slate-100">
                {product.quantity}
              </span>
              <button
                onClick={() => handleIncrement(id)}
                className="bg-blue-600 text-white p-2 rounded cursor-pointer duration-200 active:scale-105">
                <Plus />
              </button>
            </div>
            <div>
              <button onClick={()=>handleRemove(id)} className="bg-red-600 text-white p-2  cursor-pointer duration-200 active:scale-105 px-4 py-2 rounded font-medium flex items-center gap-1">
                <Trash2 />
                Remove Item
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default CartProductCard;