import React from 'react';
import { useDispatch } from 'react-redux';
import{ addProductToCart , addProductToWishlist }from'../../redux/Slices/CartSlice'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ProductCard({ productInfo, token }) {
  const dispatch = useDispatch();
  const { images, title, price, id } = productInfo;
  const handleAddToCart = () => {
    dispatch(addProductToCart({ productId: id }));
  };
  const handleAddToWishlist = () => {
    dispatch(addProductToWishlist({ productId: id }));
  };
  return (
    <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 shadow-lg rounded-md overflow-hidden'>
      
      <div className="bg-slate-200 p-4 rounded-lg shadow-lg w-64 relative " >
      <Link to={`/product/${id}`}>
        

        <img
          src={images[0]}
          alt="Product"
          className="w-56 h-56 object-cover mx-auto my-auto rounded-lg pr-4"
        />
        
        </Link>
        <h2 className="text-black font-bold text-lg mt-2 line-clamp-1">{title}</h2>
        <p className="text-neutral-950 text-xl">{price} L:E</p>
        <div className='flex justify-center items-center gap-6'>
        <FontAwesomeIcon icon={faHeart} className="text-black text-3xl cursor-pointer mt-3 hover:text-gray-800" onClick={handleAddToWishlist} />
        <button
          onClick={handleAddToCart}
          className="mt-3 w-36 bg-black text-white py-2 rounded-lg hover:bg-gray-800 "
        >
          Add to Cart
        </button>
        
        </div>
      </div>
    </div>
  );
}
