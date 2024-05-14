"use client";

import styles from "./page.module.css";
import Section from "./components/section/section";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faFileDownload }  from '@fortawesome/free-solid-svg-icons';
import StarBackground from "./components/star-background/star-background";
import { GetLanguage, GetSettings, GetSettingsContext, IsBackgroundEnabled } from "./components/settings/settings";
import GetMeteors from "./components/game/meteor/meteor";
import dialogData from "./components/dialog/dialog.data";
import { getDefaultDialogData, GetDialog, UseDialog } from "./components/dialog/dialog";

export default function Home(): React.ReactElement {

  const language = GetLanguage();
  const data: dialogData = getDefaultDialogData();
  const dialog = UseDialog(() => {}); 
  language.map(json => {
     data.title = json.dialogs.settings.title;
     data.content = <GetSettings dialog={dialog}/>;
     data.buttonIcon = faCog;
     data.iconSize = "3x";
 });

  return (
    <main className={styles.main}>
      <GetBackground/>
      <GetHTMLOnCondition/>
      <div className={styles.settingsButton}>
      <GetDialog data={data} dialog={dialog}/>
      </div>
    </main>
  );
}

function GetBackground(): React.ReactElement | boolean {
  return IsBackgroundEnabled() && <StarBackground/>;
}

function GetHeader(): React.ReactElement {
  const data = GetLanguage();

  return (
    <div className={styles.headerContainer}>
      {
        data.map((json, index) => (
          <div key={index} className={styles.header}>
            <h1 className={styles.title}>Jacob Montenegro</h1>
            <h2>{json.mainHeader.softwareDev}</h2>
            <a href="mailto:jacob.m.montenegro@gmail.com" className={styles.email}>jacob.m.montenegro@gmail.com</a>
          </div>
        ))
      }
    </div>
  );
}

function GetLine(): React.ReactElement {
  return (
    <div className={styles.line}/>
  );
}

function GetHTMLOnCondition(): React.ReactElement {
  const { isRunningGame } = GetSettingsContext();

  return (
    <>
    { 
      isRunningGame ? 
      <GetMeteors/>
      :
      <>
        <GetHeader/>
        <GetLine/>
        <div className={styles.resume}>
          <GetDownloadButton/>
          <GetSections/>
        </div>
        <GetLine/>
      </>
      }
    </>
  );
}

function GetDownloadButton(): React.ReactElement {
  const language = GetLanguage();
  let buttonText = '';
  language.map(json => 
    buttonText=json.downloadButton
  )
  return (
    <a className={styles.downloadButton} href={"Jacob_Montenegro_Resume.pdf"} download={"Jacob_Montenegro_Resume.pdf"}>
      <FontAwesomeIcon icon={faFileDownload} size={"2x"} width={40} height={40}></FontAwesomeIcon>
        <p>{buttonText}</p>
    </a>
  );
}

function GetSections(): React.ReactElement {
  const data = GetLanguage();

  return (
    <>
      {
        data.flatMap((json:any) => 
          Object.keys(json.sections).map((sectionKey:string, index) => {
            let section = json.sections[sectionKey];
            return <Section key={index} sectionTitle={section.sectionTitle} bulletins={section.bulletins}/>;
          })
        )
      }
    </>
  );
}

function setGameState() {
  throw new Error("Function not implemented.");
}
