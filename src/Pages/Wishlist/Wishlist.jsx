import React, { useEffect, useState } from 'react';
import { getProductToWishlist, removeProductFromWishlist } from '../../redux/Slices/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

export default function Wishlist() {
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    dispatch(getProductToWishlist()).then((response) => {
      if (response.payload?.data) {
        setWishlist(response.payload.data);
      }
    });
  }, [dispatch]);

  const handleRemove = async (productId) => {
    try {
      await dispatch(removeProductFromWishlist({ productId })).unwrap();
      setWishlist((prev) => prev.filter((product) => product._id !== productId)); // تحديث القائمة مباشرة
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-md">
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-64 object-contain rounded"
              />
              <h3 className="text-lg font-semibold mt-2 line-clamp-1">{product.title}</h3>
              <p className="text-gray-600">Price: ${product.price}</p>
              <button
                className="mt-3 w-full bg-black hover:bg-gray-500 text-white py-2 rounded-lg"
                onClick={() => handleRemove(product._id)}
              >
                <i className="fa-solid fa-trash mr-2"></i> Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-2xl">Your wishlist is empty.</p>
      )}
    </div>
  );
}
