"use client"


import { useRouter } from "next/navigation";

import { Button } from "@nextui-org/button";



const OrderInfoListBtn = () => {
    
    const router = useRouter();


    return (
        <div style={{marginBottom:"10px"}}>
            <Button onClick={() =>   router.push(`/mypage/orders`)} size={"sm"}   className="w-full h-[100px] bg-white border-2" radius="none" >주문 내역 확인하기</Button>
            
        </div>
    );
};

export default OrderInfoListBtn;