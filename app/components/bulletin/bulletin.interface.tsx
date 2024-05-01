import { StaticImageData } from "next/image";

export interface bulletinProps {
    title: string;
    description: string | string[];
    dates?: string;
    graphics?: StaticImageData[];
};