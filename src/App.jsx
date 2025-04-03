import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Layout from "./Components/Layout/Layout";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Wishlist from "./Pages/Wishlist/Wishlist";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import "react-image-gallery/styles/css/image-gallery.css";
import Checkout from "./Components/Checkout/Checkout";
import Order from "./Components/Order/Order";

export default function App() {
  const { token } = useSelector((state) => state.user);
  useEffect(() => {
    console.log("Current Token:", token);
  }, [token]);
  

  const route=createBrowserRouter([
    {
      path: "/",
      element: (
          <Layout/>
      ),
      children: [
        { index: true, element: <Home /> } ,
        {path:"/cart",element:<Cart/>},
        {path:"/wishlist",element:<Wishlist/>},
        {path:"/login",element:<Login/>},
        {path:"/signup",element:<SignUp/>},
        {path:"/checkout",element:<Checkout/>},
        {path:"/product/:id",element:<ProductDetails/>},
        {path:"allorders",element:<Order/>},


      ],
    }
  ])
  return (
    <>
    <RouterProvider router={route}/>
    <Toaster/>
    </>
  );
}

