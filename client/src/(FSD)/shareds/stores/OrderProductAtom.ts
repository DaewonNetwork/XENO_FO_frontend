import { atom } from "recoil";
import { ProductOptionType } from "../types/product/ProductOption.type";

export const OrderProductOptionRequestListState = atom<ProductOptionType[]>({
    key: "OrderProductOptionRequestListState",
    default: [],
});

export const OrderProductReqState = atom<string>({
    key: "OrderProductReqState",
    default: "",
});

export const OrderDeliveryFormIsValidState = atom<boolean>({
    key: "OrderDeliveryFormIsValidState",
    default: false,
});