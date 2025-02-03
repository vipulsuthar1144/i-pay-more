import ItemImage from "@components/ui/ItemImage";
import { isValidUrl } from "@lib/validation";
import { forwardRef } from "react";

interface IProductCardProps<T> {
  title: string;
  img?: string;
  onClick?: VoidFunction;
  addBaseUrl?: boolean;
}

const ProductCard = forwardRef<HTMLDivElement, IProductCardProps<any>>(
  ({ title, img, addBaseUrl = true, onClick }, ref) => {
    return (
      <div
        onClick={() => {
          onClick && onClick();
        }}
        className="bg-blue-50/10 cursor-pointer hover:shadow-md border-[1px] border-gray-200 rounded-md shadow-md p-4 text-center flex flex-col items-center transition-all duration-300 ease-in-out"
      >
        <ItemImage addBaseUrl={addBaseUrl} src={isValidUrl(img) && img ? img : ""} alt={title || "Category Image"} />
        <h3 className="font-semibold text-xs  mt-2">{title}</h3>
      </div>
    );
  }
);

export default ProductCard;
