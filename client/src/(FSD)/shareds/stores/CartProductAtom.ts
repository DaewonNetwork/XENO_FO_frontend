import { atom } from "recoil";
import { ProductOptionType } from "../types/product/ProductOption.type";

export const CartProductListState = atom<ProductOptionType[]>({
    key: "CartProductListState",
    default: [],
});