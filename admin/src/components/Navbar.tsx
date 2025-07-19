import { assets } from "../assets/assets";

export default function Navbar({setToken}: { setToken: (token: string) => void }) {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="cursor-pointer w-[max(10%,80px)]" src={assets.logo} alt="logo" />
      <button onClick={() => setToken("")} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer">Logout</button>
    </div>
  );
}