import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X } from "lucide-react";
import ProductContext from '../context/ProductContext';

function Navbar() {
  const { cartProducts } = useContext(ProductContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-white text-black shadow-xl w-full sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-4 md:py-6'>
        
        {/* Logo & Mobile Menu Button */}
        <div className='flex justify-between items-center w-full md:w-auto'>
          <a href="/">
            <h1 className='font-bold text-2xl md:text-3xl flex text-black'>
            Quick <span className='text-blue-600'>Cart</span>
          </h1>
          </a>
          <button onClick={() => setIsOpen(!isOpen)} className='md:hidden block p-2 text-gray-700'>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex w-full md:max-w-xl lg:max-w-2xl items-center gap-2 rounded-full border border-gray-200 bg-white p-1 shadow-sm transition focus-within:border-blue-500 focus-within:shadow-md order-3 md:order-2">
          <input
            type="search"
            name="q"
            placeholder="Search products, brands and more..."
            aria-label="Search products"
            className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:text-base"
          />
          <button type="submit" className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition duration-300 hover:bg-blue-700 active:scale-95 whitespace-nowrap">
            Search
          </button>
        </div>

        {/* Navigation Links */}
        <ul className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center w-full md:w-auto gap-4 md:gap-6 font-medium text-sm md:text-base border-t md:border-none pt-4 md:pt-0 order-2 md:order-3`}>
          <li className='w-full md:w-auto text-center'><Link onClick={() => setIsOpen(false)} to="/" className='hover:text-blue-600 block py-1'>Home</Link></li>
          <li className='w-full md:w-auto text-center'><Link onClick={() => setIsOpen(false)} to="/product" className='hover:text-blue-600 block py-1'>Product</Link></li>
          <li className='w-full md:w-auto text-center'><Link onClick={() => setIsOpen(false)} to="/wishlist" className='hover:text-blue-600 block py-1'>WishList</Link></li>
          <li className='w-full md:w-auto text-center'><Link onClick={() => setIsOpen(false)} to="/contact" className='hover:text-blue-600 block py-1'>Contact</Link></li>
          <li className='w-full md:w-auto text-center'><Link onClick={() => setIsOpen(false)} to="/about" className='hover:text-blue-600 block py-1'>About</Link></li>
          
          {/* Cart Icon */}
          <li className='relative py-2 md:py-0'>
            <span className="w-5 h-5 text-xs text-white rounded-full flex justify-center items-center bg-blue-600 absolute -right-3 -top-1 md:-top-2" >
              {cartProducts ? cartProducts.length : 0}
            </span>
            <Link onClick={() => setIsOpen(false)} to="/cart" className='text-gray-800 hover:text-blue-600 block'>
              <ShoppingCart size={24} />
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  )
}

export default Navbar;
