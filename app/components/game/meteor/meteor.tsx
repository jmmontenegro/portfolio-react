import { ReactElement, useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../settings/settings";
import MouseFollower from "../mouse-follower/mouse-follower";

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

// Function to generate a random direction
const getRandomDirection = () => {
    const angle = Math.random() * 2 * Math.PI; // Random angle in radians
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    return { dx, dy };
};

const MovingDiv = ({ id, x, y, dx, dy, onRemove } : { id: number, x: number, y: number, dx: number, dy: number, onRemove: (id: number) => void }) => {
    const [position, setPosition] = useState({ x, y });
    const { setGameState } = useContext(SettingsContext);

    useEffect(() => {
        const interval = setInterval(() => {
            const newPosition = {
                x: position.x + dx * Math.max(5, Math.random() * 10), // Adjust speed as needed
                y: position.y + dy * Math.max(5, Math.random() * 10)
            };

            setPosition(newPosition);

            // Check if the div is outside the viewport
            if (newPosition.x < -100 || newPosition.x > window.innerWidth + 100 || newPosition.y < -100 || newPosition.y > window.innerHeight + 100) {
                clearInterval(interval);
                onRemove(id); // Remove the div
            }
        }, 30);

        return () => clearInterval(interval);
    }, [dx, dy, id, onRemove, position]);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            // Check if the mouse position matches the div's position
            if (Math.abs(mouseX - position.x) < 50 && Math.abs(mouseY - position.y) < 50) {
                setGameState();
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [position, setGameState]);

    return (
        <div style={{ position: 'absolute', top: position.y, left: position.x, width: 50, height: 50, backgroundColor: 'rgb(60, 60, 60)' }} />
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

    useEffect(() => {
        const interval = setInterval(() => {
            const position = getRandomPosition();
            const direction = getRandomDirection();
            setDivs(prevDivs => [...prevDivs, { id: Math.random(), ...position, ...direction }]);

            setIntervalTime(prevTime => Math.max(50, prevTime - 5));
        }, intervalTime);

        return () => clearInterval(interval);
    }, [intervalTime]); // Add intervalTime as a dependency

    const handleRemove = (id:number) => {
        setDivs(prevDivs => prevDivs.filter(div => div.id !== id));
    };

    return (
        <div>
            {divs.map((props) => (
                <MovingDiv key={props.id} {...props} onRemove={handleRemove} />
            ))}
            <MouseFollower divs={divs} />
        </div>
    );
}
