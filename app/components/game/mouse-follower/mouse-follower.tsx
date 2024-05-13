"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import rocket from "../../../resources/rocket.png";
import Image from "next/image";
import throttle from "lodash/throttle"; // Make sure to install lodash and import throttle

export default function MouseFollower(): React.ReactElement {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const targetPosition = useRef({ x: 0, y: 0 });
    const targetRotation = useRef(0);

    const lerp = (start: number, end: number, t: number) => {
        return start * (1 - t) + end * t;
    };

    const throttledHandler = useCallback(throttle((clientX: number, clientY: number) => {
        const newPosition = { x: clientX, y: clientY };
        const dx = newPosition.x - position.x;
        const dy = newPosition.y - position.y;
        let newAngle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
    
        if (Math.abs(newAngle - rotation) > 180) {
            newAngle = newAngle > rotation ? newAngle - 360 : newAngle + 360;
        }
    
        targetPosition.current = newPosition;
        targetRotation.current = newAngle;
    }), [position, rotation]);
    
    const handleMouseMove = (event: React.MouseEvent) => {
        throttledHandler(event.clientX, event.clientY);
    };
    
    const handleTouchMove = (event: React.TouchEvent) => {
        event.preventDefault();
        throttledHandler(event.touches[0].clientX, event.touches[0].clientY);
    };

    useEffect(() => {
        const animate = () => {
            setPosition(prevPosition => ({
                x: lerp(prevPosition.x, targetPosition.current.x, 0.1),
                y: lerp(prevPosition.y, targetPosition.current.y, 0.1)
            }));
            setRotation(prevRotation => lerp(prevRotation, targetRotation.current, 0.2));
            requestAnimationFrame(animate);
        };
        animate();
    }, []);

    const imageWidth = 50;
    const imageHeight = 50;

    return (
        <div style={{ cursor: 'none', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, touchAction: 'none' }} onMouseMove={handleMouseMove} onTouchMove={handleTouchMove}>
            <Image src={rocket} alt={''} height={imageHeight} width={imageWidth} style={{ position: 'fixed', top: position.y - imageHeight / 2, left: position.x - imageWidth / 2, transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}/>
        </div>
    );
};