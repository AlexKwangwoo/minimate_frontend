export interface General_data_type {
  status: "sucess" | "fail";
  data: any;
  general_message: any;
}

export interface Category_type {
  _id: string;
  name: string;
  kind: string;
}

export interface Item_type {
  category: { _id: string; name: string };
  name: string;
  createdAt: string;
  description: string;
  id: string;
  item_img: null;
  item_name: string;
  item_price: number;
  sales_volume: number;
  _id: string;
}
