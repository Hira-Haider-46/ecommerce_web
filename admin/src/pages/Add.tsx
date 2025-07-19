import { useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

interface Product {
  name: string;
  description: string;
  category: string;
  subCategory: string;
  price: number;
  sizes: string[];
  bestseller: boolean;
  image1: File | null;
  image2: File | null;
  image3: File | null;
  image4: File | null;
}

const defaultProduct: Product = {
  name: "",
  description: "",
  category: "Men",
  subCategory: "Topwear",
  price: 0,
  sizes: [],
  bestseller: false,
  image1: null,
  image2: null,
  image3: null,
  image4: null,
};

export default function Add({ token }: { token: string }) {

  const [product, setProduct] = useState<Product>(defaultProduct);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("subCategory", product.subCategory);
      formData.append("price", String(product.price));
      formData.append("sizes", JSON.stringify(product.sizes));
      formData.append("bestseller", String(product.bestseller));

      if (product.image1) formData.append("image1", product.image1);
      if (product.image2) formData.append("image2", product.image2);
      if (product.image3) formData.append("image3", product.image3);
      if (product.image4) formData.append("image4", product.image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "token": token,
        },
      });

      if(response.data.success) {
        toast.success(response.data.message);
        setProduct(defaultProduct);
      } else {
        toast.error(response.data.message || "Failed to add product");
      }

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full items-start gap-3 pr-6">

      <div>

        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">

          <label htmlFor="image1">
            <img className="w-20 cursor-pointer" src={product.image1 ? URL.createObjectURL(product.image1) : assets.upload_area} alt="upload" />
            <input onChange={(e) => setProduct({ ...product, image1: e.target.files?.[0] || null })} type="file" id="image1" hidden/>
          </label>
          
          <label htmlFor="image2">
            <img className="w-20 cursor-pointer" src={product.image2 ? URL.createObjectURL(product.image2) : assets.upload_area} alt="upload" />
            <input onChange={(e) => setProduct({ ...product, image2: e.target.files?.[0] || null })} type="file" id="image2" hidden/>
          </label>

          <label htmlFor="image3">
            <img className="w-20 cursor-pointer" src={product.image3 ? URL.createObjectURL(product.image3) : assets.upload_area} alt="upload" />
            <input onChange={(e) => setProduct({ ...product, image3: e.target.files?.[0] || null })} type="file" id="image3" hidden/>
          </label>

          <label htmlFor="image4">
            <img className="w-20 cursor-pointer" src={product.image4 ? URL.createObjectURL(product.image4) : assets.upload_area} alt="upload" />
            <input onChange={(e) => setProduct({ ...product, image4: e.target.files?.[0] || null })} type="file" id="image4" hidden/>
          </label>

        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input onChange={(e) => setProduct({ ...product, name: e.target.value })} type="text" placeholder="Enter product name" value={product.name} required className="w-full max-w-[500px] px-3 py-2"/>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea onChange={(e) => setProduct({ ...product, description: e.target.value })} placeholder="Enter product description" value={product.description} required className="w-full max-w-[500px] px-3 py-2"/>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">

        <div>
          <p className="mb-2">Product category</p>
          <select className="w-full px-3 py-2" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub category</p>
          <select className="w-full px-3 py-2" value={product.subCategory} onChange={(e) => setProduct({ ...product, subCategory: e.target.value })}>
            <option value="Topwear">Top Wear</option>
            <option value="Bottomwear">Bottom Wear</option>
            <option value="Winterwear">Winter Wear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} className="w-full px-3 py-2 sm:w-[120px]" type="number" value={product.price}/>
        </div>

      </div>

      <div>

        <p className="mb-2">Product Sizes</p>

        <div className="flex gap-3">

          <div onClick={() => setProduct({ ...product, sizes: product.sizes.includes("S")
        ? product.sizes.filter((size) => size !== "S")
        : [...product.sizes, "S"] })} className="cursor-pointer">
            <p className={`px-3 py-1 cursor-pointer rounded-sm ${product.sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"}`}>S</p>
          </div>

          <div onClick={() => setProduct({ ...product, sizes: product.sizes.includes("M")
        ? product.sizes.filter((size) => size !== "M")
        : [...product.sizes, "M"] })} className="cursor-pointer">
            <p className={`px-3 py-1 cursor-pointer rounded-sm ${product.sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"}`}>M</p>
          </div>

          <div onClick={() => setProduct({ ...product, sizes: product.sizes.includes("L")
        ? product.sizes.filter((size) => size !== "L")
        : [...product.sizes, "L"] })} className="cursor-pointer">
            <p className={`px-3 py-1 cursor-pointer rounded-sm ${product.sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"}`}>L</p>
          </div>

          <div onClick={() => setProduct({ ...product, sizes: product.sizes.includes("XL")
        ? product.sizes.filter((size) => size !== "XL")
        : [...product.sizes, "XL"] })} className="cursor-pointer">
            <p className={`px-3 py-1 cursor-pointer rounded-sm ${product.sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"}`}>XL</p>
          </div>

          <div onClick={() => setProduct({ ...product, sizes: product.sizes.includes("XXL")
        ? product.sizes.filter((size) => size !== "XXL")
        : [...product.sizes, "XXL"] })} className="cursor-pointer">
            <p className={`px-3 py-1 cursor-pointer rounded-sm ${product.sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"}`}>XXL</p>
          </div>

        </div>

      </div>

      <div className="flex gap-2 mt-2">
        <input onChange={() => setProduct({ ...product, bestseller: !product.bestseller })} type="checkbox" id="bestseller" checked={product.bestseller} />
        <label className="cursor-pointer" htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white cursor-pointer rounded-lg">Add Product</button>

    </form>
  );
}