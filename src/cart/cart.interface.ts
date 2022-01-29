import { Product } from "../product/product.model";
export interface CartInterface {
    userId: string;
    items: object[];
}