import { TDevice, TService } from "./product-category.schema";

export interface ICalculateQueryParams {
  pid: string; // product id
  pslg: string; // product slug
  pmn: string; // product name
  pclrid: string; // product color id
  pclr: string; // product color
  pvid: string; // product variant id
  pv: string; // product variant
  ppcsr: string; // product processor
  pimg: string; // product image
  st: TService; // service type :: SELL,BUY,REPAIR
  cid: string; // category id :: IPHONES, IPADS, MACBOOKS
  dt: TDevice;
}
