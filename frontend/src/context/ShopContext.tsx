import { createContext, ReactNode, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";

interface ShopContextType {
  products: typeof products;
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  getCartCount: () => number;
  addToCart: (id: string, size: string) => Promise<void>;
  cartItems: Record<string, Record<string, number>>;
  updateQuantity: (id: string, size: string, quantity: number) => Promise<void>;
  getCartAmount: () => number;
}

interface ShopContextProviderProps {
  children: ReactNode;
}

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

const ShopContextProvider: React.FC<ShopContextProviderProps> = ({ children }) => {

    const currency = '$';
    const delivery_fee = 10;

    const [search, setSearch] = useState<string>('');
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<Record<string, Record<string, number>>>({});

    const addToCart = async (id: string, size: string) => {
      if(!size) {
        toast.error('Please select a size');
        return;
      }
      let cardData = structuredClone(cartItems);
      if (cardData[id]) {
        if(cardData[id][size]) cardData[id][size] = cardData[id][size] + 1;
        else cardData[id][size] = 1;
      }
      else cardData[id] = {[size]: 1};
      setCartItems(cardData);
    }

    const getCartCount = () => {
      let count = 0;
      for (const items in cartItems) {
        for (const size in cartItems[items]) {
          if(cartItems[items][size] > 0) count += cartItems[items][size];
        }
      }
      return count;
    }

    const updateQuantity = async (id: string, size: string, quantity: number) => {
      let cardData = structuredClone(cartItems);
      cardData[id][size] = quantity;
      setCartItems(cardData);
    }

    const getCartAmount = () => {
      let total = 0;
      for (const items in cartItems) {
        let itemInfo = products.find((item) => item._id === items);
        for (const size in cartItems[items]) {
          if(cartItems[items][size] > 0) {
            if (itemInfo) total += itemInfo.price * cartItems[items][size];
          }
        }
      }
      return total;
    }

    const value: ShopContextType = { products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, addToCart, cartItems, getCartCount, updateQuantity, getCartAmount };

    return (
      <ShopContext.Provider value={value}>
        {children}
      </ShopContext.Provider>
    );
}

export default ShopContextProvider;