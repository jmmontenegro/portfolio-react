"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "./dialog.module.css";
import dialogData from "./dialog.data";
import { GetButtonColors, GetSettingsContext } from "../settings/settings";

export function Dialog({ data, isOpen, onClose } : { data:dialogData, isOpen:boolean, onClose: () => void }) {

  const selectedTheme = GetSettingsContext().selectedTheme;
  const dialogBoxColor = (selectedTheme === "Light" || selectedTheme === "Luz") ? "white" : "";
  const border = (selectedTheme === "Light" || selectedTheme === "Luz") ? "1px solid black" : "";
  return (
    isOpen && (
      <div className={styles.dialogBoxShadow}>
        <div className={styles.dialogBox} style={{backgroundColor: dialogBoxColor}}>
          <div className={styles.dialogTitle}>{data.title}</div>
          <div className={styles.dialogClose} style={{border: border}} onClick={onClose}>
            <FontAwesomeIcon icon={faClose} />
          </div>
          <div className={styles.dialogContent}>{data.content}</div>
        </div>
      </div>
    )
  );
}

export function DialogButton({ data, onOpen } : { data:dialogData, onOpen:() => void }) {
  return (
    <a className={styles.dialogButton} style={GetButtonColors()} onClick={onOpen}>
      { data.buttonIcon && <FontAwesomeIcon className={styles.rotateIcon} icon={data.buttonIcon} size={data.iconSize}/> }
    </a>
  );
}

export function UseDialog(onClose: () => void) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return {
    isOpen,
    handleOpen,
    handleClose
  };
}

export function GetDialog({ data, dialog }: { data:dialogData, dialog: ReturnType<typeof UseDialog> }): React.ReactElement {
  return (
    <>
      <Dialog data={data} isOpen={dialog.isOpen} onClose={dialog.handleClose}/>
      <DialogButton data={data} onOpen={dialog.handleOpen}/>
    </>
  );
}

export function getDefaultDialogData(): dialogData {
  let data: dialogData = {title:"", content: <></>, buttonIcon: undefined, iconSize: "1x"};
  return data;
}