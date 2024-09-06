import React from "react";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import CartProductList from "@/(FSD)/entities/cart/ui/CartProductList";

const Page = () => {
    return (
        <AppSection isBgColor={true}>
            <CartProductList />
        </AppSection>
    );
};

export default Page;