"use client";

import { OrderProductReqState } from "@/(FSD)/shareds/stores/OrderProductAtom";
import { OrderProductInfoReadType } from "@/(FSD)/shareds/types/orders/OrderProductInfoRead.type";
import { OrderProductPaymentsRequest } from "@/(FSD)/shareds/types/orders/OrderProductPaymentsRequest.type";
import { Button, ButtonProps } from "@nextui-org/button";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useRecoilValue } from "recoil";
import { useOrderProductPayments } from "../api/useOrderProductPayments";
import { useOrderConfirmPayment } from "../api/useOrderConfirmPayment";
import { useRouter } from "next/navigation";

interface OrderPaymentBtnProps extends ButtonProps {
    orderProductInfoList: OrderProductInfoReadType[];
}

interface Amount {
    value: number;
    currency: string;
}

interface PaymentRequest {
    amount: Amount;
    orderName: string;
    orderId: string;
    customerName?: string;
    customerEmail?: string;
    customerMobilePhone?: string;
    taxFreeAmount?: number;
    windowTarget?: 'iframe' | 'self';
    metadata?: Record<string | symbol | number, unknown> | null;
}

interface CardPaymentRequest extends PaymentRequest {
    method: 'CARD';
    card?: {
        useEscrow?: boolean;
        taxExemptionAmount?: number;
        flowMode?: 'DIRECT' | 'DEFAULT';
        cardCompany?: string;
        easyPay?: string;
        cardInstallmentPlan?: number;
        maxCardInstallmentPlan?: number;
        freeInstallmentPlans?: Array<{
            company: string;
            months: number[];
        }>;
        useCardPoint?: boolean;
        useAppCardOnly?: boolean;
        discountCode?: string;
        validHours?: number;
        dueDate?: string;
        escrowProducts?: Array<{
            id?: string;
            name?: string;
            code?: string;
            unitPrice?: number;
            quantity?: number;
        }>;
    };
}

const OrderPaymentBtn = ({ orderProductInfoList }: OrderPaymentBtnProps) => {
    const orderProductReq = useRecoilValue(OrderProductReqState);

    const router = useRouter();

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

    const totalPrice = orderProductInfoList.reduce((accumulator, product) => accumulator + product.price * product.quantity, 0);

    const onSuccess = (data: any) => {
        router.push("/complete");
    };

    const { mutate } = useOrderProductPayments({ onSuccess });

    const handleClick = async () => {
        console.log(orderProductReq);
        const customerKey = generateCustomerKey();

        const tossPayments = await loadTossPayments(process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_SECRET_KEY!);

        const payment = tossPayments.payment({ customerKey: customerKey });

        const paymentRequest: CardPaymentRequest = {
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
        };

        const processPayment = async (paymentRequest: CardPaymentRequest, totalPrice: number, orderId: string) => {
            try {
                // 결제 요청 처리
                const result = await payment.requestPayment(paymentRequest);

                // 결제 요청 성공 시
                if (result.amount.value === totalPrice && result.orderId === orderId) {
                    // 결제 승인 요청
                    const confirmResult = await useOrderConfirmPayment({
                        amount: totalPrice,
                        orderId: orderId,
                        paymentKey: result.paymentKey
                    });

                    // 결제 승인 성공 시
                    if (confirmResult.success) {
                        const orderProductPaymentsRequestList: OrderProductPaymentsRequest[] =
                            orderProductInfoList.map(orderProductInfo => ({
                                orderPayId: orderId,
                                productOptionId: orderProductInfo.productOptionId,
                                req: orderProductReq,
                                quantity: orderProductInfo.quantity,
                                amount: orderProductInfo.price,
                                paymentKey: confirmResult.data.paymentKey
                            }));
                            console.log("req",orderProductReq)

                        mutate(orderProductPaymentsRequestList);
                    } else {
                        console.error('결제 승인 실패:', confirmResult.message);
                    }
                } else {
                    console.error('결제 요청 결과가 예상과 다릅니다.');
                }
            } catch (error) {
                console.error('결제 처리 오류:', error);
            }
        };
        processPayment(paymentRequest, totalPrice, orderId);
    };

    return (
        <Button onClick={handleClick} className={"text-background bg-foreground"} radius={"sm"} size={"lg"} fullWidth color={"primary"}>
            {totalPrice.toLocaleString()}원 결제하기
        </Button>
    );
};

export default OrderPaymentBtn;