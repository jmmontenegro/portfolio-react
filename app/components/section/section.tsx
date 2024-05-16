import styles from "./section.module.css";
import Bulletin from "../bulletin/bulletin";
import { sectionProps } from "./section.data";
import { GetSection } from "../settings/settings";

export default function Section(section: sectionProps): React.ReactElement {

  const style = {
    borderTop: "",
    borderBottom: ""
  };
  const border = GetSection();
  style.borderTop = border;
  style.borderBottom = border;
  return (
    <>
      {
        section.sectionTitle &&
        <div className={styles.section} style={style}>
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

