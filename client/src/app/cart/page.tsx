import React from "react";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import CartProductInfoList from "@/(FSD)/widgets/cart/ui/CartProductInfoList";
import CartProductAllSelectBox from "@/(FSD)/features/cart/ui/CartProductAllSelectBox";

const Page = () => {
    return (
        <AppSection isBgColor={true}>
            <CartProductAllSelectBox />
            <CartProductInfoList />
        </AppSection>
    );
};

export default Page;