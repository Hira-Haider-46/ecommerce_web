import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const SearchBar : React.FC = () => {

    const context = useContext(ShopContext);
    if(!context) {
        throw new Error("SearchBar must be used within a ShopContextProvider");
    }
    const {search, setSearch, showSearch, setShowSearch} = context;
    const location = useLocation();
    const [visisble, setVisible] = useState<boolean>(false);

    useEffect(() => {
        if(location.pathname.includes('collection')) {
            setVisible(true);
        }
        else {
            setVisible(false);
        }
    }, [location]);

  return (showSearch && visisble) ? (
    <div className="bg-gray-50 text-center">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
            <input type="text" placeholder="Search" className="flex-1 outline-none bg-inherit text-sm" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <img src={assets.search_icon} alt="search icon" className="w-4 cursor-pointer"/>
        </div>
        <img src={assets.cross_icon} alt="cross icon" className="inline w-3 cursor-pointer" onClick={() => setShowSearch(false)}/>
    </div>
  ) : null;
}

export default SearchBar;