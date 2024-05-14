"use client";

import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { GetLanguage, SettingsContext } from "../../settings/settings";
import MouseFollower from "../mouse-follower/mouse-follower";
import meteor from "../../../resources/meteor.png";
import { Dialog, UseDialog, getDefaultDialogData } from "../../dialog/dialog";

const getRandomPosition = () => {
    let x, y;

    if (Math.random() < 0.5) {
        x = Math.random() * window.innerWidth;
        y = Math.random() < 0.5 ? 0 : window.innerHeight ;
    } else {
        x = Math.random() < 0.5 ? 0 : window.innerWidth ;
        y = Math.random() * window.innerHeight;
    }

    return { x, y };
};

const getDirectionToCenter = (x: number, y: number) => {
    const dx = (window.innerWidth / 2 - x) / window.innerWidth;
    const dy = (window.innerHeight / 2 - y) / window.innerHeight;
    return { dx, dy };
};

export default function GetMeteors(): React.ReactElement {
    const [meteors, setMeteors] = useState<{ id: number; x: number; y: number; dx: number; dy: number }[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { setGameState } = useContext(SettingsContext);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imgSize:number = 50;
    const dialog = UseDialog(() => setGameState());
    const data = getDefaultDialogData();
    const [collisionDetected, setCollisionDetected] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [survivalTime, setSurvivalTime] = useState(0);
    const language = GetLanguage();

    language.map(json => {
        data.title = json.dialogs.game.title;
        data.content = <div>{json.dialogs.game.content.replace("{survivalTime}", survivalTime.toString())}</div>
    });

    const handleCollision = useCallback(() => {
        setCollisionDetected(true);
        dialog.handleOpen();
      }, [setCollisionDetected, dialog]);
      
    useEffect(() => {
        if (collisionDetected) {
            setSeconds(0);
        }
    }, [collisionDetected]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
      
        if (!collisionDetected && meteors.length > 0) {
          interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
          }, 1000);
        } else if (collisionDetected && interval) {
          clearInterval(interval);
        }
      
        return () => {
          if (interval) {
            clearInterval(interval);
          }
        };
      }, [collisionDetected, meteors]);   

    useEffect(() => {
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                const position = getRandomPosition();
                const direction = getDirectionToCenter(position.x, position.y);
                setMeteors(prevMeteors => [...prevMeteors, { id: Math.random(), ...position, ...direction }]);
            }, 300);

            const timer = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);

            return () => clearInterval(interval);
        }, 3000); // Delay of 3 seconds

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const img = new Image();
                img.src = meteor.src;
                const interval = setInterval(() => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    meteors.forEach((meteor) => {
                        meteor.x += meteor.dx * (1 + Math.random() * 10);
                        meteor.y += meteor.dy * (1 + Math.random() * 10);
    
                        // Check if the meteor is outside the viewport
                        if (meteor.x < -100 || meteor.x > window.innerWidth + 100 || meteor.y < -100 || meteor.y > window.innerHeight + 100) {
                            // Remove the meteor
                            setMeteors(prevMeteors => prevMeteors.filter(m => m.id !== meteor.id));
                        }
    
                        ctx.drawImage(img, meteor.x - imgSize, meteor.y - imgSize, imgSize, imgSize);
    
                        // Collision detection
                        if (Math.hypot(meteor.x - mousePosition.x, meteor.y - mousePosition.y) < imgSize) {
                            handleCollision();
                            setSurvivalTime(seconds);
                        }
                    });
                }); // Adjust this value to change the speed of the meteors
    
                return () => clearInterval(interval);
            }
        }
    }, [meteors, setGameState, mousePosition, handleCollision, seconds]);
    
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            { 
                !collisionDetected ? 
                <>
                    <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0 }} />
                    <MouseFollower/>
                </>
                :
                <Dialog data={data} isOpen={dialog.isOpen} onClose={dialog.handleClose}/> 
            }
        </>
    );
};
