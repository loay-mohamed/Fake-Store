import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  let { id } = jwtDecode(token);

  async function getUserOrders() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      
      if (data && Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="space-y-6">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.id}
            className="p-6 border border-gray-300 rounded-lg shadow-md"
          >
            <header className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-gray-500 text-sm">Order ID</h2>
                <span className="text-lg font-semibold text-gray-700">
                  #{order.id}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span
                  className={`px-3 py-1 font-semibold text-white rounded-full ${
                    order.isPaid ? "bg-lime-500" : "bg-red-500"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>
                <span
                  className={`px-3 py-1 font-semibold text-white rounded-full ${
                    order.isDelivered ? "bg-lime-500" : "bg-blue-500"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "In Transit"}
                </span>
              </div>
            </header>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {order.cartItems?.map((product) => (
                <div
                  key={product._id}
                  className="border border-gray-300 p-4 rounded-lg shadow-sm"
                >
                  <img
                    src={product.product?.imageCover}
                    alt={product.product?.title || "Product Image"}
                    className="w-full h-40 object-contain rounded"
                  />
                  <Link
                    to={`/product/${product.product?.id}`}
                    className="block text-teal-600 font-semibold mt-2 hover:underline"
                  >
                    {product.product?.title}
                  </Link>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-700">
                      <span className="font-bold">Quantity: </span>
                      {product.count}
                    </p>
                    <span className="text-teal-800 font-semibold text-lg">
                      {product.price} L.E
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </section>
  );
}
