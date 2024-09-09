import { CartInfoReadType } from "./CartInfoRead.type";

export interface CartInfoType extends CartInfoReadType {
    isSelected: boolean;
    cartIndex: number;
};