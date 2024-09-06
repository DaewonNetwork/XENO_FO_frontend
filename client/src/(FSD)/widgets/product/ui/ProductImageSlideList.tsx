"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import style from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { Chip } from "@nextui-org/chip";
import TextXSmallShared from "@/(FSD)/shareds/ui/TextXSmallShared";

interface ProductImageSlideListProps {
    productImageList: string[];
}

const ProductImageSlideList = ({ productImageList }: ProductImageSlideListProps) => {
    if(!productImageList) return <></>;

    const productImgs = productImageList.filter(productImage => productImage);

    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const sliderSettings = {
        dots: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        infinite: false,
        afterChange: (current: number) => setCurrentSlide(current),
    };

    if(!productImageList.length) return <></>;

    return (
        <div className={style.product_image_slide_list}>
            <Slider {...sliderSettings}>
                {productImgs.map((image, index) => (
                    <React.Fragment key={index}>
                        <div className={style.product_image_item}>
                            <img
                                src={image}
                                alt={`product_image_${index + 1}`}
                            />
                        </div>
                    </React.Fragment>
                ))}
            </Slider>
            <div className={style.product_current_box}>
                <Chip className={`bg-default/80 ${style.product_current_item}`}><TextXSmallShared>{currentSlide + 1} / {productImgs.length}</TextXSmallShared></Chip>
            </div>
        </div>
    );
};

export default ProductImageSlideList;