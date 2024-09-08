import { atom } from "recoil";
import { ProductOptionType } from "../types/product/ProductOption.type";
import { OrderProductInfoReadType } from "../types/orders/OrderProductInfoRead.type";

export const OrderProductOptionRequestListState = atom<ProductOptionType[]>({
    key: "OrderProductOptionRequestListState",
    default: [],
});

export const OrderProductInfoListState = atom<OrderProductInfoReadType[]>({
    key: "OrderProductInfoListState",
    default: [],
});


export const OrderProductReqState = atom<string>({
    key: "OrderProductReqState",
    default: "",
});