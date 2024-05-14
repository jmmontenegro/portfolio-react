import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { ReactElement } from "react";

export default interface dialogData {
    title?: string;
    content: string | ReactElement;
    buttonIcon: IconProp | undefined;
    iconSize: SizeProp;
}