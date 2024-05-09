"use client";

import { faClose, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement, useState } from "react";
import styles from "./dialog.module.css";
import dialogData from "./dialog.data";

export default function GetDialog(data: dialogData): ReactElement {

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
          <div className={styles.dialogBoxShadow}>
            <div className={styles.dialogBox}>
              <div className={styles.dialogTitle}>{data.title}</div>
              <div className={styles.dialogClose}>
                <FontAwesomeIcon icon={faClose} className={styles.dialogCloseIcon} onClick={handleClose}/>
              </div>
              <div className={styles.dialogContent}>{data.content}</div>
            </div>
          </div>
        )}
        <a className={styles.dialogButton} onClick={handleClick}>
          <FontAwesomeIcon className={styles.rotateIcon} icon={data.buttonIcon} size={data.iconSize}/>
        </a>
    </div>
    );
  }