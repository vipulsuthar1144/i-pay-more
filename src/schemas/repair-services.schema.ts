export interface IRepairServicebaseSchema {
  total?: number;
  services?: IRepairServiceSchema[];
}

export interface IRepairServiceSchema {
  id?: number;
  service_name?: string;
  image_path?: string;
  service_price?: string;
  discount_percentage?: number;
  category_id?: number;
  created_at?: string;
  Category?: Category;
  category_name?: string;
}

export interface Category {
  category_name?: string;
}
