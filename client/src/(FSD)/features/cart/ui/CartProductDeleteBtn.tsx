"use client";

import IconBtnShared from "@/(FSD)/shareds/ui/IconBtnShared";
import { ButtonProps } from "@nextui-org/button";
import React from "react";
import { useCartListDelete } from "../api/useCartListDelete";
import { useQueryClient } from "@tanstack/react-query";

interface CartProductDeleteBtnProps extends ButtonProps {
    cartId: number;
}

const CartProductDeleteBtn = ({ cartId }: CartProductDeleteBtnProps) => {
    const queryClient = useQueryClient();

    const onSuccess = (data: any) => {
        queryClient.refetchQueries({ queryKey: ["cart_product_list_read"] });
    };

    const { mutate } = useCartListDelete({ onSuccess });

    return <IconBtnShared onClick={_ => {
        mutate(cartId);
    }} iconProps={{ iconType: "close" }} />
}

export default CartProductDeleteBtn;