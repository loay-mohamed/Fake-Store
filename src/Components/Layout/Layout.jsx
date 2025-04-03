import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar />

      <div className="flex-grow mb-10">
        <Outlet />
      </div>

      <Footer className="mt-auto " />
    </div>
  );
}
