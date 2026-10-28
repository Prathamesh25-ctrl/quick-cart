import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import WishListPage from './pages/WishListPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import PageNotFound from './pages/PageNotFound'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import SingleProductPage from './pages/SingleProductPage'
import Checkoutpage from './pages/Checkoutpage'
function App() {
  return (
    <BrowserRouter>
    {/* Navbar Components are started */}
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/product' element={<ProductPage/>}/>
      <Route path='/product/:id' element={<SingleProductPage/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path="/checkout" element={<Checkoutpage />} />
      <Route path='/wishlist' element={<WishListPage/>}/>
      <Route path='/contact' element={<ContactPage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    {/* Footer Components are started */}
    <Footer/>
    </BrowserRouter>
  )
}

export default App