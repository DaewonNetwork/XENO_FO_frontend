import { atom } from "recoil";
import { ProductOptionInfoType } from "../types/product/ProductOptionInfo.type";

export const OrderProductListState = atom<ProductOptionInfoType[]>({
    key: "OrderProductListState",
    default: [],
});