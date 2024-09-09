import React from "react";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import OrderProductInfoList from "@/(FSD)/widgets/order/ui/OrderProductInfoList";
import OrderDeliveryContainer from "@/(FSD)/widgets/order/ui/OrderDeliveryContainer";
import AppFixedBtmBar from "@/(FSD)/widgets/app/ui/AppFixedBtmBar";
import OrderBtnBar from "@/(FSD)/widgets/order/ui/OrderBtnBar";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";

const Page = () => {
    return (
        <>
            <AppFixedTopBar>
                <AppTitleHeader title={"결제하기"} />
            </AppFixedTopBar>
            <AppSection isBgColor={true}>
                <OrderDeliveryContainer />
                <OrderProductInfoList />
            </AppSection>
            <AppFixedBtmBar>
                <OrderBtnBar />
            </AppFixedBtmBar>
        </>
    );
};

export default Page;