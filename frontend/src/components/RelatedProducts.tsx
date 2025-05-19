import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

interface RelatedProductsProps {
  category: string;
  subCategory: string;
}

interface ProductData {
    _id: string;
    name: string;
    sizes: string[];
    date: number;
    bestseller: boolean;
    category: string;
    description: string;
    image: string[];
    price: number;
  }

const RelatedProducts: React.FC<RelatedProductsProps> = ({ category, subCategory }) => {

    const context = useContext(ShopContext);
    if (!context) {
        return <div>Loading...</div>;
    }
    const { products } = context;
    const [relatedProducts, setRelatedProducts] = useState<ProductData[]>([]);

    useEffect(() => {
        if(products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) =>  item.category === category && item.subCategory !== subCategory);
            setRelatedProducts(productsCopy.slice(0, 5));
        }
    }, [products]);

  return (
    <div className="my-24">
        <div className="text-center text-3xl py-2">
            <Title text1="RELATED" text2='PRODUCTS'/>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {relatedProducts.map((item, index) => {
                return (
                    <ProductItem key={item._id} name={item.name} price={item.price} image={item.image}  id={item._id} />
                )
            })}
        </div>
    </div>
  )
}

export default RelatedProducts;