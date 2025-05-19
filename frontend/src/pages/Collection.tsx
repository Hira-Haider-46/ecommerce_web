import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

interface Product { _id: string; name: string; image: string[]; price: number; bestseller: boolean; }

const Collection : React.FC = () => {
  const context = useContext(ShopContext);
  if (!context) { throw new Error("Collection must be used within a ShopProvider"); }

  const {products, search, showSearch} = context;
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [sortType, setSortType] = useState<string>('relevant');

  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (category.includes(target.value)) setCategory(prev => prev.filter(item => item !== target.value));
    else setCategory(prev => [...prev, target.value]);
  }

  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (subCategory.includes(target.value)) setSubCategory(prev => prev.filter(item => item !== target.value));
    else setSubCategory(prev => [...prev, target.value]);
  }

  const applyFilter = () => {
    let productsCopy = products.slice();
    if(showSearch && search) productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    if(category.length > 0) productsCopy = productsCopy.filter(item => category.includes(item.category));
    if(subCategory.length > 0) productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    setFilterProducts(productsCopy);
  }

  const sortProducts = () => {
    let filterProductCopy = filterProducts.slice();
    if (sortType === 'low-high') setFilterProducts(filterProductCopy.sort((a,b) => a.price - b.price));
    else if (sortType === 'high-low') setFilterProducts(filterProductCopy.sort((a,b) => b.price - a.price));
    else applyFilter();
  }

  useEffect(() => { applyFilter(); }, [category, subCategory, search, showSearch]);

  useEffect(() => { sortProducts(); }, [sortType]);

  return (
    <div className={`flex flex-col md:flex-row gap-1 md:gap-10 pt-10 ${!showSearch && `border-t`} border-gray-400`}>
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2" onClick={() => setShowFilter(!showFilter)}>FILTERS
          <img src={assets.dropdown_icon} alt="dropdown icon" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2"><input type="checkbox" className="w-3 cursor-pointer" value='Men' onChange={toggleCategory}/> Men</p>
            <p className="flex gap-2"><input type="checkbox" className="w-3 cursor-pointer" value='Women' onChange={toggleCategory}/> Women</p>
            <p className="flex gap-2"><input type="checkbox" className="w-3 cursor-pointer" value='Kids' onChange={toggleCategory}/> Kids</p>
          </div>
        </div>
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2"><input type="checkbox" className="w-3 cursor-pointer" value='Topwear' onChange={toggleSubCategory}/> Topwear</p>
            <p className="flex gap-2"><input type="checkbox" className="w-3 cursor-pointer" value='Bottomwear' onChange={toggleSubCategory}/> Bottomwear</p>
            <p className="flex gap-2"><input type="checkbox" className="w-3 cursor-pointer" value='Winterwear' onChange={toggleSubCategory}/> Winterwear</p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-6">
          <Title text1="ALL" text2="COLLECTIONS"/>
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2 cursor-pointer outline-none bg-white">
            <option value="relavent">Sort By: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className={`${filterProducts.length > 0 ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6' : ''}`}>
          {filterProducts.length > 0 ? filterProducts.map((item) => {
            return (
            <ProductItem key={item._id} id={item._id} name={item.name} price={item.price} image={item.image}/>
          );
          }) : <p className="text-gray-600 mt-20 text-lg text-center mx-auto">No Products to show</p>}
        </div>
      </div>
    </div>
  )
}

export default Collection;