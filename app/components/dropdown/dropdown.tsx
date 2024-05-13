"use client";

import { useState } from "react";
import dropDownData from "./dropdown.data";
import styles from "./dropdown.module.css";

export function GetDropDownMenu(data: dropDownData): React.ReactElement {

    const [selectedOption, setSelectedOption] = useState('');
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
        data.onChange(event.target.value);
    };

    return (
        <div className={styles.dropdown}>
            {data.title}
            <select className={styles.options} value={selectedOption} onChange={handleChange}>
            {data.items.map((item, index) => (
                <option key={index}>{item}</option>
            ))}
            </select>
        </div>
    );
}