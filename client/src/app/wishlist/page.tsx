import AppSection from "@/(FSD)/widgets/app/ui/AppSection";
import React from "react";
import ProductLikeList from "@/(FSD)/widgets/product/ui/ProductLikeList";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";

const Page = () => {
    return (
        <AppSection>
            <AppInner>
                <ProductLikeList />
            </AppInner>
        </AppSection>
    );
};

export default Page;