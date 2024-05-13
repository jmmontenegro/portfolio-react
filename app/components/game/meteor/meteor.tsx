"use client";

import { ReactElement, useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../settings/settings";
import MouseFollower from "../mouse-follower/mouse-follower";
import Image from "next/image";
import meteor from "../../../resources/meteor.png";

// Function to generate a random position outside the window
const getRandomPosition = () => {
    let x, y;

    // Randomly decide whether the div starts from the top/bottom or left/right
    if (Math.random() < 0.5) {
        // Start from top/bottom
        x = Math.random() * window.innerWidth;
        y = Math.random() < 0.5 ? 0 : window.innerHeight ;
    } else {
        // Start from left/right
        x = Math.random() < 0.5 ? 0 : window.innerWidth ;
        y = Math.random() * window.innerHeight;
    }

    return { x, y };
};

// Function to generate a direction towards the center of the screen
const getDirectionToCenter = (x: number, y: number) => {
    const dx = (window.innerWidth / 2 - x) / window.innerWidth;
    const dy = (window.innerHeight / 2 - y) / window.innerHeight;
    return { dx, dy };
};

const MovingDiv = ({ id, x, y, dx, dy, onRemove, mousePosition } : { id: number, x: number, y: number, dx: number, dy: number, onRemove: (id: number) => void, mousePosition: { x: number, y: number } }) => {
    const [position, setPosition] = useState({ x, y });
    const { setGameState } = useContext(SettingsContext);

    useEffect(() => {
        const interval = setInterval(() => {
            const newPosition = {
                x: position.x + dx * (5 + Math.random() * 10), // Adjust speed as needed
                y: position.y + dy * (5 + Math.random() * 10)
            };

            setPosition(newPosition);

            // Check if the div is outside the viewport
            if (newPosition.x < -100 || newPosition.x > window.innerWidth + 100 || newPosition.y < -100 || newPosition.y > window.innerHeight + 100) {
                clearInterval(interval);
                onRemove(id); // Remove the div
            }
        }, 10);

        return () => clearInterval(interval);
    }, [dx, dy, id, onRemove, position]);

    useEffect(() => {
        const handleCollision = () => {
            // Check if the mouse position is within the image bounds
            if (mousePosition.x >= position.x && mousePosition.x <= position.x + 60 &&
                mousePosition.y >= position.y && mousePosition.y <= position.y + 60) {
                setGameState();
            }
        };

        const interval = setInterval(handleCollision, 10);

        return () => clearInterval(interval);
    }, [mousePosition, position, setGameState]);

    return (
        <Image src={meteor} alt={""} style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            transform: `translate(${position.x}px, ${position.y}px)`, 
            width: 50, 
            height: 50 
        }}/>
    );
};

type Div = {
    id: number;
    x: number;
    y: number;
    dx: number;
    dy: number;
  };

export default function GetMeteors(): ReactElement {
    const [divs, setDivs] = useState<Div[]>([]);
    const [intervalTime, setIntervalTime] = useState(300); // Initialize interval time to 300
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                const position = getRandomPosition();
                const direction = getDirectionToCenter(position.x, position.y);
                setDivs(prevDivs => [...prevDivs, { id: Math.random(), ...position, ...direction }]);

                setIntervalTime(prevTime => Math.max(50, prevTime - 1));
            }, intervalTime);

            return () => clearInterval(interval);
        }, 4000); // delay of 5 seconds
        return () => clearTimeout(timeout);
    }, [intervalTime]); // Add intervalTime as a dependency

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleRemove = (id:number) => {
        setDivs(prevDivs => prevDivs.filter(div => div.id !== id));
    };

    return (
        <div>
            {divs.map((props) => (
                <MovingDiv key={props.id} {...props} onRemove={handleRemove} mousePosition={mousePosition} />
            ))}
            <MouseFollower/>
        </div>
    );
}
