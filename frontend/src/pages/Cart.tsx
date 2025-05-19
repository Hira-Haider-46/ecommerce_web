import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("Cart must be used within a ShopProvider");
  }
  const { cartItems, products, currency, updateQuantity } = context;
  const [cardData, setCartData] = useState<Array<{ _id: string; size: string; quantity: number }>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14 border-gray-400">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>
      <div>
        {
          cardData.length > 0 ? cardData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <div key={index} className="py-4 border-b border-gray-400 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4">
                <div className="flex items-start gap-6">
                  <img src={productData?.image[0]} alt="product img" className="w-16 sm:w-20" />
                  <div>
                    <p className="text-sm font-medium sm:text-lg">{productData?.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>{currency}{productData?.price}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 border-gray-500 rounded-sm">{item.size}</p>
                    </div>
                  </div>
                </div>
                <input type="number" min={1} defaultValue={item.quantity} className="border border-gray-500 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 outline-none rounded-sm" onChange={(e) => (e.target.value === '' || e.target.value === '0') ? null : updateQuantity(item._id, item.size, Number(e.target.value))}/>
                <img onClick={() => updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} className="w-4 mr-4 sm:w-5 cursor-pointer" alt="del icon" />
              </div>
            )
          }) : <div className="text-center text-xl text-gray-600">Your cart is empty</div>
        }
      </div>
      {cardData.length > 0 && <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 rounded-sm cursor-pointer hover:bg-white border border-black hover:text-black mt-10" onClick={() => navigate('/placeorder')}>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>}
    </div>
  );
};
 
export default Cart;