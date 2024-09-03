import { atom } from "recoil";
import { ProductOptionInfoType } from "../types/product/ProductOptionInfo.type";

export const CartProductListState = atom<ProductOptionInfoType[]>({
    key: "CartProductListState",
    default: [],
});
