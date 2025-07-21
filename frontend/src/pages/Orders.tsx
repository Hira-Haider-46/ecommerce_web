import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders: React.FC = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("Orders component must be used within a ShopProvider");
  }
  const { backendUrl, token, currency } = context;

  const [orderData, setorderData] = useState<any[]>([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const res = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        let allOrdersItem : any[] = []
        res.data.orders.map((order: any) => {
          order.items.map((item : any) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['date'] = order.date;
            item['paymentMethod'] = order.paymentMethod;
            allOrdersItem.push(item);
          })
        });
        setorderData(allOrdersItem.reverse());
        console.log(allOrdersItem);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="border-t pt-16 border-gray-400">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>
      <div>
        {orderData.map((item) => {
          return (
            <div
              className="py-4 border-gray-400 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              key={item._id}
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  src={
                    item.images && item.images.length > 0
                      ? item.images[0]
                      : "/placeholder-image.png"
                  }
                  alt="product item img"
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>
                      {currency} {item.price}
                    </p>
                    <p>Quantity : {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1">
                    Date: <span className="text-gray-400">{new Date(item.date).toLocaleDateString()}</span>
                  </p>
                  <p className="mt-1">
                    Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 rounded-sm cursor-pointer hover:bg-white border border-black hover:text-black transition-all duration-400">
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;