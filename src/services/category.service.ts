import { apiInstance } from "@/config/axios/axios.config";
import { NewDataCategory } from "@/new-data/category.new-data";
import { ICategoryBaseSchema } from "@schemas/product-category.schema";

export const CategoryAPI = {
  get: async (): Promise<ICategoryBaseSchema | null> => {
    // const response = await apiInstance.get(`/categories`);
    // if (response.data) {
    //   return response.data;
    // }
    // return null;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(NewDataCategory);
      }, 1000);
    });
  },
};
