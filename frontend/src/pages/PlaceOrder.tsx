import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

interface formDataType {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

const PlaceOrder: React.FC = () => {
  const [method, setMethod] = useState<string>("cod");
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("PlaceOrder must be used within a ShopContextProvider");
  }
  const { backendUrl, navigate, token, cartItems, setCartItems, getCartAmount, delivery_fee,  products} = context;
  
  const [formData, setformData] = useState<formDataType>({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const initPay = (order: any) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response: any) => {
        try {
          const {data} = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if(data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(data.message || "Error verifying payment");
          }
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Unknown error");
        }
      },
    }
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  }

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for(const items in cartItems) {
        for(const item in cartItems[items]) {
          if(cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if(itemInfo) {
              (itemInfo as any).size = item;
              (itemInfo as any).quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };
      switch (method) {
        case "cod":
          const res = await axios.post(backendUrl + "/api/order/place", orderData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(res.data.message || "Error placing order");
          }
          break;
        case "stripe":
           const resStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
           });
           if(resStripe.data.success) {
            const {session_url} = resStripe.data;
            window.location.href = session_url;
           } else {
            toast.error(resStripe.data.message || "Error with Stripe payment");
           }
          break;
        case "razor":
          const resRazor = await axios.post(backendUrl + '/api/order/razorpay', orderData, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          if(resRazor.data.success) {
            initPay(resRazor.data.order);
          } else {
            toast.error(resRazor.data.message || "Error with Razorpay payment");
          }
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <form className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-400" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            value={formData.firstName}
            name="firstName"
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
            placeholder="First Name"
            required
          />
          <input
            onChange={onChangeHandler}
            value={formData.lastName}
            name="lastName"
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          value={formData.email}
          name="email"
          type="email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
          placeholder="Email Address"
          required
        />
        <input
          onChange={onChangeHandler}
          value={formData.street}
          name="street"
          type="text"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
          placeholder="Street"
          required
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            value={formData.city}
            name="city"
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
            placeholder="City"
            required
          />
          <input
            onChange={onChangeHandler}
            value={formData.state}
            name="state"
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
            placeholder="State"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            value={formData.zipCode}
            name="zipCode"
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
            placeholder="Zip Code"
            required
          />
          <input
            onChange={onChangeHandler}
            value={formData.country}
            name="country"
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
            placeholder="Country"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          value={formData.phone}
          name="phone"
          type="text"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
          placeholder="Phone"
          required
        />
      </div>
      <div className="mt-8">
        <div className="mt-8 min-w-8">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex flex-col lg:flex-row gap-3">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border border-gray-400 rounded-sm py-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe"
                    ? "bg-green-400 border-green-400"
                    : "border-gray-400"
                }`}
              ></p>
              <img
                src={assets.stripe_logo}
                alt="stripe logo"
                className="h-5 mx-4"
              />
            </div>
            <div
              onClick={() => setMethod("razor")}
              className="flex items-center gap-3 border border-gray-400 rounded-sm py-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razor"
                    ? "bg-green-400 border-green-400"
                    : "border-gray-400"
                }`}
              ></p>
              <img
                src={assets.razorpay_logo}
                alt="razor pay logo"
                className="h-5 mx-4"
              />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border border-gray-400 rounded-sm py-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod"
                    ? "bg-green-400 border-green-400"
                    : "border-gray-400"
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
        </div>
        <div className="w-full text-end mt-8">
          <button type="submit" className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 rounded-sm cursor-pointer hover:bg-white border border-black hover:text-black mt-10">
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;