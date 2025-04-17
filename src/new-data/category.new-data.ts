import { iconIAirpods, iconIMacs, iconIPads, iconIPhones, iconIWatch } from "@assets/images/product-category";
import { ICategoryBaseSchema } from "@schemas/product-category.schema";

export const NewDataCategory: ICategoryBaseSchema = {
  total: 6,
  categories: [
    {
      category_id: 1,
      category_name: "iPhone",
      //   image_path: "/assets/category-images/1738919446501.png",
      image_path: iconIPhones as any,
      category_slug: "iphone",
    },
    {
      category_id: 2,
      category_name: "iPad",
      image_path: iconIPads as any,
      category_slug: "ipad",
    },
    {
      category_id: 3,
      category_name: "Mac",
      image_path: iconIMacs,
      category_slug: "mac",
    },
    // {
    //   category_id: 4,
    //   category_name: "iMac",
    //   image_path: "/assets/category-images/1738919630577.png",
    //   category_slug: "imac",
    // },
    {
      category_id: 5,
      category_name: "Apple Watch",
      image_path: iconIWatch,
      category_slug: "apple-watch",
    },
    {
      category_id: 6,
      category_name: "Speakers",
      image_path: iconIAirpods,
      category_slug: "speakers",
    },
  ],
};
