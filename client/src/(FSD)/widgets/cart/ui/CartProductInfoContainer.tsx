"use client";

import { useCartProductListRead } from "@/(FSD)/entities/cart/api/useCartProductListRead";
import { CartInfoType } from "@/(FSD)/shareds/types/CartInfo.type";
import { CartInfoReadType } from "@/(FSD)/shareds/types/CartInfoRead.type";
import React, { useEffect } from "react";
import CartProductInfoList from "./CartProductInfoList";
import { useSetRecoilState } from "recoil";
import { CartListState } from "@/(FSD)/shareds/stores/CartAtom";

const CartProductInfoContainer = () => {
    const { data } = useCartProductListRead();

    const cartInfoReadList: CartInfoReadType[] = data;

    const setCartListState = useSetRecoilState(CartListState);

    useEffect(() => {}, [data]);
    
    if(!cartInfoReadList) return <></>;
    
    const cartInfoList: CartInfoType[] = cartInfoReadList.map((cartInfoRead, index) => {
        return { isSelected: false, cartIndex: index, ...cartInfoRead }
    });
    
    setCartListState(cartInfoList);


    return (
        <CartProductInfoList />
    );
};

export default CartProductInfoContainer;