import { imgDefaultPhone } from "@assets/images/product-category";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ItemImage = React.memo(({ src, alt, className }: { src: string; alt?: string; className?: string }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const imgClass = `rounded-lg object-contain w-36 h-36 max-w-36 aspect-square transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"} ${className}`;
  //   useEffect(() => {
  //     // Create an image element to check if the image is cached or needs to load
  //     const img = document.createElement("img");
  //     img.src = src;

  //     img.onload = () => setLoading(false); // Image successfully loaded
  //     img.onerror = () => setImageSrc("/placeholder.png"); // Handle error
  //   }, [src]);
  return (
    <div className="relative w-full h-full flex items-center justify-center rounded-full">
      {/* Show loader when loading */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="w-8 h-8 border-4 border-t-transparent border-blue-400 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Image Component */}
      <Image
        width={150}
        height={150}
        loading="lazy"
        draggable={false}
        src={imageSrc}
        alt={alt || "Placeholder"}
        className={imgClass}
        onError={() => setImageSrc(imgDefaultPhone as any)} // Fallback to placeholder image
        onLoadingComplete={() => setLoading(false)} // Hide loader when loaded
      />
    </div>
  );
});

export default ItemImage;
