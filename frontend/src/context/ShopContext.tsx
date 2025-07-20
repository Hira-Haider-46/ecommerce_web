import axios from "axios";
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface ProductType {
  _id: string;
  name: string;
  price: number;
  images?: string[];
  category?: string;
  subCategory?: string;
  bestseller?: boolean;
  description?: string;
  sizes?: string[];
  date?: number;
}

interface ShopContextType {
  products: ProductType[];
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
  backendUrl: string;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  navigate: (path: string) => void;
}

interface ShopContextProviderProps {
  children: ReactNode;
}

export const ShopContext = createContext<ShopContextType | undefined>(
  undefined
);

const ShopContextProvider: React.FC<ShopContextProviderProps> = ({
  children,
}) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState<
    Record<string, Record<string, number>>
  >({});
  const [products, setProducts] = useState<ProductType[]>([]);
  const [token, setToken] = useState<string>("");

  const addToCart = async (id: string, size: string) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    const cartData = structuredClone(cartItems);
    if (cartData[id]) {
      cartData[id][size] = (cartData[id][size] || 0) + 1;
    } else {
      cartData[id] = { [size]: 1 };
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let count = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        count += cartItems[productId][size];
      }
    }
    return count;
  };

  const updateQuantity = async (id: string, size: string, quantity: number) => {
    const cartData = structuredClone(cartItems);
    if (cartData[id]) {
      cartData[id][size] = quantity;
      setCartItems(cartData);
    }
  };

  const getCartAmount = () => {
    let total = 0;
    for (const productId in cartItems) {
      const product = products.find((item) => item._id === productId);
      if (!product) continue;
      for (const size in cartItems[productId]) {
        total += product.price * cartItems[productId][size];
      }
    }
    return total;
  };

  const getProductsData = useCallback(async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) setProducts(res.data.products);
      else toast.error(res.data.message);
    } catch (error) {
      toast.error("Error fetching products");
    }
  }, [backendUrl]);

  useEffect(() => {
    getProductsData();
  }, [getProductsData]);

  useEffect(() => {
    if(!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token") || "");
    }
  }, []);

  const value: ShopContextType = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    backendUrl,
    token,
    setToken,
    navigate,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
