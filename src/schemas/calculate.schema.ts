import { TDevice, TService } from "./product-category.schema";

export interface ICalculateQueryParams {
  pid: string; // product id
  pslg: string; // product slug
  pmn: string; // product name
  pclr: string; // product color
  pvid: string; // product storage
  ppcsr: string; // product processor
  pimg: string; // product image
  st: TService; // service type :: SELL,BUY,REPAIR
  cid: string; // category id :: IPHONES, IPADS, MACBOOKS
}
