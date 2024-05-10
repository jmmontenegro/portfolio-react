import { ReactElement, useEffect, useState } from "react";

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

const MovingDiv = ({ id, x, y, dx, dy, onRemove }) => {
    const [position, setPosition] = useState({ x, y });

    useEffect(() => {
        const interval = setInterval(() => {
            const newPosition = {
                x: position.x + dx * Math.max(5, Math.random() * 40), // Adjust speed as needed
                y: position.y + dy * Math.max(5, Math.random() * 40)
            };

            setPosition(newPosition);

            // Check if the div is outside the viewport
            if (newPosition.x < -100 || newPosition.x > window.innerWidth + 100 || newPosition.y < -100 || newPosition.y > window.innerHeight + 100) {
                clearInterval(interval);
                onRemove(id); // Remove the div
            }
        }, 20);

        return () => clearInterval(interval);
    }, [dx, dy, id, onRemove, position]);

    return (
        <div style={{ position: 'absolute', top: position.y, left: position.x, width: 50, height: 50, backgroundColor: 'rgb(92, 64, 51)', borderRadius: "50%" }} />
    );
};

export default function GetMeteors(): ReactElement {
    const [divs, setDivs] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const position = getRandomPosition();
            const direction = getRandomDirection();
            setDivs(prevDivs => [...prevDivs, { id: Math.random(), ...position, ...direction }]);
        }, 80);

        return () => clearInterval(interval);
    }, []);

    const handleRemove = (id) => {
        setDivs(prevDivs => prevDivs.filter(div => div.id !== id));
    };

    return (
        <div>
            {divs.map((props) => (
                <MovingDiv key={props.id} {...props} onRemove={handleRemove} />
            ))}
        </div>
    );
}
