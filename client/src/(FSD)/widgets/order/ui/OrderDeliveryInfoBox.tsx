import React from "react";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import { OrderDeliveryInfoType } from "@/(FSD)/shareds/types/orders/OrderDeliveryInfo.type";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { Button } from "@nextui-org/button";
import LinkBtnShared from "@/(FSD)/shareds/ui/LinkBtnShared";
import OrderReqForm from "@/(FSD)/features/order/ui/OrderReqForm";

interface OrderDeliveryInfoBoxProps {
    orderDeliveryInfo?: OrderDeliveryInfoType;
}

const OrderDeliveryInfoBox = ({ orderDeliveryInfo }: OrderDeliveryInfoBoxProps) => {
    return (
        <div className={styles.order_delivery_default_box}>
            <div className={styles.top_item}>
                <TextMediumShared fontWeight={"semibold"}>기본 배송지</TextMediumShared>
                {orderDeliveryInfo && <LinkBtnShared onClick={_ => { }} variant={"bordered"} size={"sm"} href={"/order/delivery"}>변경하기</LinkBtnShared>}
            </div>
            <div className={styles.btm_item}>
                {
                    orderDeliveryInfo && <>
                        <TextSmallShared>{JSON.parse(orderDeliveryInfo?.address || "{}")?.address || ""} {JSON.parse(orderDeliveryInfo?.address || "{}")?.detailAddress || ""}</TextSmallShared>
                        <TextSmallShared>{orderDeliveryInfo.phoneNumber}</TextSmallShared>
                    </>
                }
                {
                    !orderDeliveryInfo && <>
                        <TextSmallShared>배송지가 등록되지 않았습니다.</TextSmallShared>
                        <LinkBtnShared size={"sm"} variant={"solid"} href={"/order/delivery"}>배송지 등록하기</LinkBtnShared>
                    </>
                }
            </div>
            <OrderReqForm />
        </div>
    );
};

export default React.memo(OrderDeliveryInfoBox);