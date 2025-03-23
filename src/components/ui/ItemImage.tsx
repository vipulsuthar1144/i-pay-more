import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { imgDefaultCategory } from "@assets/images/product-category"; // Ensure this import path is correct
import { BASE_API_URL, BASE_IMAGE_URL } from "@/config/axios/axios.config";

interface IItemImage extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string | StaticImageData; // Override 'src' to accept StaticImageData
  alt?: string; // Optional alt text
  className?: string; // Optional additional CSS classes
  errorImg?: StaticImageData; // Optional fallback image on error
  width?: number; // Ensure width is explicitly a number
  height?: number; // Ensure height is explicitly a number
  addBaseUrl?: boolean;
}

const ItemImage: React.FC<IItemImage> = React.memo(
  ({ src, alt = "Placeholder", className = "", errorImg = imgDefaultCategory, addBaseUrl = true, ...props }) => {
    const [imageSrc, setImageSrc] = useState<string | StaticImageData>(
      !src ? errorImg : addBaseUrl ? `${BASE_IMAGE_URL}${src}` : src
    );
    const [loading, setLoading] = useState<boolean>(true);

    const imgClass = `rounded-lg object-contain w-full h-auto max-w-24 aspect-square  transition-opacity duration-300 ${
      loading ? "opacity-0" : "opacity-100"
    } ${className}`;

    return (
      <div className="relative w-full h-full flex items-center  justify-center rounded-full">
        {/* Show loader when loading */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-md">
            <div className="w-full h-full m-2 bg-gray-200 animate-pulse  rounded-lg"></div>
          </div>
        )}

        {/* Image Component */}
        <Image
          width={800}
          height={500}
          loading="lazy"
          draggable={false}
          src={imageSrc}
          alt={alt}
          className={imgClass}
          onError={() => setImageSrc(errorImg)} // Fallback to placeholder image
          onLoadingComplete={() => setLoading(false)} // Hide loader when loaded
          {...props}
          unoptimized
        />
      </div>
    );
  }
);

export default ItemImage;
