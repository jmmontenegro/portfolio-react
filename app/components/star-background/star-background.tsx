"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import throttle from 'lodash/throttle';

export default function StarBackground() {
    const [stars, setStars] = useState<{ top: number; left: number; scale: number }[]>(() => 
        Array(200).fill(null).map(_ => {
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const scale = 0;
            return { top, left, scale };
        })
    );
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const workerRef = useRef<Worker | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const moveHandler = useCallback(throttle((e: MouseEvent | TouchEvent) => {
        if ('touches' in e) {
            // This is a touch event
            mousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else {
            // This is a mouse event
            mousePositionRef.current = { x: e.clientX, y: e.clientY };
        }
    }, 100), []);

    useEffect(() => {
        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('touchmove', moveHandler);
        return () => {
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('touchmove', moveHandler);
        };
    }, [moveHandler]);

    useEffect(() => {
        if (!workerRef.current) {
            workerRef.current = new Worker(new URL('star-worker.worker.js', import.meta.url));

            workerRef.current.onmessage = function(event) {
                setStars(event.data);
            };
        }

        workerRef.current.postMessage({ 
            stars, 
            mousePosition: mousePositionRef.current, 
            windowDimensions: { width: window.innerWidth, height: window.innerHeight } 
        });
    }, [stars]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                stars.forEach((star) => {
                    ctx.beginPath();
                    ctx.arc(star.left / 100 * canvas.width, star.top / 100 * canvas.height, star.scale, 0, 2 * Math.PI);
                    ctx.fillStyle = 'white';
                    ctx.fill();
                });
            }
        }
    }, [stars]);

    const resizeHandler = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }, []);

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        resizeHandler(); // Call the resize handler on startup
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, [resizeHandler]);

    return (
        <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0 }} />
    );
};
