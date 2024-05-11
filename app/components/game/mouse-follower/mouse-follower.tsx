"use client";

import React, { ReactElement, useRef, useState } from "react";
import rocket from "../../../resources/rocket.png";
import Image from "next/image";
import { throttle } from "lodash";

export default function MouseFollower(divs:any): ReactElement {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const prevPosition = useRef({ x: 0, y: 0 });

    const handleMouseMove = throttle((event:MouseEvent) => {
        const newPosition = {
            x: event.clientX,
            y: event.clientY
        };

        // Calculate the angle of rotation
        const dx = newPosition.x - prevPosition.current.x;
        const dy = newPosition.y - prevPosition.current.y;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90; // Add 90 to rotate the image so that the top points towards the cursor

        // Update the state
        setPosition(newPosition);
        setRotation(angle);

        // Store the current position for the next mouse move event
        prevPosition.current = newPosition;
    }, 50); // Adjust this value as needed

    const imageWidth = 50;
    const imageHeight = 50;

    return (
        <div style={{ cursor: 'none', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }} onMouseMove={handleMouseMove}>
            <Image src={rocket} alt={''} height={imageHeight} width={imageWidth} style={{ position: 'fixed', top: position.y - imageHeight / 2, left: position.x - imageWidth / 2, transform: `rotate(${rotation}deg)`, transformOrigin: 'center top' }}/>
        </div>
    );
};