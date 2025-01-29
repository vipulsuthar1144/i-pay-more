import { IAddressSchema } from "./order.schema";

export interface IAuthBaseSchema {
  token?: string;
  user?: IUserSchema;
}

export interface IUserSchema {
  id?: number;
  full_name?: string;
  email?: string;
  phone_number?: string;
  city?: string;
  state?: string;
  status?: number;
  created_at?: string;
  address?: IAddressSchema;
}
