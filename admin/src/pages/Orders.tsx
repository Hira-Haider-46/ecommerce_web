import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

export default function Orders({ token }: { token: string }) {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchAllOrders = async () => {
    try {
      if (!token) return null;
      const res = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) setOrders(res.data.orders);
      else toast.error(res.data.message || "Failed to fetch orders");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  const statusHandler = async (e: React.ChangeEvent<HTMLSelectElement>, orderId: string) => {
    const status = e.target.value;
    try {
      const res = await axios.put(
        backendUrl + "/api/order/status",
        { orderId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        fetchAllOrders();
      } else {
        toast.error(res.data.message || "Failed to update order status");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="pr-6 md:pr-15">
      <h3>Orders Page</h3>
      <div>
        {orders.length > 0 ? (
          orders.reverse().map((order) => {
            return (
              <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={order._id}>
                <img className="w-12" src={assets.parcel_icon} alt="parcel icon" />
                <div>
                  <div>
                    {order.items.map((item: any, idx: any) => {
                      if (idx === order.items.length - 1) {
                        return (
                          <p className="py-0.5" key={item._id}>
                            {item.name} x {item.quantity}{" "}
                            <span>{item.size}</span>
                          </p>
                        );
                      } else {
                        return (
                          <p className="py-0.5" key={item._id}>
                            {item.name} x {item.quantity}{" "}
                            <span>{item.size}</span>,{" "}
                          </p>
                        );
                      }
                    })}
                  </div>
                  <p className="mt-3 mb-2 font-medium">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div>
                    <p>{order.address.street + ", "}</p>
                    <p>
                      {order.address.city +
                        ", " +
                        order.address.state +
                        " " +
                        order.address.country +
                        ", " +
                        order.address.zipCode}
                    </p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>
                <div>
                  <p className="text-sm sm:text-[15px]"><span className="font-medium">Items:</span> {order.items.length}</p>
                  <p className="mt-3"><span className="font-medium">Payment Method:</span> {order.paymentMethod}</p>
                  <p><span className="font-medium">Payment:</span> {order.payment ? 'Done' : 'Pending'}</p>
                  <p><span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p className="text-sm sm:text-[15px]">{currency} {order.amount}</p>
                <select onChange={(e) => statusHandler(e, order._id)} className="p-2 font-semibold cursor-pointer rounded-md" value={order.status}>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            );
          })
        ) : (
          <p className="mt-10 text-center">No orders found.</p>
        )}
      </div>
    </div>
  );
}