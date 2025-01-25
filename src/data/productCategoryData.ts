import { iconIAirpods, iconIMacs, iconIPads, iconIPhones, iconIWatch } from "@assets/images/product-category";
import { IProductCategorySchema } from "@schemas/product-category.schema";

export const ProductCategoryList: IProductCategorySchema[] = [
  {
    model: "Sell IPhone",
    image: iconIPhones,
    link: "/sell/iphones",
    service: "sell",
  },
  //   {
  //     model: "Buy IPhone",
  //     image: iconIPhones,
  //     link: "/sell/iphones",
  //     service: "buy",
  //   },
  //   {
  //     model: "Repair IPhone",
  //     image: iconIPhones,
  //     link: "/sell/iphones",
  //     service: "repair",
  //   },
  {
    model: "Sell IPad",
    image: iconIPads,
    link: "/sell/ipads",
    service: "sell",
  },
  //   {
  //     model: "Buy IPad",
  //     image: iconIPads,
  //     link: "/sell/ipads",
  //     service: "buy",
  //   },
  //   {
  //     model: "Repair IPad",
  //     image: iconIPads,
  //     link: "/sell/ipads",
  //     service: "repair",
  //   },
  {
    model: "Sell Mac",
    image: iconIMacs,
    link: "/sell/macbooks",
    service: "sell",
  },
  //   {
  //     model: "Buy Mac",
  //     image: iconIMacs,
  //     link: "/sell/macbooks",
  //     service: "buy",
  //   },
  //   {
  //     model: "Repair Mac",
  //     image: iconIMacs,
  //     link: "/sell/macbooks",
  //     service: "repair",
  //   },
  {
    model: "Sell Watch",
    image: iconIWatch,
    link: "/sell/laptop",
    service: "sell",
  },
  //   {
  //     model: "Buy Watch",
  //     image: iconIWatch,
  //     link: "/sell/laptop",
  //     service: "buy",
  //   },
  //   {
  //     model: "Repair Watch",
  //     image: iconIWatch,
  //     link: "/sell/laptop",
  //     service: "repair",
  //   },
  {
    model: "Sell Speaker",
    image: iconIAirpods,
    link: "/sell/laptop",
    service: "sell",
  },
  //   {
  //     model: "Buy Speaker",
  //     image: iconIAirpods,
  //     link: "/sell/laptop",
  //     service: "buy",
  //   },
  //   {
  //     model: "Repair Speaker",
  //     image: iconIAirpods,
  //     link: "/sell/laptop",
  //     service: "repair",
  //   },
];
