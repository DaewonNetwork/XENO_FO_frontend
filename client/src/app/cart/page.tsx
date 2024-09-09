import React from "react";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import CartProductAllSelectBox from "@/(FSD)/features/cart/ui/CartProductAllSelectBox";
import CartProductInfoContainer from "@/(FSD)/widgets/cart/ui/CartProductInfoContainer";

const Page = () => {
    return (
        <AppSection isBgColor={true}>
            <CartProductAllSelectBox />
            <CartProductInfoContainer />
        </AppSection>
    );
};

export default Page;