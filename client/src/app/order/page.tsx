import React from "react";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import OrderProductInfoList from "@/(FSD)/widgets/order/ui/OrderProductInfoList";
import OrderDeliveryContainer from "@/(FSD)/widgets/order/ui/OrderDeliveryContainer";

const Page = () => {
    return (
        <AppSection isBgColor={true}>
            <OrderDeliveryContainer />
            <OrderProductInfoList />
        </AppSection>
    );
};

export default Page;