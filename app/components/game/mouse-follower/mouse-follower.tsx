"use client";

import React, { ReactElement, useRef, useState, useEffect } from "react";
import rocket from "../../../resources/rocket.png";
import Image from "next/image";

export default function MouseFollower(): ReactElement {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const prevPosition = useRef({ x: 0, y: 0 });
    const prevRotation = useRef(0); // Define prevRotation using useRef

    const lerp = (start: number, end: number, t: number) => {
        return start * (1 - t) + end * t;
    };

    const handleMouseMove = (event:React.MouseEvent) => {
        const newPosition = {
            x: event.clientX,
            y: event.clientY
        };

        // Calculate the angle of rotation
        const dx = newPosition.x - prevPosition.current.x;
        const dy = newPosition.y - prevPosition.current.y;
        const newAngle = Math.atan2(dy, dx) * 180 / Math.PI + 90; // Add 90 to rotate the image so that the top points towards the cursor

        // Store the current position and rotation for the next mouse move event
        prevPosition.current = newPosition;
        prevRotation.current = newAngle;

        // Update the state with lerp
        setPosition(prevPosition => {
            const distance = Math.sqrt(Math.pow(newPosition.x - prevPosition.x, 2) + Math.pow(newPosition.y - prevPosition.y, 2));
            if (distance < 2) { // Adjust this value as needed
                return prevPosition;
            } else {
                return {
                    x: lerp(prevPosition.x, newPosition.x, 0.1),
                    y: lerp(prevPosition.y, newPosition.y, 0.1)
                };
            }
        });
        setRotation(prevRotation => lerp(newAngle, prevRotation, 0.1));
    };

    useEffect(() => {
        const animate = () => {
            setPosition(prevPosition => ({
                x: lerp(prevPosition.x, prevPosition.x, 0.1),
                y: lerp(prevPosition.y, prevPosition.y, 0.1)
            }));
            requestAnimationFrame(animate);
        };
        animate();
    }, []);

    const imageWidth = 50;
    const imageHeight = 50;

    return (
        <div style={{ cursor: 'none', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }} onMouseMove={handleMouseMove}>
            <Image src={rocket} alt={''} height={imageHeight} width={imageWidth} style={{ position: 'fixed', top: position.y - imageHeight / 2, left: position.x - imageWidth / 2, transform: `rotate(${rotation}deg)`, transformOrigin: 'center top' }}/>
        </div>
    );
};
