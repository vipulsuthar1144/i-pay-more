export interface IProductSchema {
  product_id?: number;
  product_name?: string;
  category_id?: number;
  colors?: IColorSchema[];
  screen_size?: string;
  release_date?: string;
  discontinued_date?: string;
  product_images?: string;
  Variants?: IVariantSchema[];
}

export interface IColorSchema {
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
  processor?: {
    processor_name?: string;
  };
}
