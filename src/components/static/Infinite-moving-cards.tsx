"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "100s");
      }
    }
  };

  return (
    <div className="relative z-20 max-w-7xl mx-auto overflow-hidden">
      {/* Main Title */}

      {/* Moving Cards */}
      <div ref={containerRef} className={cn("scroller overflow-hidden", className)}>
        <ul
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {items.map((item, idx) => (
            <li
              className="w-[350px] max-w-full relative rounded-2xl border-[1px]  border-gray-400 bg-white  px-6 py-6 md:w-[450px] flex flex-col items-start"
              key={item.name}
            >
              {/* Double-Quote Icon */}
              <div className="text-primary text-[100px] leading-none mb-2 absolute top-5 left-5">
                <span>“</span>
              </div>
              {/* <ItemImage src={imgDoubleQuates as any} alt="“" className=" max-w-16 mb-2" /> */}

              {/* Quote */}
              <p className="text-gray-700 text-start text-sm leading-5 mb-4 pt-14">{item.quote}</p>

              {/* User Details */}
              <div className="flex items-start gap-3">
                <div>
                  <p className="text-gray-800 font-semibold text-sm">{item.name}</p>
                  <p className="text-gray-500 text-xs">{item.title}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
