export interface ProductType {
    productId: number;
    brandName: string;
    name: string;
    category: "상의" | "하의" | "아우터";
    categorySub: "반팔" | "긴팔" | "청바지" | "반바지" | "면" | "나일론" | "후드집업" | "코트" | "바람막이" | "패딩" | "자켓";
    price: number;
    priceSale: number;
    sale: boolean;
    productOptionId: number;
    like: boolean;
    productState: string;
    productImage: string | null;
    color?: string;
    // likeIndex: number;
    // starAvg: number;
}