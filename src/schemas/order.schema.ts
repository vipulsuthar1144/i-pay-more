export interface ISaleLeadBaseSchema {
  message?: string;
  lead?: ISaleLeadSchema;
}

export interface ISaleLeadSchema {
  leadcreatedat?: string;
  lead_status?: number;
  id?: number;
  name?: string;
  mobile?: string;
  email?: string;
  city?: string;
  state?: string;
  color_id?: number;
  address_id?: number;
  product_id?: number;
  variant_id?: number;
  lead_details?: ILeadDetailsSchema;
}

export interface ILeadDetailsSchema {
  address?: IAddressSchema;
  questions?: IProductProblems;
}
export interface IProductProblems {
  basic: {
    question?: string;
    answer?: string;
  }[];
  defects: {
    question?: string;
    answer?: string;
  }[];

  functional: {
    question?: string;
    answer?: string;
  }[];

  accessories: {
    question?: string;
    answer?: string;
  }[];

  repair_services: {
    question?: string;
    answer?: string;
  }[];
}

// export interface IAddressSchema {
//   id?: number;
//   user_id?: number;
//   name?: string;
//   phone_no?: string;
//   pincode?: string;
//   locality?: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   landmark?: string;
//   alternate_phone_no?: string;
// }

export interface IAddressSchema {
  id?: number;
  user_id?: number;
  name?: string;
  phone_no?: string;
  type?: string;
  pincode?: string;
  locality?: string;
  address?: string;
  city?: string;
  state?: string;
  landmark?: string;
  alternate_phone_no?: string;
}
