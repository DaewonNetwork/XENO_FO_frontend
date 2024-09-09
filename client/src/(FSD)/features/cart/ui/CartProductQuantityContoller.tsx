import React from "react";
import { CartInfoType } from "@/(FSD)/shareds/types/CartInfo.type";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import IconBtnShared from "@/(FSD)/shareds/ui/IconBtnShared";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";

interface CartProductQuantityContollerProps {
    quantity: number;
    price: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

interface HandleClickType {
    type: "plus" | "minus";
}

const CartProductQuantityContoller = ({ price, quantity, setQuantity }: CartProductQuantityContollerProps) => {
    const handleClick = ({ type }: HandleClickType) => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;

        setQuantity(newQuantity > 1 ? newQuantity : 1);
    };

    return (
        <div className={`bg-default-100 rounded-small ${styles.cart_product_quantity_contoller}`}>
            <AppInner>
                <div className={styles.box_inner}>
                    <div className={styles.left_box}>
                        <IconBtnShared onClick={_ => {
                            handleClick({ type: "minus" });
                        }} variant={"solid"} radius={"none"} iconProps={{ iconType: "minus" }} />
                        <TextSmallShared className={`bg-default-200 ${styles.quantity_item}`}>{quantity}</TextSmallShared>
                        <IconBtnShared onClick={_ => {
                            handleClick({ type: "plus" });
                        }} variant={"solid"} radius={"none"} iconProps={{ iconType: "plus" }} />
                    </div>
                    <div className={styles.right_box}>
                        <TextMediumShared fontWeight={"semibold"}>{(quantity * price).toLocaleString()}원</TextMediumShared>
                    </div>
                </div>
            </AppInner>
        </div>
    );
};

export default CartProductQuantityContoller;