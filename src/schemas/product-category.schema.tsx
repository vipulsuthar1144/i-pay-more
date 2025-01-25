import { StaticImageData } from "next/image";

export type TService = "sell" | "repair" | "buy";

export interface IProductCategorySchema {
  model: string;
  image: StaticImageData;
  link: string;
  service: TService;
}
