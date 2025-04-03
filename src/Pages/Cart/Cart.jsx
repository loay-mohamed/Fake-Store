import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductToCart } from "../../redux/Slices/CartSlice";
import { removeProductFromCart , clearProductFromCart} from "../../redux/Slices/CartSlice";
import Loading from "../../Components/Loading/Loading";

export default function Cart() {
  const dispatch = useDispatch();
  const { cartInfo, loading } = useSelector((state) => state.cart);
  const handleRemove = (productId) => {
    dispatch(removeProductFromCart({ productId }));
};
  const handleClear = (productId) => {
    dispatch(clearProductFromCart({ productId }));
};
  useEffect(() => {
    dispatch(getProductToCart());
  }, [dispatch]); 

  const safeCartInfo = cartInfo && cartInfo.data ? cartInfo : { data: { products: [] }, numOfCartItems: 0 };

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="flex space-x-6 items-center mb-6">
        <i className="font-semibold text-4xl fa-brands fa-opencart text-black"></i>
        <h2 className="text-2xl font-semibold text-black">Your Shopping Cart</h2>
      </div>

      {loading ? (
        <Loading/>
      ) : safeCartInfo.numOfCartItems === 0 ? (
        <div className="mt-6 bg-gray-100 p-5 rounded-md shadow flex justify-center items-center flex-col gap-3">
          <h2>Oops! Your cart is empty. Start shopping now by clicking the button below!</h2>
          <Link to="/" className="btn bg-black hover:bg-gray-800 text-white px-4 py-2 rounded">
            Back to Home
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {safeCartInfo.data.products.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow-lg">
                <img  src={item.product?.imageCover || "https://via.placeholder.com/150"}  alt={item.product?.title || "No Title"} className="w-full h-64 object-contain rounded-md" />
                <h3 className="text-lg font-semibold mt-2 line-clamp-1">{item.product?.title || "Unknown Product"}</h3>
                <p className="text-gray-600 text-xl">Price: {item.price} L.E</p>
                <p className="text-gray-500">Quantity: {item.count}</p>
                <button className="mt-3 w-full  bg-black hover:bg-gray-500 text-white py-2 rounded-lg " onClick={()=>{
                  handleRemove(item.product._id)
                }}>
                  <i className="fa-solid fa-trash mr-2"></i> Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-between items-center bg-white p-4 rounded-md shadow-md">
            <p className="text-xl font-semibold">
              <i className="text-teal-800 fa-solid fa-cart-shopping mr-3"></i>
              Total Items: <span className="text-black text-2xl">{safeCartInfo.numOfCartItems}</span>
            </p>
            <p className="text-xl font-semibold">
              <i className="text-teal-800 fa-solid fa-dollar-sign mr-3"></i>
              Total Price: <span className="text-black text-2xl">{safeCartInfo.data.totalCartPrice} L.E</span>
            </p>
          </div>

          <div className="mt-5 flex justify-between">
            <button className="btn bg-black hover:bg-gray-500 text-white px-4 py-2 rounded" onClick={()=>{handleClear()}}>
              <i className="fa-solid fa-trash mr-2"></i> Clear Cart
            </button>
            <Link to="/checkout" className="btn bg-teal-800 hover:bg-teal-700 text-white px-4 py-2 rounded">
              Next Step (Payment)
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
