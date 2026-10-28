import React, { useContext, useState } from "react";
import { CheckCircle, CreditCard, MapPin, Package } from "lucide-react";
import ProductContext from "../components/context/ProductContext";

function Checkoutpage() {
    const { cartProducts, SetCartProducts } = useContext(ProductContext);

    const [customer, setCustomer] = useState({
        name: "",
        mobile: "",
        address: "",
        city: "",
        pincode: "",

    });
    const formDataInitializer = {
        name: "",
        mobile: "",
        address: "",
        city: "",
        pincode: "",
        CVV: "",
        ExpiryDate: "",
        CardNumber: "",
    }
    const [formData, setFormData] = useState(formDataInitializer);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [confirmedTotal, setConfirmedTotal] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const totalQuantity = cartProducts.reduce(
        (total, product) => total + Number(product.quantity || 1),
        0
    );

    const totalAmount = cartProducts.reduce(
        (total, product) =>
            total + Number(product.price || 0) * Number(product.quantity || 1),
        0
    );

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomer((previous) => ({ ...previous, [name]: value }));
    };

    const handlePlaceOrder = (event) => {
        event.preventDefault();
        setErrorMessage("");

        if (cartProducts.length === 0) {
            setErrorMessage("Your cart is empty. Please add a product first.");
            return;
        }


        setConfirmedTotal(totalAmount);
        setOrderPlaced(true);
        SetCartProducts([]);
    };
    // from submit to mail 

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



    if (orderPlaced) {
        return (
            <section className="rounded-2xl bg-white p-6 text-center shadow-sm md:p-8">
                <CheckCircle size={60} className="mx-auto mb-4 text-green-600" />
                <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">
                    Order Placed Successfully!
                </h2>
                <p className="mt-3 text-slate-600">
                    Thank you, {customer.name}. Your demo order has been confirmed.
                </p>
                <p className="mt-4 text-lg font-semibold">
                    Total: ₹{confirmedTotal.toFixed(2)}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                    Payment method: Cash on Delivery
                </p>
            </section>
        );
    }

    if (cartProducts.length === 0) {
        return (
            <section className="rounded-2xl bg-white p-6 text-center shadow-sm md:p-8">
                <Package size={48} className="mx-auto text-slate-400" />
                <h2 className="mt-3 text-2xl font-bold text-slate-800">
                    Your Cart is Empty
                </h2>
                <p className="mt-2 text-slate-500">
                    Add products to your cart before checkout.
                </p>
            </section>
        );
    }

    return (
        <section className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 md:p-6">
            <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-white p-3 text-green-700">
                    <MapPin size={26} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Checkout</h2>
                    <p className="text-sm text-slate-500">
                        Enter your delivery details and review your order.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
                <form
                    onSubmit={handlePlaceOrder}
                    className="space-y-5 rounded-xl bg-white p-5 shadow-sm md:p-6"
                >
                    <h3 className="flex items-center gap-2 text-xl font-bold">
                        <MapPin size={22} />
                        Delivery Details
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="checkout-name" className="mb-2 block text-sm font-medium">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="checkout-name"
                                type="text"
                                name="name"
                                value={customer.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                autoComplete="name"
                                required
                                className="w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        <div>
                            <label htmlFor="checkout-mobile" className="mb-2 block text-sm font-medium">
                                Mobile Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="checkout-mobile"
                                type="tel"
                                name="mobile"
                                value={customer.mobile}
                                onChange={handleChange}
                                placeholder="10-digit mobile number"
                                pattern="[6-9][0-9]{9}"
                                maxLength={10}
                                autoComplete="tel"
                                required
                                className="w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="checkout-address" className="mb-2 block text-sm font-medium">
                            Delivery Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="checkout-address"
                            name="address"
                            value={customer.address}
                            onChange={handleChange}
                            placeholder="House no., street, area, landmark"
                            rows={3}
                            autoComplete="street-address"
                            required
                            className="w-full resize-y rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="checkout-city" className="mb-2 block text-sm font-medium">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="checkout-city"
                                type="text"
                                name="city"
                                value={customer.city}
                                onChange={handleChange}
                                placeholder="Enter your city"
                                autoComplete="address-level2"
                                required
                                className="w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-green-600"
                            />
                        </div>

                        <div>
                            <label htmlFor="checkout-pincode" className="mb-2 block text-sm font-medium">
                                Pincode <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="checkout-pincode"
                                type="text"
                                name="pincode"
                                value={customer.pincode}
                                onChange={handleChange}
                                placeholder="6-digit pincode"
                                pattern="[0-9]{6}"
                                maxLength={6}
                                autoComplete="postal-code"
                                required
                                className="w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-green-600"
                            />
                        </div>
                    </div>

                    <div className="border-t border-slate-200 pt-5">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                            <CreditCard size={22} />
                            Payment Method
                        </h3>

                        <label className={`mb-3 flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${paymentMethod === "COD" ? "border-green-300 bg-green-50" : "border-slate-200 hover:border-green-300"}`}>
                            <input
                                type="radio"
                                name="payment"
                                value="COD"
                                checked={paymentMethod === "COD"}
                                onChange={(event) => {
                                    setPaymentMethod(event.target.value);
                                    setErrorMessage("");
                                }}
                                className="h-4 w-4 accent-green-600"
                            />
                            <div>
                                <p className="font-semibold">Cash on Delivery (COD)</p>
                                <p className="text-sm text-slate-500">
                                    Pay when you receive your order.
                                </p>
                            </div>
                        </label>

                        <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${paymentMethod === "CARD" ? "border-green-300 bg-green-50" : "border-slate-200 hover:border-green-300"}`}>
                            <input
                                type="radio"
                                name="payment"
                                value="CARD"
                                checked={paymentMethod === "CARD"}
                                onChange={(event) => {
                                    setPaymentMethod(event.target.value);
                                    setErrorMessage("");
                                }}
                                className="h-4 w-4 accent-green-600"
                            />
                            <CreditCard size={24} className="text-green-700" />
                            <div>
                                <p className="font-semibold">Credit / Debit Card</p>
                                <p className="text-sm text-slate-500">
                                    Online payment gateway required.
                                </p>
                            </div>
                        </label>

                        {paymentMethod === "CARD" && (
                            <div>

                                {/* Payment Method */}
                                <div className="border-t border-slate-200 pt-5">
                                    {/* Card Details - Show only when CARD is selected */}
                                    {paymentMethod === "CARD" && (
                                        <div className="mt-4 p-4 bg-slate-50 border rounded-xl space-y-4">
                                            <h4 className="font-semibold">Card Details</h4>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Name on Card
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardName"
                                                    placeholder="Enter name on card"
                                                    autoComplete="cc-name"
                                                    required={paymentMethod === "CARD"}
                                                    className="w-full border rounded-lg px-3 py-3 outline-none focus:border-green-600"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Card Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    placeholder="1234 5678 9012 3456"
                                                    inputMode="numeric"
                                                    autoComplete="cc-number"
                                                    maxLength={19}
                                                    required={paymentMethod === "CARD"}
                                                    className="w-full border rounded-lg px-3 py-3 outline-none
                     focus:border-green-600"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">
                                                        Expiry Date
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="expiry"
                                                        placeholder="MM/YY"
                                                        autoComplete="cc-exp"
                                                        required={paymentMethod === "CARD"}
                                                        className="w-full border rounded-lg px-3 py-3 outline-none
                       focus:border-green-600"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium mb-2">
                                                        CVV
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="cvv"
                                                        placeholder="CVV"
                                                        inputMode="numeric"
                                                        autoComplete="cc-csc"
                                                        maxLength={4}
                                                        required={paymentMethod === "CARD"}
                                                        className="w-full border rounded-lg px-3 py-3 outline-none focus:border-green-600"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    )}
                                </div>

                            </div>
                        )}
                    </div>

                    {errorMessage && (
                        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-green-600 py-3.5 font-bold text-white transition hover:bg-green-700"
                    >
                        {paymentMethod === "COD"
                            ? `Place Order · ₹${totalAmount.toFixed(2)}`
                            : "Continue to Card Payment"}
                    </button>
                </form>

                <aside className="h-fit rounded-xl bg-white p-5 shadow-sm md:p-6">
                    <h3 className="mb-5 flex items-center gap-2 text-xl font-bold">
                        <Package size={23} />
                        Order Summary
                    </h3>

                    <div className="space-y-4">
                        {cartProducts.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center gap-3 border-b border-slate-100 pb-4"
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-16 w-16 rounded-lg bg-slate-50 p-1 object-contain"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="line-clamp-2 text-sm font-semibold">
                                        {product.title}
                                    </p>
                                    <p className="mt-1 font-semibold text-green-700">
                                        ₹{(Number(product.price || 0) * Number(product.quantity || 1)).toFixed(2)}
                                    </p>
                                </div>
                                <p className="whitespace-nowrap text-xs text-slate-500">
                                    Qty: {product.quantity || 1}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Total Products</span>
                            <span className="font-medium">{cartProducts.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Total Quantity</span>
                            <span className="font-medium">{totalQuantity}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Subtotal</span>
                            <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Delivery Charges</span>
                            <span className="font-medium text-green-600">Free</span>
                        </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-2 rounded-xl bg-emerald-50 p-4">
                        <span className="font-bold">Total Amount</span>
                        <span className="text-xl font-bold text-green-700">
                            ₹{totalAmount.toFixed(2)}
                        </span>
                    </div>
                </aside>
            </div>
        </section>
    );
}

export default Checkoutpage;
