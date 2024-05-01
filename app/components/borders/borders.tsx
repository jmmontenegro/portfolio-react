import { ReactElement } from "react";
import styles from "./borders.module.css";

export default function Borders({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>): ReactElement {
    return (
        <div className={styles.borders}>
          <h3 className={styles.title}>{children}</h3>
        </div>
    );
}

