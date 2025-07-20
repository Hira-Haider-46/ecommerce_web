import { useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.ts";
import { ShopContext } from "../context/ShopContext.tsx";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const context = useContext(ShopContext);
  if(!context) {
    throw new Error("Navbar must be used within a ShopContextProvider");
  }
  const { setShowSearch, getCartCount } = context;
  const location = useLocation();
  const navigate = useNavigate();

  const showSearchBar = () => {
    setShowSearch(true);
    if (!(location.pathname.includes("collection"))) navigate("/collection");
  }

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/collection", label: "Collection" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="flex items-center justify-between px-4 md:px-15 py-4 bg-white relative">
      <NavLink to='/'><img src={assets.logo} alt="logo" className="h-10 z-10" /></NavLink>
      <ul
        className={`flex flex-col text-center md:flex-row space-y-4 md:space-y-0 md:space-x-6 absolute md:static top-[100%] left-0 w-full md:w-auto bg-white px-6 md:px-0 py-4 md:py-0 transition-all duration-300 ${
          menuOpen ? "block" : "hidden md:flex"
        }`}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `w-1/3 md:w-full mx-auto md:mx-4 relative group text-gray-700 font-medium transition duration-300 ${
                isActive ? "text-black" : "hover:text-black"
              }`
            }
          >
            {({ isActive }) => (
              <p className="text-base md:text-lg">
                {item.label}
                <span
                  className={`absolute left-[26%] md:left-0 -bottom-1 h-0.5 bg-black transition-all duration-300 ${
                    isActive ? "w-1/2 md:w-full" : "w-0 group-hover:w-1/2 md:group-hover:w-full"
                  }`}
                ></span>
              </p>
            )}
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <img src={assets.search_icon} alt="search_icon" className="w-5 cursor-pointer" onClick={showSearchBar}/>
        <div className="group relative">
          <Link to='/login'><img src={assets.profile_icon} alt="profile_icon" className="w-5 cursor-pointer"/></Link>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <Link to=''><p className="cursor-pointer hover:text-black">My Profile</p></Link>
              <Link to='/orders'><p className="cursor-pointer hover:text-black">Orders</p></Link>
              <Link to='/login'><p className="cursor-pointer hover:text-black">Logout</p></Link>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart_icon" className="w-5"/>
          <p className="absolute right-[-5px] bottom-[-5px] leading-4 text-center w-4 bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
        </Link>
      </div>
      <button
        className="md:hidden z-10"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <img src={assets.menu_icon} alt="menu_icon" className="w-6 cursor-pointer"/>
      </button>
    </nav>
  );
};

export default Navbar