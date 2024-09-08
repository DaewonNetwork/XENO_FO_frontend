"use client";

import { CartProductListRequestState } from "@/(FSD)/shareds/stores/CartProductAtom";
import React from "react";
import { useRecoilState } from "recoil";

const CartProductList = () => {
    const cartProductListRequestState = useRecoilState(CartProductListRequestState);

    console.log(cartProductListRequestState);
    

    return (
        <div>

        </div>
    );
};

export default CartProductList;