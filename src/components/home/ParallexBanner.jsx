import React from 'react'
import { Link } from 'react-router-dom'
import { Headset, LockKeyhole, RefreshCcw, TruckElectric } from 'lucide-react' 

function ParallexBanner() {
    const businessFeaturesList = [
        { icon: <TruckElectric size={32} />, title: "Free Shipping", description: "On orders over $100" },
        { icon: <LockKeyhole size={32} />, title: "Secure Payment", description: "100% protected payments" },
        { icon: <RefreshCcw size={32} />, title: "Easy Returns", description: "30-day return policy" },
        { icon: <Headset size={32} />, title: "24/7 Support", description: "Dedicated customer service" },
    ];

    return (
        <div className='mt-6 md:mt-10 w-full px-4 md:px-6 overflow-hidden'>
            
            {/* Parallax Banner Container */}
            {/* बदल: एरर घालवण्यासाठी व्हेरिएबल ऐवजी थेट सार्वजनिक पाथ '/image.png' किंवा तुमच्या प्रोजेक्टमधील पाथ वापरा */}
            <div className='w-full max-w-7xl mx-auto min-h-[300px] md:h-[450px] !bg-no-repeat !bg-cover !bg-center flex justify-center items-center flex-col text-center p-6 md:p-12 rounded-3xl text-white shadow-md'
                style={{
                    background: `linear-gradient(rgba(0,0,0,0.6), rgba(11,11,11, 0.4)), url('/image.png')`,
                    backgroundAttachment: 'scroll' 
                }}>

                <h2 className='text-2xl sm:text-3xl md:text-5xl font-bold max-w-3xl leading-tight mb-3'>
                    Next-Genration Products at Your Fingertips
                </h2>
                <p className='text-sm sm:text-base md:text-xl text-gray-200 max-w-xl mb-6'>
                    Discover the latest tech innovations with unbeatable prices and free shipping on all orders
                </p>
                <Link to="/product" className='text-black bg-blue-500 hover:bg-white transition duration-300 px-6 py-3 rounded-full font-bold shadow-md transform hover:scale-105 inline-block' >
                    Shop Now
                </Link>
            </div>

            {/* Why Choose Us Grid */}
            <div className="my-8 w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {
                    businessFeaturesList.map((cardFeatures, index) => {
                        const { title, description, icon } = cardFeatures
                        return (
                            <div key={index} className="rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-4 bg-slate-50 w-full">
                                <div className="text-blue-600 shrink-0">
                                    {icon}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-800 text-sm md:text-base"> {title} </h4>
                                    <p className="text-[13px] text-slate-600 leading-tight mt-0.5">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

        </div>
    )
}

export default ParallexBanner;
