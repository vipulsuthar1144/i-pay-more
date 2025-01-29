import { StaticImageData } from "next/image";

export type TService = "SELL" | "REPAIR" | "BUY";
export type TDevice = "IPHONES" | "IPADS" | "MACBOOKS";

export interface IProductCategorySchema {
  model: string;
  image: StaticImageData;
  link: string;
  service: TService;
}

export interface ICategoryBaseSchema {
  total?: number;
  categories?: ICategorySchema[];
}

export interface ICategorySchema {
  category_id?: number;
  category_slug?: string;
  category_name?: string;
  image_path?: string;
}
