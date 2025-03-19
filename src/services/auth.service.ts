import { apiInstance } from "@/config/axios/axios.config";
import { IAuthBaseSchema, IUserSchema } from "@schemas/base.shema";
import { ISaleLeadBaseSchema, ISaleLeadSchema } from "@schemas/order.schema";
import { IProductSchema } from "@schemas/product.schema";

export const AuthAPI = {
  login: async (payload: { phone_number: string }): Promise<IUserSchema | null> => {
    const response = await apiInstance.post(`/auth/login`, {
      ...payload,
    });
    if (response.data) {
      return response.data;
    }
    return null;
  },
  signup: async (payload: IUserSchema): Promise<IUserSchema | null> => {
    const response = await apiInstance.post(`/auth/signup`, payload);
    if (response.data) {
      return response.data;
    }
    return null;
  },
  verifyOTP: async (payload: { phone_number: string; otp: string }): Promise<IAuthBaseSchema | null> => {
    const response = await apiInstance.post(`/auth/verify-otp`, payload);
    if (response.data) {
      return response.data;
    }
    return null;
  },
  sendOTP: async (payload: { phone_number: string }): Promise<{ message: string } | null> => {
    const response = await apiInstance.post(`/auth/verify-otp`, payload);
    if (response.data) {
      return response.data;
    }
    return null;
  },
};
