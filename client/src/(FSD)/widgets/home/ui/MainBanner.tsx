"use client";

import React from "react";
import styles from "@/(FSD)/shareds/styles/MainStyle.module.scss";
import Slider from "react-slick";
import banner1 from "../../../../../../model/1.webp";
import banner2 from "../../../../../../model/2.webp";
import banner3 from "../../../../../../model/3.webp";
import banner4 from "../../../../../../model/2426566_1_big.webp";


const MainBanner = () => {
    const settings = {
        dots: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 4000,
        arrows: false,
    };

    return (
        <div className={`${styles.content} ${styles.banner}`}>
            <Slider {...settings}>
                <img src={banner1.src} className={styles.bannerImage} />
                <img src={banner2.src} className={styles.bannerImage} />
                <img src={banner3.src} className={styles.bannerImage} />
                <img src={banner4.src} className={styles.bannerImage} />
            </Slider>
        </div>
    );
};

export default MainBanner;