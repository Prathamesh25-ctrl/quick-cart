import CartProductCard from '../components/cart/CartProductCard';
import ProductContext from '../components/context/ProductContext';
import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Checkoutpage from '../pages/Checkoutpage';

function CartPage() {
  const { cartProducts } = useContext(ProductContext);
  console.log("cart list", cartProducts)
  const [showCheckout, setShowCheckout] = useState(false);

  let totalCartProductsQuantity = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    const quantity = cartProducts[i].quantity;
    totalCartProductsQuantity += quantity
  }

  let totalCartProductAmount = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    const totalPrice = cartProducts[i].quantity * cartProducts[i].price;
    totalCartProductAmount += totalPrice;
  }

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
  
    <div className='grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 max-w-7xl mx-auto px-4 w-full'>

      {/* left part start here for cart product rendering */}
      <div className="overflow-y-auto my-4 lg:my-7 scrollbar-thin order-1">
        {cartProducts.length <= 0 ? (
          <div className="w-fit mx-auto py-8 text-center">
            <h1 className="text-2xl font-semibold mb-4">Your Cart is Empty</h1>
            <Link
              className="bg-red-600 w-fit mx-auto text-white cursor-pointer duration-200 active:scale-105 px-6 py-2.5 rounded font-medium flex items-center gap-1"
              to={"/product"}
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cartProducts.map((product, index) => {
              return <CartProductCard key={product.id} product={product} />;
            })}
          </div>
        )}
      </div>
      {/* left part ender here for cart product rendering */}

      {/* Bill Summary Section */}
      <div className="my-4 lg:my-8 px-4 py-6 text-[16px] md:text-[18px] space-y-3 bg-slate-50 rounded-xl h-fit border border-slate-100 order-2">
        <div className="flex justify-between items-center ">
          <span>Total Product</span>
          <span className="font-medium"> {cartProducts.length} </span>
        </div>
        <div className="flex justify-between items-center ">
          <span>Total Product quantity</span>
          <span className="font-medium"> {totalCartProductsQuantity} </span>
        </div>
        <div className="flex justify-between items-center ">
          <span>Delivery Charges</span>
          <span className="font-medium line-through text-gray-400">₹50</span>
        </div>
        <div className="border-b border-slate-200 my-2" />
        <div className="flex justify-between items-center ">
          <span className="font-semibold text-xl">Total Amount</span>
          <span className="font-bold text-xl text-blue-600">₹ {(totalCartProductAmount).toFixed(2)} </span>
        </div>
        <div>
          <button
            onClick={() => setShowCheckout((prev) => !prev)}
            disabled={cartProducts.length === 0}
            className="w-full mt-6 px-4 py-3 rounded-lg
             bg-green-600 hover:bg-green-700
             disabled:bg-gray-400 text-white
             font-semibold transition active:scale-98"
          >
            {showCheckout ? "Hide Checkout ↑" : "Proceed to Checkout ↓"}
          </button>
        </div>
      </div>
      
      {/* Checkout Section Container */}
      <div
        className={`col-span-1 lg:col-span-2 overflow-hidden transition-all
    duration-500 ease-in-out order-3 ${showCheckout
            ? "max-h-[3000px] opacity-100 mt-4"
            : "max-h-0 opacity-0"
          }`}
      >
        <Checkoutpage />
      </div>
    </div>
  )
}

export default CartPage;
