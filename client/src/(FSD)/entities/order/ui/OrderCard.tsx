import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { OrderInfoType } from "@/(FSD)/shareds/types/orders/OrderInfo.Type";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import { OrderProductInfoType } from "@/(FSD)/shareds/types/product/OrderProductInfo.type";
import OrderProductInfo from "./OrderProductInfo";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";

interface OrderCardProps {
    order: OrderInfoType;
}

const OrderCard = ({ order }: OrderCardProps) => {
    const router = useRouter();

    const orderProductInfo: OrderProductInfoType = {
        productId: order.productId,
        color: order.color,
        size: order.size,
        quantity: order.quantity,
        price: order.amount,
        name: order.productName,
        image: order.productImage
    };

    const getTrackingUrl = (carrierId: string) => {
        switch (carrierId) {
            case "kr.cjlogistics":
                return "http://nplus.doortodoor.co.kr/web/detail.jsp?slipno=";
            case "kr.cupost":
                return "https://www.cupost.co.kr/postbox/delivery/localResult.cupost?invoice_no=";
            case "kr.epost":
                return "https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?displayHeader=N&sid1=";
            case "kr.logen":
                return "https://www.ilogen.com/m/personal/trace/";
            case "kr.lotte":
                return "https://www.lotteglogis.com/mobile/reservation/tracking/linkView?InvNo=";
            case "kr.hanjin":
                return "https://www.hanjin.co.kr/kor/CMS/DeliveryMgr/WaybillResult.do?mCode=MN038&schLang=KR&wblnumText2=";
            default:
                return "https://www.defaulturl.com";
        }
    };

    // 배송 조회 URL 생성
    const trackingUrl = `${getTrackingUrl(order.carrierId)}${order.trackingNumber}`;

    const displayStatuses = ["배송 중", "배송 완료", "배송 준비 중", "출고 완료"];
    console.log(order);

    return (
        <div className={styles.order_card}>
            <div className={styles.card_header}>
                <TextLargeShared>{order.orderDate} {order.status} {order.customerName} {order.address} {displayStatuses.includes(order.status) && (
                        <Button
                            onClick={() => window.open(trackingUrl, '_blank')}
                        >
                            배송 조회
                        </Button>
                    )}
                </TextLargeShared>
                {order.status === "구매 확정" && (<Button size={"sm"} variant={"light"} onClick={() => !order.review
                    ? router.push(`/reviews/create/${order.orderId}`)
                    : router.push(`/reviews/info/${order.reviewId}`)}
                    radius="none">{!order.review ? (<TextSmallShared>리뷰 작성하기</TextSmallShared>) : (<TextSmallShared>리뷰 확인하기</TextSmallShared>)}</Button>)}

            </div>
            <div className={styles.card_body}>
                <OrderProductInfo product={orderProductInfo} />
            </div>
        </div>
    );
};

export default OrderCard;