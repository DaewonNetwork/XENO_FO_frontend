"use client";

import React from "react";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { useRouter } from "next/navigation";
import { OrderProductInfoType } from "@/(FSD)/shareds/types/orders/OrderProductInfo.type";

interface OrderProductInfoProps {
    orderProductInfo: OrderProductInfoType;
};

const OrderProductInfo = ({ orderProductInfo }: OrderProductInfoProps) => {
    const router = useRouter();

    return (
        <div
            onClick={_ => {
                router.push(`/products/${orderProductInfo.productId}`);
            }}
            className={styles.order_product_info}
        >
            <div className={styles.info_image}>
                <img src={orderProductInfo.productImage} onClick={() => router.push(`/products/${orderProductInfo.productId}`)} style={{ cursor: "pointer" }} />
            </div>
            <div className={styles.info_text}>
                <div className={styles.text_top}>
                    <TextSmallShared fontWeight={"semibold"}>{orderProductInfo.productName} ({orderProductInfo.color})</TextSmallShared>
                    <TextSmallShared className={"text-foreground-500"}>수량 {orderProductInfo.quantity.toLocaleString()}개</TextSmallShared>
                    <TextSmallShared className={"text-foreground-500"}>사이즈 {orderProductInfo.size}</TextSmallShared>
                </div>
                <div className={styles.text_btm}>
                    <TextMediumShared fontWeight={"semibold"}>{orderProductInfo.price.toLocaleString()}원</TextMediumShared>
                </div>
            </div>
        </div>
    );
};

export default OrderProductInfo;