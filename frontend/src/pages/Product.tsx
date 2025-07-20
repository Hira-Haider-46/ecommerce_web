import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext, ProductType } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product: React.FC = () => {
  const { pid } = useParams();
  const context = useContext(ShopContext);
  if (!context) {
    return <div>Loading...</div>;
  }
  const { products, currency, addToCart } = context;
  const [productData, setProductData] = useState<ProductType | null>(null);
  const [img, setImg] = useState<string>("");
  const [size, setSize] = useState<string>("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id == pid) {
        setProductData(item);
        if (item.images && item.images.length > 0) {
          setImg(item.images[0]);
        }
        return;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [pid]);

  return productData ? (
    <div className="border-t pt-10 transition-opacity ease-in duration-500 opacity-100 border-gray-400">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.images &&
              productData.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={productData.name}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  onClick={() => setImg(image)}
                />
              ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={img} alt="img" className="w-full h-auto" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star icon" className="w-3 5" />
            <img src={assets.star_icon} alt="star icon" className="w-3 5" />
            <img src={assets.star_icon} alt="star icon" className="w-3 5" />
            <img src={assets.star_icon} alt="star icon" className="w-3 5" />
            <img
              src={assets.star_dull_icon}
              alt="star icon"
              className="w-3 5"
            />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes &&
                productData.sizes.map((item: string, index: number) => (
                  <button
                    key={index}
                    className={`border py-2 px-4 bg-gray-100 cursor-pointer ${
                      item === size ? "border-orange-500" : "border-gray-500"
                    } rounded-sm`}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>
          <button
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 rounded-sm cursor-pointer hover:bg-white border border-black hover:text-black"
            onClick={() => addToCart(productData._id, size)}
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Orignal Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className="flex">
          <p className="border px-5 py-3 text-sm">Description</p>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-4 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
            quaerat omnis fugiat atque. Error doloribus ipsam iure. Repellendus,
            rem nesciunt distinctio quos sequi nulla odit similique, magnam aut
            consectetur aperiam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            odio molestias dolores. Provident, ab consectetur accusantium ullam
            nulla tenetur fugiat?
          </p>
        </div>
      </div>
      <RelatedProducts
        category={productData.category || ""}
        subCategory={productData.subCategory || ""}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;