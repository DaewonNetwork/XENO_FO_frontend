import { atom } from "recoil";
import { ProductOptionInfoType } from "../types/orders/OrderProductOptionRequest.type";

export const CartProductListState = atom<ProductOptionInfoType[]>({
    key: "CartProductListState",
    default: [],
});
