export interface OrderInfoType {
    orderId: number;
    productId: number;
    productOptionId: number;
    orderDate: string;
    brandName: string;
    productName: string;
    carrierId: string;
    trackingNumber: string;
    customerName: string;
    address: string;
    size: string;
    color: string;
    status: string;
    amount: number;
    quantity: number;
    review?: boolean
    reviewId?: number;
    productImage: string;
}
