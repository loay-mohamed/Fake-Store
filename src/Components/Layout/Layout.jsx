import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token && location.pathname !== "/signup" && location.pathname !== "/login") {
      navigate("/signup");
    }
  }, [token, navigate, location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow mb-10">
        <Outlet />
      </div>

      <Footer className="mt-auto" />
    </div>
  );
}
