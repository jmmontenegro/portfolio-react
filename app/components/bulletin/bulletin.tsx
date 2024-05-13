import styles from "./bulletin.module.css";
import { bulletPoints, bulletinProps } from "./bulletin.interface";
import Image, { StaticImageData } from "next/image";

export default function Bulletin(data:bulletinProps): React.ReactElement {
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
        data.description !== undefined ? 
          getBulletedDescription(data.description)
          :
          data.bullets !== undefined && getBulletedColumns(data.bullets)
      }
      { 
        getGraphics(data.graphics)
      } 
    </div>
  );
}

function getDescription(description: string): React.ReactElement {
  return (
    <p className={styles.description}>{description}</p>
  );
}

function getBulletedDescription(description: string[]): React.ReactElement {
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

function getBulletedColumns(bullets: bulletPoints[]): React.ReactElement | boolean {
  return (
    <div className={styles.bulletTitles}>
    {
      bullets.map((bullet, index) => (
        <div key={index}>
          <b className={styles.titles}>
          {bullet.main}
          </b>
          <div className={styles.bullets}>
          {
            bullets[index].keyPoints.map((skills, sIndex) => (
              <li className={styles.bulletSkills} key={sIndex}>{skills}</li>
            ))
          }
          </div>
        </div>
      ))
    }
    </div>
  );
}

function getGraphics(graphics:StaticImageData[] | undefined): React.ReactElement | undefined {
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
