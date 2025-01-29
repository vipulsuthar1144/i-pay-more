import { apiInstance } from "@/config/axios/axios.config";
import { IAddressSchema } from "@schemas/order.schema";

export const AddressAPI = {
  update: async (payload: IAddressSchema): Promise<IAddressSchema | null> => {
    const response = await apiInstance.put(`/users/address`, {
      ...payload,
    });
    if (response.data) {
      return response.data;
    }
    return null;
  },
};
