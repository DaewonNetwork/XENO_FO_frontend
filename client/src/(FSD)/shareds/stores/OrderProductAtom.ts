import { atom } from "recoil";
import { ProductOptionType } from "../types/product/ProductOption.type";

export const OrderProductListState = atom<ProductOptionType[]>({
    key: "OrderProductListState",
    default: [],
});