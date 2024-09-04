import { atom } from "recoil";
import { OrderProductOptionRequestType } from "../types/orders/OrderProductOptionRequest.type";

export const OrderProductOptionRequestListState = atom<OrderProductOptionRequestType[]>({
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