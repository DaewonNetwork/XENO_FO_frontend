"use client";

import React from "react";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import CartProductSelectBtn from "@/(FSD)/features/cart/ui/CartProductSelectBtn";
import CartProductDeleteBtn from "@/(FSD)/features/cart/ui/CartProductDeleteBtn";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import CartProductQuantityModal from "./CartProductQuantityModal";
import TextBoxShared from "@/(FSD)/shareds/ui/TextBoxShared";
import { CartInfoType } from "@/(FSD)/shareds/types/CartInfo.type";

interface CartProductInfoProps {
    cartInfo: CartInfoType;
}

const CartProductInfo = ({ cartInfo }: CartProductInfoProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div className={styles.cart_product_info}>
                <div className={styles.left_content}>
                    <CartProductSelectBtn isSelected={cartInfo.isSelected} cartIndex={cartInfo.cartIndex} />
                    <div className={styles.product_box}>
                        <div className={styles.product_image}>
                            <img src={cartInfo.productImage || ""} alt={cartInfo.productName} />
                        </div>
                        <div className={styles.product_content}>
                            <div className={styles.product_text}>
                                <TextBoxShared>
                                    <TextSmallShared fontWeight={"semibold"}>{cartInfo.productName} ({cartInfo.color})</TextSmallShared>
                                </TextBoxShared>
                                <TextSmallShared className={"text-foreground-500"}>{cartInfo.size} | {cartInfo.quantity}개</TextSmallShared>
                                <TextSmallShared fontWeight={"semibold"}>{(cartInfo.price * cartInfo.quantity).toLocaleString()}원</TextSmallShared>
                            </div>
                            <div className={styles.product_btn}>
                                <Button onClick={onOpen} variant={"ghost"} size={"sm"}>옵션 수정</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <CartProductDeleteBtn cartId={cartInfo.cartId} />
            </div>
            <CartProductQuantityModal cartInfo={cartInfo} isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    );
};

export default CartProductInfo;