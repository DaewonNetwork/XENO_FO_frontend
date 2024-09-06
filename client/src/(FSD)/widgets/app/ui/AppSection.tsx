import React, { ReactNode } from "react";
import styles from "@/(FSD)/shareds/styles/ComponentStyle.module.scss";

interface AppSectionProps {
    children: ReactNode;
    isBgColor?: boolean;
    isPadTop?: boolean;
    isPadBtm?: boolean;
};

const AppSection = ({ isBgColor = false, isPadTop = true, isPadBtm = true, children }: AppSectionProps) => {
    return (
        <section data-slot={"section"} className={`${isBgColor ? "bg-content2" : ""} ${styles.section} ${isPadTop && styles.pad_top} ${isPadBtm && styles.pad_btm}`}>
            {children}
        </section>
    );
};

export default AppSection;