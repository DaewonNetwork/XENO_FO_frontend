import { atom } from "recoil";

export const CartProductAtom = atom<any>({
    key: "CartProductAtom",
    default: [],
});