import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders: React.FC = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("Orders component must be used within a ShopProvider");
  }
  const { products, currency } = context;

  return (
    <div className="border-t pt-16 border-gray-400">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>
      <div>
        {products.slice(0, 4).map((item, index) => {
          return (
            <div
              className="py-4 border-gray-400 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              key={index}
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
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">
                      {currency} {item.price}
                    </p>
                    <p>Quantity : 1</p>
                    <p>Size: M</p>
                  </div>
                  <p className="mt-2">
                    Date: <span className="text-gray-400">25, Jul, 2024</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">Ready to ship</p>
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
