import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductContextProvider from './components/context/ProductContextProvider.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <ProductContextProvider>
    <Toaster containerStyle={{
      top:50
    }}/>
    <App />
  </ProductContextProvider>,
)
