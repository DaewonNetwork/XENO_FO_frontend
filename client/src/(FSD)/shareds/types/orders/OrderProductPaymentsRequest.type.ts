export interface OrderProductPaymentsRequest {
    orderPayId: string;
    productOptionId: number;
    req: string;
    quantity: number;
    amount: number;
}