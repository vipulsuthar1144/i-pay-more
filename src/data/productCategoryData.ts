import { iconIAirpods, iconIMacs, iconIPads, iconIPhones, iconIWatch } from "@assets/images/product-category";
import { IProductCategorySchema } from "@schemas/product-category.schema";

export const ProductCategoryList: IProductCategorySchema[] = [
  {
    model: "Sell IPhone",
    image: iconIPhones,
    link: "/sell/iphones",
    service: "SELL",
  },
  {
    model: "Buy IPhone",
    image: iconIPhones,
    link: "/buy/iphones",
    service: "BUY",
  },
  {
    model: "Repair IPhone",
    image: iconIPhones,
    link: "/sell/iphones",
    service: "REPAIR",
  },
  {
    model: "Sell IPad",
    image: iconIPads,
    link: "/sell/ipads",
    service: "SELL",
  },
  {
    model: "Buy IPad",
    image: iconIPads,
    link: "/buy/ipads",
    service: "BUY",
  },
  {
    model: "Repair IPad",
    image: iconIPads,
    link: "/sell/ipads",
    service: "REPAIR",
  },
  {
    model: "Sell Mac",
    image: iconIMacs,
    link: "/sell/macbooks",
    service: "SELL",
  },
  {
    model: "Buy Mac",
    image: iconIMacs,
    link: "/buy/macbooks",
    service: "BUY",
  },
  {
    model: "Repair Mac",
    image: iconIMacs,
    link: "/sell/macbooks",
    service: "REPAIR",
  },
  {
    model: "Sell Watch",
    image: iconIWatch,
    link: "/sell/laptop",
    service: "SELL",
  },
  {
    model: "Buy Watch",
    image: iconIWatch,
    link: "/sell/laptop",
    service: "BUY",
  },
  {
    model: "Repair Watch",
    image: iconIWatch,
    link: "/sell/laptop",
    service: "REPAIR",
  },
  {
    model: "Sell Speaker",
    image: iconIAirpods,
    link: "/sell/laptop",
    service: "SELL",
  },
  {
    model: "Buy Speaker",
    image: iconIAirpods,
    link: "/sell/laptop",
    service: "BUY",
  },
  {
    model: "Repair Speaker",
    image: iconIAirpods,
    link: "/sell/laptop",
    service: "REPAIR",
  },
];
