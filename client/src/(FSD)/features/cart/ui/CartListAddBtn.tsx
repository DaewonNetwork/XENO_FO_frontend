"use client";

import { Button, ButtonProps } from "@nextui-org/button";
import React from "react";

interface CartListAddBtnProps extends ButtonProps {
    productId: number;
}

const CartListAddBtn = ({ productId, children, ...props }: CartListAddBtnProps) => {
    return (
        <Button {...props}>장바구니</Button>
    );
};

export default CartListAddBtn;