import { apiInstance } from "@/config/axios/axios.config";
import { ISaleLeadBaseSchema, ISaleLeadSchema } from "@schemas/order.schema";
import { TService } from "@schemas/product-category.schema";

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
  get: async ({ type }: { type: TService }): Promise<ISaleLeadSchema[] | null> => {
    const response = await apiInstance.get(`/sale-leads?type=${type}`);
    if (response.data) {
      return response.data;
    }
    return null;
  },
};
