import IconShared from "@/(FSD)/shareds/ui/IconShared";
import LinkBtnShared from "@/(FSD)/shareds/ui/LinkBtnShared";
import AppFixedBtmBar from "@/(FSD)/widgets/app/ui/AppFixedBtmBar";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";
import CartBtnBar from "@/(FSD)/widgets/cart/ui/CartBtnBar";
import React from "react";

const Layout = ({ children, }: { children: React.ReactNode }) => {
    return (
        <>
            <AppFixedTopBar>
                <AppTitleHeader title={"장바구니"} buttons={<LinkBtnShared href={"/"} size={"sm"} isIconOnly endContent={<IconShared iconSize={"md"} iconType={"home"} />} />} />
            </AppFixedTopBar>
            {children}
            <AppFixedBtmBar>
                <CartBtnBar />
            </AppFixedBtmBar>
        </>
    );
};

export default Layout;