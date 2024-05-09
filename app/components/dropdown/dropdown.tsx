import { ReactElement } from "react";
import dropDownData from "./dropdown.data";
import styles from "./dropdown.module.css";

export function getDropDownMenu(data: dropDownData): ReactElement {
    return (
        <div className={styles.dropdown}>
            {data.title}
            <select className={styles.options}>
            {data.items.map((item, index) => (
                <option key={index}>{item}</option>
            ))}
            </select>
        </div>
    );
}