import { StaticImageData } from "next/image";

export interface bulletPoints {
    main: string;
    keyPoints: string[];
}

export interface bulletinProps {
    title: string;
    description?: string | string[];
    bullets?: bulletPoints[];
    dates?: string;
    graphics?: StaticImageData[];
};