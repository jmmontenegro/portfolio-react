"use client";

import React, { ReactElement, useState } from "react";
import gif from "../../resources/raycaster_demo1.gif";
import Image from "next/image";

export default function MouseFollower(): ReactElement {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event:MouseEvent) => {
        setPosition({
            x: event.clientX,
            y: event.clientY
        });
    };

    return (
        <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }} onMouseMove={handleMouseMove}>
            <Image src={gif} alt={''} height={50} width={50} style={{ position: 'fixed', top: position.y, left: position.x }}/>
        </div>
    );
};