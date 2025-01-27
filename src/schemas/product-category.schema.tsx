import { StaticImageData } from "next/image";

export type TService = "SELL" | "REPAIR" | "BUY";
export type TDevice = "IPHONES" | "IPADS" | "MACBOOKS";

export interface IProductCategorySchema {
  model: string;
  image: StaticImageData;
  link: string;
  service: TService;
}
