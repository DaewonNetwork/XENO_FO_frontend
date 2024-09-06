"use client"

import { Button } from "@nextui-org/button";

const OrderRefundInfoListBtn = () => {

    return (
        <div style={{ marginBottom: "10px" }}>
            <Button onClick={() => {
                window.location.href = '/mypage/orders/refund';
            }} size={"sm"} className="w-full h-[100px] bg-white border-2" radius="none" >환불 내역 확인하기</Button>

        </div>
    );
};

export default OrderRefundInfoListBtn;