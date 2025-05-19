import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error("CartTotal must be used within a ShopContextProvider");
    }
    const { getCartAmount, delivery_fee, currency } = context;

  return (
    <div className="w-full">
        <div className="text-2xl">
            <Title text1="CART" text2="TOTAl" />
        </div>
        <div className="flex flex-col gap-2 mt-2 text-sm text-gray-500">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency} {getCartAmount()}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p>Shipping Free</p>
                <p>{currency} {delivery_fee}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <b>Total</b>
                <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal;