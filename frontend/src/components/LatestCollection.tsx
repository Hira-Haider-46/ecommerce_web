import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection: React.FC = () => {
  const context = useContext(ShopContext);
  if (!context) {
    return (
      <div>
        Error: ShopContext is not available. Please ensure the provider is
        wrapped around the component.
      </div>
    );
  }

  const { products } = context;
  const [latestProducts, setLatestProducts] = useState(products);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10 px-5 mx-auto md:px-15">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
          accusamus?
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
        {latestProducts.length > 0 &&
          latestProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.images || []}
              name={item.name}
              price={item.price}
            />
          ))}
      </div>
    </div>
  );
};

export default LatestCollection;
