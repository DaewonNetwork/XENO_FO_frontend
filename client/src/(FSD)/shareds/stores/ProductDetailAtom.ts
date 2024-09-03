import { atom } from "recoil";
import { ProductOptionType } from "../types/product/ProductOption.type";

export const ProductOptionListState = atom<ProductOptionType[]>({
    key: "ProductOptionListState",
    default: [],
});