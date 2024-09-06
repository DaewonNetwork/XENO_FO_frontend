"use client";

import React from "react";
import { useCartProductListRead } from "../api/useCartProductListRead";

const CartProductList = () => {
    const { data } = useCartProductListRead();

    console.log(data);
    

    return (
        <div>

        </div>
    );
};

export default CartProductList;