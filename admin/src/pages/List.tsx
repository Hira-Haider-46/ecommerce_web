import axios from "axios";
import { useState, useEffect } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

export default function List({ token }: { token: string }) {
  const [list, setList] = useState<any[]>([]);

  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/product/list");
      if (res.data.success) {
        setList(res.data.products);
        console.log(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
    }
  };

  const removeProduct = async (id: string) => {
    try {
      const res = await axios.delete(backendUrl + "/api/product/remove", {data: {id}, headers:{token}});
      if(res.data.success) {
        toast.success(res.data.message);
        await fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="pr-6">
      <p className="mb-2">All Products List</p>
      <div>
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 rounded-t-md bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {list?.map((item) => {
          return (
            <div
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm"
              key={item._id}
            >
              <img
                className="w-12"
                src={
                  item.images && item.images.length > 0
                    ? item.images[0]
                    : "/placeholder-image.png"
                }
                alt="product img"
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency} {item.price}
              </p>
              <p className="block md:hidden"></p>
              <p onClick={() => removeProduct(item._id)} className="md:text-center cursor-pointer text-lg">
                ✕
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}