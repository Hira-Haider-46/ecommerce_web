import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

export default function Sidebar() {
  return (
    <div className="w-[18%] min-h-screen border-r border-gray-300">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[12px] lg:text-[15px]">
        <NavLink to="" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg">
            <img className="w-5 h-5" src={assets.add_icon} alt="add" />
            <p className="hidden md:block text-gray-600">Add Items</p>
        </NavLink>
        <NavLink to="list" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg">
            <img className="w-5 h-5" src={assets.order_icon} alt="list" />
            <p className="hidden md:block text-gray-600">List Items</p>
        </NavLink>
        <NavLink to="orders" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg">
            <img className="w-5 h-5" src={assets.order_icon} alt="orders" />
            <p className="hidden md:block text-gray-600">Orders</p>
        </NavLink>
      </div>
    </div>
  )
}