import { ToastContainer, toast } from "react-toastify";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const CustomerLayout: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="w-full md:w-[95%] mx-auto px-5">
        <SearchBar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default CustomerLayout;