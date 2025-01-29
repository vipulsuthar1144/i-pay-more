import { apiInstance } from "@/config/axios/axios.config";
import { IAuthBaseSchema } from "@schemas/base.shema";
import { ISaleLeadBaseSchema, ISaleLeadSchema } from "@schemas/order.schema";
import { IProductSchema } from "@schemas/product.schema";

export const AuthAPI = {
  login: async (payload: { email: string; password: string }): Promise<IAuthBaseSchema | null> => {
    const response = await apiInstance.post(`/auth/login`, {
      ...payload,
    });
    if (response.data) {
      return response.data;
    }
    return null;
  },
  signup: async (): Promise<IAuthBaseSchema[] | null> => {
    const response = await apiInstance.get(`/auth/signup`);
    if (response.data) {
      return response.data;
    }
    return null;
  },
};
