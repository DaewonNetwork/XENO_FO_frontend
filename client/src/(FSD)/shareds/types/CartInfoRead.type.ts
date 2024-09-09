export interface CartInfoReadType {
    cartId: number;
    productOptionId: number;
    productId: number;
    quantity: number;
    brandName: string;
    productName: string;
    color: string;
    size: string;
    productImage: string | null;
    price: number;
    sale: boolean;
};