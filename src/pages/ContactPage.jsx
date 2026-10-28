import React, { useState } from "react";
import toast from "react-hot-toast";

function ContactPage() {
  const formDataInitializer = {
    name: "",
    email: "",
    message: "",
  };
  const [formData, setFormData] = useState(formDataInitializer);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("message", formData.message);
    form.append("access_key", import.meta.env.VITE_FORM_SECRET_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: form,
    });

    const data = await response.json();
    if (data.success) {
      toast.success("form submitted successfully");
      setFormData(formDataInitializer);
    } else {
      toast.error("failed to submit");
    }
  };

  return (
    
    <div className="mx-4 my-6 md:mx-auto md:my-12 max-w-5xl rounded-2xl md:rounded-3xl border border-gray-100 bg-white p-5 sm:p-8 md:p-12 shadow-xl shadow-gray-200/50">
      
      {/* Header Section */}
      <div className="mb-8 md:mb-10 text-center space-y-2">
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          Get in Touch with <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">QuickCart</span>
        </h1>
        <p className="mx-auto max-w-md text-xs sm:text-sm text-gray-500">
          Have a question or need support? Fill out the form or reach out directly.
        </p>
      </div>


      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        
        {/* Left Side: Contact Info Panel */}
        <div className="flex flex-col justify-between rounded-xl md:rounded-2xl bg-gray-50/50 p-5 sm:p-6 border border-gray-100 md:p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-800">Contact Information</h2>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 leading-relaxed">
                We're here to help you with your electronics journey. Reach out anytime.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col border-b border-gray-100 pb-3">
                <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Address</span>
                <span className="text-xs sm:text-sm font-medium text-gray-700 mt-0.5">quickcart Web Lane, Laptop Location, Near by Me, India</span>
              </div>
              
              <div className="flex flex-col border-b border-gray-100 pb-3">
                <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</span>
                <a href="mailto:support@Jhepto.com" className="text-xs sm:text-sm font-medium text-blue-600 hover:underline mt-0.5break-all">QuickCart@Qquickcart.com</a>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone</span>
                <a href="tel:+919876543210" className="text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600 transition mt-0.5">+91 1234567890</a>
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-8 text-[11px] sm:text-xs font-medium text-gray-400">
            Our team responds within 24 business hours.
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full">
          <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-5">
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-gray-700" htmlFor="name">
                Your Name
              </label>
              <input
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:shadow-md focus:shadow-blue-500/5"
                type="text"
                placeholder="Enter Your Name"
                name="name"
                onChange={handleInputChange}
                value={formData.name}
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-gray-700" htmlFor="email">
                Your Email
              </label>
              <input
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:shadow-md focus:shadow-blue-500/5"
                type="email"
                placeholder="Enter Your Email"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-gray-700" htmlFor="message">
                Your Message
              </label>
              <textarea
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:shadow-md focus:shadow-blue-500/5 min-h-[100px] max-h-32 resize-none"
                name="message"
                placeholder="Type your message here..."
                rows={4}
                onChange={handleInputChange}
                value={formData.message}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-blue-800 active:scale-[0.99] transition-all cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default ContactPage;
