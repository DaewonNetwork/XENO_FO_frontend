"use client";

import React from "react";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { useRouter } from "next/navigation";
import { OrderProductInfoReadType } from "@/(FSD)/shareds/types/orders/OrderProductInfoRead.type";

interface OrderProductInfoProps {
    orderProductInfoRead: OrderProductInfoReadType;
};

const OrderProductInfo = ({ orderProductInfoRead }: OrderProductInfoProps) => {
    const router = useRouter();

    return (
        <div
            onClick={_ => {
                router.push(`/products/${orderProductInfoRead.productId}`);
            }}
            className={styles.order_product_info}
        >
            <div className={styles.info_image}>
                <img src={orderProductInfoRead.productImage} onClick={() => router.push(`/products/${orderProductInfoRead.productId}`)} style={{ cursor: "pointer" }} />
            </div>
            <div className={styles.info_text}>
                <div className={styles.text_top}>
                    <TextSmallShared fontWeight={"semibold"}>{orderProductInfoRead.productName} ({orderProductInfoRead.color})</TextSmallShared>
                    <TextSmallShared className={"text-foreground-500"}>수량 {orderProductInfoRead.quantity.toLocaleString()}개</TextSmallShared>
                    <TextSmallShared className={"text-foreground-500"}>사이즈 {orderProductInfoRead.size}</TextSmallShared>
                </div>
                <div className={styles.text_btm}>
                    <TextMediumShared fontWeight={"semibold"}>{(orderProductInfoRead.price * orderProductInfoRead.quantity).toLocaleString()}원</TextMediumShared>
                </div>
            </div>
        </div>
    );
};

export default OrderProductInfo;