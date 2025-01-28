import { apiInstance } from "@/config/axios/axios.config";
import { IProductSchema } from "@schemas/product.schema";

export const ProductAPI = {
  get: async (categoryID: number): Promise<IProductSchema[] | null> => {
    const response = await apiInstance.get(`/products?category=${categoryID}`);
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
