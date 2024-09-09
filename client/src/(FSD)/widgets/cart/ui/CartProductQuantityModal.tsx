"use client";

import React, { useState } from "react";
import AppPromptModal from "../../app/ui/AppPromptModal";
import { AppModalType } from "../../app/types/AppModal.type";
import CartProductQuantityContoller from "@/(FSD)/features/cart/ui/CartProductQuantityContoller";
import { CartInfoType } from "@/(FSD)/shareds/types/CartInfo.type";
import { useCartUpdate } from "@/(FSD)/features/cart/api/useCartUpdate";
import { useQueryClient } from "@tanstack/react-query";

interface CartProductQuantityModalProps extends AppModalType {
    cartInfo: CartInfoType;
}

const CartProductQuantityModal = ({ cartInfo, isOpen, onOpenChange }: CartProductQuantityModalProps) => {
    const [quantity, setQuantity] = useState(cartInfo.quantity || 1);

    const queryClient = useQueryClient();

    const onSuccess = (data: any) => {
        queryClient.refetchQueries({ queryKey: ["cart_product_list_read"] });
    };

    const { mutate } = useCartUpdate({ onSuccess });

    const onAction = () => {
        mutate({ cartId: cartInfo.cartId, quantity: quantity, price: cartInfo.price });
    };

    return (
        <AppPromptModal actionButtonProps={{ onAction: onAction }} isOpen={isOpen} onOpenChange={onOpenChange}>
            <CartProductQuantityContoller quantity={quantity} setQuantity={setQuantity} price={cartInfo.price} />
        </AppPromptModal>
    );
};

export default CartProductQuantityModal;