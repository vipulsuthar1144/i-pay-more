import { apiInstance } from "@/config/axios/axios.config";
import { IRepairServicebaseSchema } from "@schemas/repair-services.schema";

export const RepairAPI = {
  getServices: async (): Promise<IRepairServicebaseSchema | null> => {
    const response = await apiInstance.get(`/repair-services`);
    if (response.data) {
      return response.data;
    }
    return null;
  },
};
