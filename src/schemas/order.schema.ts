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
}

export interface IAddressSchema {
  name?: string;
  mobile?: string;
  pincode?: string;
  locality?: string;
  address?: string;
  city?: string;
  state?: string;
  landmark?: string;
  alternatePhone?: string;
  addressType?: string;
}
