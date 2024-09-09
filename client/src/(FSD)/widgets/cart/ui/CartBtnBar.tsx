import React from "react";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import CartOderBtn from "@/(FSD)/features/cart/ui/CartOderBtn";

const CartBtnBar = () => {
    return (
        <div className={styles.cart_btn_bar}>
            <AppContainer>
                <AppInner>
                    <CartOderBtn />
                </AppInner>
            </AppContainer>
        </div>
    );
};

export default CartBtnBar;