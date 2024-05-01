import styles from "./bulletin.module.css";
import { bulletinProps } from "./bulletin.interface";
import { ReactElement } from "react";
import Image, { StaticImageData } from "next/image";

export default function Bulletin(data:bulletinProps): ReactElement {
   return (
    <div className={styles.container}>
      <div className={styles.title}>
        {data.title}
        <p>{data.dates}</p>   
      </div>
      {
      typeof data.description === 'string' ?
        getDescription(data.description) 
        :
        getBulletedDescription(data.description)
      }
      { 
        getGraphics(data.graphics)
      } 
    </div>
  );
}

function getDescription(description: string): ReactElement {
  return (
    <p className={styles.description}>{description}</p>
  );
}

function getBulletedDescription(description: string[]): ReactElement {
  return (
    <div className={styles.list}>
    {
      description.map((bullet, index) =>  (
        <li key={index}>
         {bullet}
        </li>
      ))
    } 
    </div>);
}

function getGraphics(graphics:StaticImageData[] | undefined): ReactElement | undefined {
  return graphics && (
    <div className={styles.gallery}>
    {
      graphics.map((graphic, index) => (
        <Image key={index} className={styles.graphic} src={graphic} alt={''} height={200} width={200}/>
      ))
    }
    </div>
  );
}
