import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { getProductToCart } from '../../redux/Slices/CartSlice';
import backgroundImage from "../../assets/Cart.png";

export default function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState(null);

    const { cartInfo } = useSelector((state) => state.cart);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!cartInfo) {
            dispatch(getProductToCart());
        }
    }, [cartInfo, dispatch]);

    async function createOrder(values, method) {
        let toastId = toast.loading("Processing your order...");
        try {
            const url = method === "cash"
                ? `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo?.cartId}`
                : `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo?.cartId}?url=${location.origin}`;
            
            const options = {
                url,
                method: "POST",
                headers: { token },
                data: values,
            };

            let { data } = await axios.request(options);

            if (data.status === "success") {
                toast.success("Order created successfully!");
                setTimeout(() => {
                    method === "cash" ? navigate("/allorders") : (location.href = data.session.url);
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        } finally {
            toast.dismiss(toastId);
        }
    }

    const formik = useFormik({
        initialValues: {
            shippingAddress: {
                details: "",
                phone: "",
                city: "",
            },
        },
        onSubmit: (values) => createOrder(values, paymentMethod),
    });

    return (
        <div className='flex justify-center items-center min-h-screen' 
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100vw",
                height: "120vh"
            }}
        >
            <div className='bg-white p-8 w-1/2 rounded-3xl shadow-lg' 
                style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            >
                <h2 className='text-black text-3xl font-bold p-5 text-center'>Checkout</h2>
                <form className='flex flex-col gap-6' onSubmit={formik.handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder='City'
                            className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            value={formik.values.shippingAddress.city}
                            onChange={formik.handleChange}
                            name='shippingAddress.city'
                        />
                    </div>
                    <div>
                        <input
                            type="tel"
                            placeholder='Phone'
                            className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            value={formik.values.shippingAddress.phone}
                            onChange={formik.handleChange}
                            name='shippingAddress.phone'
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder='Details'
                            className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            value={formik.values.shippingAddress.details}
                            onChange={formik.handleChange}
                            name='shippingAddress.details'
                        ></textarea>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setPaymentMethod("cash")} 
                            type='submit' 
                            className="btn bg-black hover:bg-gray-900 text-white w-full p-3 rounded-md"
                        >
                            Cash Order
                        </button>
                        <button 
                            onClick={() => setPaymentMethod("online")} 
                            type='submit' 
                            className="btn bg-green-600 hover:bg-green-700 text-white w-full p-3 rounded-md"
                        >
                            Online Payment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
