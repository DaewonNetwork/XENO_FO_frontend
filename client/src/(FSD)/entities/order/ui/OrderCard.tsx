import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { OrderInfoType } from "@/(FSD)/shareds/types/orders/OrderInfo.Type";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";

import OrderProductInfo from "./OrderProductInfo";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import OrderShippingModal from "@/(FSD)/widgets/order/ui/OrderShippingModal";
import OrderCancelModal from "@/(FSD)/features/order/ui/OrderCancelModal";
import OrderRefundRequestModal from "@/(FSD)/features/order/ui/OrderRefundRequestModal";
import { OrderProductInfoType } from "@/(FSD)/shareds/types/orders/OrderProductInfotype";
import { OrderProductInfoReadType } from "@/(FSD)/shareds/types/orders/OrderProductInfoRead.type";
import { useOrderComplete } from "@/(FSD)/features/order/api/useOrderComplete";
import OrderCompleteModal from "@/(FSD)/features/order/ui/OrderCompleteModal";



interface OrderCardProps {
    order: OrderInfoType;
}

const OrderCard = ({ order }: OrderCardProps) => {
    const [isOrderShippingModalOpen, setIsOrderShippingModalOpen] = useState(false);

    const [isOrderCancelModalOpen, setIsOrderCancelModalOpen] = useState(false);

    const [isOrderRefundRequestModalOpen, setIsOrderRefundRequestModalOpen] = useState(false);

    const [isOrderCompleteModalOpen, setIsOrderCompleteModalOpen] = useState(false);



    // 모달 상태를 변경하는 핸들러
    const handleOpenChangeShippingModal = (isOpen: boolean) => {
        setIsOrderShippingModalOpen(isOpen);
    };

    const handleOpenChangeCancelodal = (isOpen: boolean) => {
        setIsOrderCancelModalOpen(isOpen);
    };

    const handleOpenChangeRefundlodal = (isOpen: boolean) => {
        setIsOrderRefundRequestModalOpen(isOpen);
    };

    const handleOpenChangeCompletelodal = (isOpen: boolean) => {
        setIsOrderCompleteModalOpen(isOpen);
    };


    const router = useRouter();

    const orderProductInfo: OrderProductInfoReadType = {
        productId: order.productId,
        productOptionId: order.productOptionId,
        color: order.color,
        size: order.size,
        quantity: order.quantity,
        price: order.amount,
        productName: order.productName,
        productImage: order.productImage
    };

    const displayStatuses = ["배송 중", "배송 완료", "배송 준비 중", "출고 완료", "구매 확정"];

    console.log(order);

    return (
        <div className={styles.order_card}>
            <div className={styles.card_header}>
                <TextLargeShared>{order.orderDate} {order.status} {order.customerName} {displayStatuses.includes(order.status) && (
                    <Button
                        onClick={() => setIsOrderShippingModalOpen(true)}
                        size={"md"} className="bg-white border-2" radius="none"
                    >
                        배송 조회
                    </Button>

                )}
                    {order.status === "배송 완료" && (
                        <Button
                            size={"md"} className="bg-white border-2" radius="none"
                            onClick={() => setIsOrderRefundRequestModalOpen(true)}

                        >
                            <TextSmallShared>환불 요청</TextSmallShared>
                        </Button>
                    )}
                </TextLargeShared>
                {order.status === "구매 확정" && (<Button size={"sm"} variant={"light"} onClick={() => !order.review
                    ? router.push(`/reviews/create/${order.orderId}`)
                    : router.push(`/reviews/info/${order.reviewId}`)}
                    radius="none">{!order.review ? (<TextSmallShared>리뷰 작성하기</TextSmallShared>) : (<TextSmallShared>리뷰 확인하기</TextSmallShared>)}</Button>)}
                {order.status === "결제 완료" && (
                    <Button
                        size={"sm"}
                        variant={"light"}
                        onClick={() => setIsOrderCancelModalOpen(true)}
                        radius="none"
                    >
                        <TextSmallShared>결제 취소하기</TextSmallShared>
                    </Button>
                )}
                {order.status === "배송 완료" && (
                    <Button
                        size={"sm"}
                        variant={"light"}
                        onClick={() => setIsOrderCompleteModalOpen(true)}
                        radius="none"
                    >
                        <TextSmallShared>구매 확정하기</TextSmallShared>
                    </Button>
                )}


            </div>
            <div className={styles.card_body}>
                <OrderProductInfo orderProductInfoRead={orderProductInfo} />
            </div>
            {isOrderShippingModalOpen && (
                <OrderShippingModal trackingNumber={order.trackingNumber} carrierId={order.carrierId} isOpen={isOrderShippingModalOpen}
                    onOpenChange={handleOpenChangeShippingModal} />
            )}

            {isOrderCancelModalOpen && (
                <OrderCancelModal orderId={order.orderId} isOpen={isOrderCancelModalOpen}
                    onOpenChange={handleOpenChangeCancelodal} />
            )}

            {isOrderRefundRequestModalOpen && (
                <OrderRefundRequestModal orderId={order.orderId} isOpen={isOrderRefundRequestModalOpen}
                    onOpenChange={handleOpenChangeRefundlodal} />
            )}

            {isOrderCompleteModalOpen && (
                <OrderCompleteModal orderId={order.orderId} isOpen={isOrderCompleteModalOpen}
                    onOpenChange={handleOpenChangeCompletelodal} />
            )}






        </div>
    );
};

export default OrderCard;