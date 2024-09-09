import React, { ReactNode } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { useRouter } from "next/navigation";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import { ProductCardType } from "@/(FSD)/shareds/types/product/ProductCard.type";

interface ProductCardProps {
    product: ProductCardType;
    likeBtn: ReactNode;
    isRank?: boolean;
    rank?: number;
    isColor?: boolean;
}

const ProductCard = ({ product, likeBtn, isRank = false, rank = 0 , isColor = false}: ProductCardProps) => {

    const router = useRouter();

    const calculateDiscountPercent = (price: number, priceSale: number): number => {
        return Math.round(((price - priceSale) / price) * 100);
    };

    const discountPercent = calculateDiscountPercent(product.price, product.priceSale);

    return (
        <div 
        className={styles.product_card}
        onClick={_ => {
            router.push(`/products/${product.productId}`);
        }}
        >
            <div className={styles.card_top}>
                {isRank && <div className={`bg-content2 ${styles.product_rank}`}><TextSmallShared>{rank}</TextSmallShared></div>}
                {!product.productImage && <Skeleton className={styles.product_skeleton} />}
                {product.productImage &&
                    <img
                        src={product.productImage || ""}
                        className={styles.product_image}
                    />}
                {likeBtn && <div className={styles.product_like_btn}>{likeBtn}</div>}
            </div>
            <div className={styles.card_btm}>
                <TextSmallShared fontWeight={"medium"}>{product.brandName}</TextSmallShared>
                <TextSmallShared>{product.name} </TextSmallShared>
                <TextSmallShared>
                    {product.sale && (
                        <span className="text-primary">
                            {`${discountPercent}% `}
                        </span>
                    )}
                    {product.sale ? product.priceSale.toLocaleString() : product.price.toLocaleString()}원
                </TextSmallShared>
            </div>
        </div>
    )
}

export default ProductCard;