import { atom } from "recoil";
import { ProductOptionType } from "../types/product/ProductOption.type";

export const CartProductListRequestState = atom<ProductOptionType[]>({
    key: "CartProductListRequestState",
    default: [],
});
