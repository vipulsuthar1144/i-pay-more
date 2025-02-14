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
        className={` cursor-pointer aspect-auto  border-gray-200 rounded-md border-[1px] md:shadow-custom p-4 text-center flex flex-col items-center transition-all duration-300 ease-in-out ${cardClasses}`}
      >
        <div className="w-full h-auto min-h-24">
          <ItemImage
            // className="min-h-24"
            addBaseUrl={addBaseUrl}
            src={isValidUrl(img) && img ? img : ""}
            alt={title || "Category Image"}
          />
        </div>
        <h3 className="font-medium text-xs mt-1">{title}</h3>
      </div>
    );
  }
);

export default ProductCard;
