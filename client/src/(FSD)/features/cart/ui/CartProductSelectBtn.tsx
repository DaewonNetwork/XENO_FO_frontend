import React from "react";
import { Checkbox } from "@nextui-org/checkbox";
import { useSetRecoilState } from "recoil";
import { CartListState } from "@/(FSD)/shareds/stores/CartAtom";

interface CartProductSelectBtnProps {
    isSelected: boolean;
    cartIndex: number;
}

const CartProductSelectBtn = ({ isSelected, cartIndex }: CartProductSelectBtnProps) => {
    const setCartListState = useSetRecoilState(CartListState);
    
    return (
        <Checkbox onValueChange={e => {
            setCartListState(cartList => {
                return cartList.map((cartInfo, index) => {
                    if (index === cartIndex) {
                        return { ...cartInfo, isSelected: e }
                    }
                    return cartInfo;
                }) 
            });
            
        }} isSelected={isSelected} radius={"sm"} disableAnimation />
    )
}

export default CartProductSelectBtn;