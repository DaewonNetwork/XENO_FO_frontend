export interface ProductCardType {
    productId: number;
    productOptionId: number;
    name: string;
    brandName: string;
    productImage: string | null;
    price: number;
    priceSale: number;
    sale: boolean;
    like: boolean;
}