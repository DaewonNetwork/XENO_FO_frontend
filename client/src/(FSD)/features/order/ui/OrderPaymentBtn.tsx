"use client";

import { OrderDeliveryFormIsValidState, OrderProductReqState } from "@/(FSD)/shareds/stores/OrderProductAtom";
import { OrderProductInfoReadType } from "@/(FSD)/shareds/types/orders/OrderProductInfoRead.type";
import { OrderProductPaymentsRequest } from "@/(FSD)/shareds/types/orders/OrderProductPaymentsRequest.type";
import { Button } from "@nextui-org/button";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useOrderProductPayments } from "../api/useOrderProductPayments";

interface OrderPaymentBtnProps {
    orderProductInfoList: OrderProductInfoReadType[];
}

const OrderPaymentBtn = ({ orderProductInfoList }: OrderPaymentBtnProps) => {
    const orderProductReq = useRecoilValue(OrderProductReqState);
    const orderDeliveryFormIsValid = useRecoilValue(OrderDeliveryFormIsValidState);


    const generateRandomId = () => {
        const length = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
        const array = new Uint8Array(length);
        window.crypto.getRandomValues(array);
        return Array.from(array, (byte) => ("0" + byte.toString(16)).slice(-2)).join("");
    };

    const generateRandomInt = (min: number, max: number): number => {
        const byteArray = new Uint32Array(1);
        window.crypto.getRandomValues(byteArray);
        const randomNum = byteArray[0] / (0xFFFFFFFF + 1);
        return Math.floor(randomNum * (max - min + 1)) + min;
    }

    const generateCustomerKey = (): string => {
        const chars = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CUSTOMER_KEY_SECRET_KEY!;

        let key = "";

        while (!/[\-_=.@]/.test(key) || !/[A-Z]/.test(key) || !/[a-z]/.test(key) || !/[0-9]/.test(key)) {
            key = "";
            for (let i = 0; i < 50; i++) {
                key += chars.charAt(generateRandomInt(0, chars.length - 1));
            }
        }
        return key;
    };

    const orderId = generateRandomId();

    const orderName: string =
        orderProductInfoList.length > 1
            ? `${orderProductInfoList[0]?.productName} 외 ${orderProductInfoList.length - 1}건`
            : orderProductInfoList[0]?.productName ?? "";


    const totalPrice = orderProductInfoList.reduce((accumulator, product) => accumulator + product.price, 0);

    const orderProductPaymentsRequestList: OrderProductPaymentsRequest[] = orderProductInfoList.map(orderProductInfo => ({
        orderPayId: orderId,
        productOptionId: orderProductInfo.productOptionId,
        req: orderProductReq,
        quantity: orderProductInfo.quantity,
        amount: orderProductInfo.price,
    }));

    const onSuccess = (data: any) => {
        console.log(data);
        
    };
    const { mutate } = useOrderProductPayments({ onSuccess });

    const handleClick = async () => {
        const customerKey = generateCustomerKey();

        const tossPayments = await loadTossPayments(process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_SECRET_KEY!);

        const payment = tossPayments.payment({ customerKey: customerKey });

        await payment.requestPayment({
            method: "CARD",
            amount: {
                currency: "KRW",
                value: totalPrice
            },
            orderId: orderId,
            orderName: orderName,
            customerEmail: "",
            card: {
                useEscrow: false,
                flowMode: "DEFAULT",
                useCardPoint: false,
                useAppCardOnly: false,
            },
        }).then(data => {
            console.log(data)
        }).catch((error: any) => {
            console.log("결제오류", error);
        });
    };

    useEffect(() => { }, [orderDeliveryFormIsValid]);

    return (
        <Button isDisabled={!orderDeliveryFormIsValid} onClick={handleClick} className={"text-background bg-foreground"} radius={"sm"} size={"lg"} fullWidth color={"primary"}>
            <label htmlFor={"order_delivery_submit_btn"}>
                {totalPrice.toLocaleString()}원 결제하기
            </label>
        </Button>
    );
};

export default OrderPaymentBtn;