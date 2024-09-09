import { atom } from "recoil";
import { CartInfoType } from "../types/CartInfo.type";

export const CartListState = atom<CartInfoType[]>({
    key: "CartListState",
    default: [],
});