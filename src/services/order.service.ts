import { apiInstance } from "@/config/axios/axios.config";
import { ISaleLeadBaseSchema, ISaleLeadSchema } from "@schemas/order.schema";
import { IProductSchema } from "@schemas/product.schema";

export const SaleLeadsAPI = {
  create: async (payload: ISaleLeadSchema): Promise<ISaleLeadBaseSchema | null> => {
    const response = await apiInstance.post(`/sale-leads`, {
      ...payload,
    });
    if (response.data) {
      return response.data;
    }
    return null;
  },
  get: async (): Promise<ISaleLeadBaseSchema[] | null> => {
    const response = await apiInstance.get(`/sale-leads`);
    if (response.data) {
      return response.data;
    }
    return null;
  },
};
