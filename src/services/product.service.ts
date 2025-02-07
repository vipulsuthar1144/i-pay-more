import { apiInstance } from "@/config/axios/axios.config";
import { ITEM_PER_PAGE } from "@lib/constants";
import { IProductBaseSchema, IProductSchema } from "@schemas/product.schema";

export const ProductAPI = {
  get: async (categoryID: number, page?: number, limit: number = ITEM_PER_PAGE): Promise<IProductBaseSchema | null> => {
    const response = await apiInstance.get(`/products?category=${categoryID}&limit=${limit}&page=${page}`);
    if (response.data) {
      return response.data;
    }
    return null;
  },
  getByID: async (productID: number): Promise<IProductSchema | null> => {
    const response = await apiInstance.get(`/products/${productID}`);
    if (response.data) {
      return response.data;
    }
    return null;
  },
};
