import styles from "./section.module.css";
import Bulletin from "../bulletin/bulletin";
import { sectionProps } from "./section.data";

export default function Section(section: sectionProps): React.ReactElement {
    return (
      <>
        {
          section.sectionTitle &&
          <div className={styles.section}>
            <h3 className={styles.title}>{section.sectionTitle}</h3>
          </div>
        }
        {
          section.bulletins !== undefined && section.bulletins.map((bulletin, index) => (
            <Bulletin key={index} title={bulletin.title} description={bulletin.description} graphics={bulletin.graphics} dates={bulletin.dates} bullets={bulletin.bullets}></Bulletin>
          ))
        }
      </>
    );
}

