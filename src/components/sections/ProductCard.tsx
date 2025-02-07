import ItemImage from "@components/ui/ItemImage";
import { isValidUrl } from "@lib/validation";
import { forwardRef } from "react";

interface IProductCardProps<T> {
  title: string;
  img?: string;
  onClick?: VoidFunction;
  addBaseUrl?: boolean;
  cardClasses?: string;
}

const ProductCard = forwardRef<HTMLDivElement, IProductCardProps<any>>(
  ({ title, img, addBaseUrl = true, onClick, cardClasses }, ref) => {
    return (
      <div
        onClick={() => {
          onClick && onClick();
        }}
        className={`bg-blue-50/10 cursor-pointer h-[150px] md:h-[180px] aspect-square border-gray-200 rounded-md shadow-custom p-4 text-center flex flex-col items-center transition-all duration-300 ease-in-out ${cardClasses}`}
      >
        <ItemImage addBaseUrl={addBaseUrl} src={isValidUrl(img) && img ? img : ""} alt={title || "Category Image"} />
        <h3 className="font-medium text-xs  mt-1">{title}</h3>
      </div>
    );
  }
);

export default ProductCard;
