"use client";

import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement, useState } from "react";
import styles from "./dialog.module.css";

export default function GetSettingsButton(): ReactElement {

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleClick = () => {
      setDialogOpen(true);
    };
  
    const handleClose = () => {
      setDialogOpen(false);
    };

    return (
        <div>
        {isDialogOpen && (
          <div>
            <div>Dialog Box</div>
            <p>This is a dialog box.</p>
            <button onClick={handleClose}>Close</button>
          </div>
        )}
        <a className={styles.settingsButton} onClick={isDialogOpen ? handleClose : handleClick}>
          <FontAwesomeIcon className={styles.settingsCog} icon={faCog} size={"3x"}/>
          {/* <p>test</p> */}
        </a>
    </div>
    );
  }