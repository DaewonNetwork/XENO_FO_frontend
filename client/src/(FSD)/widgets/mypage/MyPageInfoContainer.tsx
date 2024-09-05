import React from "react";

import AppInner from "../app/ui/AppInner";
import OrderInfoListBtn from "../order/ui/OrderInfoListBtn";
import OrderRefundInfoListBtn from "../order/ui/OrderRefundInfoListBtn";

const MyPageInfoContainer = () => {
    return (
        <AppInner>
            <OrderInfoListBtn />
            <OrderRefundInfoListBtn />
        </AppInner>
    );
};


export default MyPageInfoContainer;