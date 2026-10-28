import { ShoppingCartPlus, Star } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ProductContext from "../components/context/ProductContext";

function SingleProductPage() {

    const { id: productId } = useParams();

    const [productDetails, setProductDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { cartProducts, SetCartProducts } = useContext(ProductContext);

    const handleGetSingleProduct = async () => {
        try {
            setIsLoading(true);

            const response = await fetch(
                `https://fakestoreapi.com/products/${productId}`,
            );
            let data = await response.json();

            // !Adding quantity field to handle increment and decrement to the product from cart page
            data = { ...data, quantity: 1 }

            console.log("data", data);
            setProductDetails(data);
            setIsLoading(false);
        } catch (error) {
            console.log("erorr", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    //! handle add to cart products funcatnallity
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

    useEffect(() => {
        handleGetSingleProduct();
    }, [productId]); // Added productId dependency to re-fetch if dynamic route changes

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <h1 className="text-xl font-semibold animate-pulse">Loading product details...</h1>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex justify-center items-center h-96 px-4 text-center">
                <h1 className="text-xl font-semibold text-red-600">Error: {error}</h1>
            </div>
        );
    }

    // Safety fallback check
    if (!productDetails) return null;

    const { id, image, title, description, category, price, rating } = productDetails;
    const { rate, count } = rating || { rate: 0, count: 0 };

    return (
        <div className="py-8 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 w-full overflow-hidden">
            {/* बदल: मोबाईल आणि टॅबलेटवर सिंगल कॉलम (grid-cols-1) आणि मोठ्या स्क्रीनवर (md:grid-cols-2) केला */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                
                {/* Left side: Product Image Container */}
                <div className="flex justify-center items-center bg-slate-50 p-6 rounded-2xl border border-slate-100 w-full">
                    <img
                        className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] h-auto max-h-[300px] md:max-h-[450px] object-contain transition-transform hover:scale-102 duration-300"
                        src={`${image}`}
                        alt={`${title} image`}
                    />
                </div>
                
                {/* Right side: Product Information */}
                <div className="space-y-4 md:space-y-6">
                    <div className="space-y-2 md:space-y-3">
                        {/* product category */}
                        <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider block w-fit">
                            {category}
                        </span>
                        
                        {/* Title - responsive sizing */}
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">
                            {title}
                        </h2>
                        
                        {/* Rating Display */}
                        <div className="flex items-center gap-2 pt-1">
                            <div className="flex gap-0.5">
                                {Array(Math.round(rate || 0))
                                    .fill(0)
                                    .map((_, i) => (
                                        <Star key={i} size={18} color="#eab308" fill="#eab308" strokeWidth={1.5} />
                                    ))
                                }
                            </div>
                            <span className="text-sm text-gray-500 font-medium">
                                {rate} ({count} reviews)
                            </span>
                        </div>

                        <div className="border-b border-slate-100 my-4" />

                        {/* Description */}
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                            {description}
                        </p>
                        
                        {/* Price block */}
                        <div className="pt-2">
                            <span className="text-gray-500 font-medium text-sm block md:inline md:mr-2">
                                Price:
                            </span>
                            <span className="font-bold text-2xl md:text-3xl text-blue-600">
                                ₹{price}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4">
                        <button 
                            onClick={() => handleAddToCart(productDetails)} 
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl flex gap-2 items-center justify-center cursor-pointer transition shadow-md hover:shadow-lg active:scale-98 duration-150"
                        >
                            <ShoppingCartPlus size={20} />
                            Add to Cart
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SingleProductPage;
