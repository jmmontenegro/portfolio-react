"use client";
import React, { ReactElement, useEffect, useState, useRef } from 'react';
import styles from './starry-background.module.css';
import styled from 'styled-components';
import throttle from 'lodash/throttle';

const Star: React.FC<{ scale: number, top: number, left: number }>  = styled.div`
  position: absolute;
  width: ${props => props.scale}px;
  height: ${props => props.scale}px;
  background-color: white;
  border-radius: 50%;
  top: ${props => props.top}%;
  left: ${props => props.left}%;

  transition: transform 0.2s;

  &:hover {
    transform: scale(${props => props.scale});
  }
`;

export default function StarBackground(): ReactElement {

    const [mousePosition, setMousePosition] = useState( {x: 0, y: 0});
    const [stars, setStars] = useState<{ top: number; left: number; }[]>([]);
    const frame = useRef(0);

    const moveHandler = throttle((e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    }, 100);

    useEffect(() => {
        window.addEventListener('mousemove', moveHandler);
        return () => {
            window.removeEventListener('mousemove', moveHandler);
        };
    }, []);

    useEffect(() => {
        const starPositions = Array(50).fill(null).map((_, index) => {
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            return { top, left };
        });
        setStars(starPositions);
    }, []);

    const starElements = stars.map((star, index) => {
        const starPosition = { x: window.innerWidth * star.left / 100, y: window.innerHeight * star.top / 100 };
        const distanceSquared = mousePosition.x && mousePosition.y ? Math.pow(starPosition.y - mousePosition.y, 2) + Math.pow(starPosition.x - mousePosition.x, 2) : 1;
        const scale = distanceSquared > 0 ? Math.min(6, 50000 / distanceSquared) :  (2 + Math.random()) * 2;
        return (
            <Star key={index} scale={scale} top={star.top} left={star.left} />
        );
    });

    return (
        <div className={styles.starBackground}>
            {starElements}
        </div>
    );
};
