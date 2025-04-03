import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import axios from "axios";
import{ addProductToCart  }from'../../redux/Slices/CartSlice'
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function ProductDetails() {
    const dispatch = useDispatch();

  const [ProductDetails, setProductDetails] = useState(null);
  let { id } = useParams();
  const handleAddToCart = () => {
      dispatch(addProductToCart({ productId: id  }));
      toast.success("Product Added To Cart")
    };

  async function getSpecificProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      setProductDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSpecificProducts();
  }, []);

  return (
    <>
  {ProductDetails ? (
    <section className="container mx-auto px-6 py-10 bg-slate-200 mt-9">
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-black p-6 rounded-lg shadow-lg">
        {/* 🖼 معرض الصور */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
          <ImageGallery
            items={ProductDetails.images.map((image) => ({
              original: image,
              thumbnail: image,
            }))}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={false}
          />
        </div>

        {/* 📜 تفاصيل المنتج */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-3 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-white">{ProductDetails.title}</h2>
            <h3 className="text-gray-400 font-semibold">{ProductDetails.category.name}</h3>
          </div>
          <p className="text-gray-300">{ProductDetails.description}</p>
          <div className="flex justify-between items-center text-white">
            <span className="text-xl font-bold">${ProductDetails.price}</span>
            <div>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <span className="ml-2">{ProductDetails.ratingsAverage}</span>
            </div>
          </div>
          <div>
            <img src={ProductDetails.brand.image} className="w-36" alt="brand" />
          </div>
          <button
            onClick={()=>{
                handleAddToCart()
            }}
            className="w-full h-12 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </section>
  ) : (
    <Loading />
  )}
</>
    
  );
}
