import React from "react";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import { useOrderDeliveryInfoRead } from "@/(FSD)/entities/order/api/useOrderDeliveryInfoRead";
import { OrderDeliveryInfoType } from "@/(FSD)/shareds/types/orders/OrderDeliveryInfo.type";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import OrderDeliveryChangeBtn from "@/(FSD)/features/order/ui/OrderDeliveryChangeBtn";

const OrderDeliveryDefaultBox = () => {
    const { data } = useOrderDeliveryInfoRead();

    const orderDeliveryInfo: OrderDeliveryInfoType = data;

    if(!orderDeliveryInfo) return <></>;

    return (
        <div className={styles.order_delivery_default_box}>
            <div className={styles.top_item}>
                <TextMediumShared fontWeight={"semibold"}>기본 배송지</TextMediumShared>
                <OrderDeliveryChangeBtn />
            </div>
            <div className={styles.btm_item}>
                <TextSmallShared>{JSON.parse(orderDeliveryInfo?.address || "{}")?.address || ""} {JSON.parse(orderDeliveryInfo?.address || "{}")?.detailAddress || ""}</TextSmallShared>
                <TextSmallShared>{orderDeliveryInfo.phoneNumber}</TextSmallShared>
                <TextSmallShared>{orderDeliveryInfo.req}</TextSmallShared>
            </div>
        </div>
    );
};

export default React.memo(OrderDeliveryDefaultBox);