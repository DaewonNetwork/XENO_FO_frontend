import React from "react";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";
import OrderRefundInfoList from "@/(FSD)/widgets/order/ui/OrderRefundInfoList";

const Page = () => {
    return (
        <>
            <AppFixedTopBar>
                <AppTitleHeader title={"환불 목록"} />
            </AppFixedTopBar>
            <AppSection>
                <AppInner>
                    <OrderRefundInfoList />
                </AppInner>
            </AppSection>
        </>
    );
};

export default Page;
