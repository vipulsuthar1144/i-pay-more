import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { imgDefaultCategory } from "@assets/images/product-category"; // Ensure this import path is correct
import { BASE_API_URL } from "@/config/axios/axios.config";

interface IItemImage extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string | StaticImageData; // Override 'src' to accept StaticImageData
  alt?: string; // Optional alt text
  className?: string; // Optional additional CSS classes
  errorImg?: StaticImageData; // Optional fallback image on error
  width?: number; // Ensure width is explicitly a number
  height?: number; // Ensure height is explicitly a number
}

const ItemImage: React.FC<IItemImage> = React.memo(
  ({ src, alt = "Placeholder", className = "", errorImg = imgDefaultCategory, ...props }) => {
    const [imageSrc, setImageSrc] = useState<string | StaticImageData>(src ? `${src}` : errorImg);
    const [loading, setLoading] = useState<boolean>(true);

    const imgClass = `rounded-lg object-contain w-full h-full max-w-36 aspect-square transition-opacity duration-300 ${
      loading ? "opacity-0" : "opacity-100"
    } ${className}`;

    return (
      <div className="relative w-full h-full flex items-center justify-center rounded-full">
        {/* Show loader when loading */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-md">
            <div className="w-8 h-8 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
          </div>
        )}

        {/* Image Component */}
        <Image
          width={800}
          height={800}
          loading="lazy"
          draggable={false}
          src={imageSrc}
          alt={alt}
          className={imgClass}
          onError={() => setImageSrc(errorImg)} // Fallback to placeholder image
          onLoadingComplete={() => setLoading(false)} // Hide loader when loaded
          {...props}
        />
      </div>
    );
  }
);

export default ItemImage;
