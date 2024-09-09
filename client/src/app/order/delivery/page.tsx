import OrderDeliveryForm from "@/(FSD)/features/order/ui/OrderDeliveryForm";
import AppFixedTopBar from "@/(FSD)/widgets/app/ui/AppFixedTopBar";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import AppTitleHeader from "@/(FSD)/widgets/app/ui/AppTitleHeader";
import React from "react";

const Page = () => {
    return (
        <>
            <AppFixedTopBar>
                <AppTitleHeader title={"배송지 입력하기"} />
            </AppFixedTopBar>
            <AppSection>
                <AppInner>
                    <OrderDeliveryForm />
                </AppInner>
            </AppSection>
        </>
    );
};

export default Page;