import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

interface ProductItemProps {
  id: string;
  image: string[];
  name: string;
  price: number;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  image,
  name,
  price,
}) => {
  const context = useContext(ShopContext);

  if (!context) {
    return (
      <div>
        Error: Currency is not available. Please ensure the provider is wrapped
        around the component.
      </div>
    );
  }

  const { currency } = context;

  return (
    <Link
      to={`/product/${id}`}
      className="text-gray-700 cursor-pointer mx-auto"
    >
      <div className="overflow-hidden">
        <img
          src={image && image.length > 0 ? image[0] : "/placeholder-image.png"}
          alt="img"
          className="hover:scale-110 transition ease-in-out"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
