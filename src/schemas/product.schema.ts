export interface IProductBaseSchema {
  total?: number;
  products?: IProductSchema[];
}

export interface IProductSchema {
  product_id?: number;
  product_name?: string;
  product_slug?: string;
  category_id?: number;
  screen_size?: string;
  release_date?: string;
  discontinued_date?: string;
  product_images?: string;
  Variants?: IVariantSchema[];
}

export interface IColorSchema {
  color_id?: number;
  color_name?: string;
  color_html_code?: string;
}

export interface IVariantSchema {
  variant_id?: number;
  product_id?: number;
  processor_id?: string;
  storage?: string;
  memory?: string;
  os?: string;
  price?: string;
  color?: IColorSchema;
  processor?: {
    processor_id?: number;
    processor_name?: string;
  };
}
