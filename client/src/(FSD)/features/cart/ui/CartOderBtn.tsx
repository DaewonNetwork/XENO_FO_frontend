"use client";

import { CartListState } from "@/(FSD)/shareds/stores/CartAtom";
import { OrderProductOptionRequestListState } from "@/(FSD)/shareds/stores/OrderProductAtom";
import { ProductOptionType } from "@/(FSD)/shareds/types/product/ProductOption.type";
import { Button, ButtonProps } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface CartOderBtnProps extends ButtonProps {

}

const CartOderBtn = ({}: CartOderBtnProps) => {
    const cartListState = useRecoilValue(CartListState);
    const setOrderProductOptionRequestList = useSetRecoilState(OrderProductOptionRequestListState);

    const router = useRouter();

    if(!cartListState) return <></>;

    const handleClick = () => {
        const productOptionList: ProductOptionType[] = cartListState.filter(cartInfo => cartInfo.isSelected).map(cartInfo => {
            return {
                productId: cartInfo.productId,
                productOptionId: cartInfo.productOptionId,
                quantity: cartInfo.quantity,
                price: cartInfo.price,
                size: cartInfo.size
            }
        });

        if(!productOptionList.length) return;

        setOrderProductOptionRequestList(productOptionList);

        router.push("/order");
    };
    

    return <Button onClick={handleClick} className={"text-background bg-foreground"} radius={"sm"} size={"lg"} fullWidth>구매하기</Button>
}

export default CartOderBtn;