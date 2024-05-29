"use client";

import styles from "./page.module.css";
import Section from "./components/section/section";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faFileDownload }  from '@fortawesome/free-solid-svg-icons';
import StarBackground from "./components/backgrounds/star-background/star-background";
import { GetBorder, GetButtonColors, GetLanguage, GetSettings, GetSettingsContext, GetTheme, IsBallEnabled, IsStarEnabled as IsStarsEnabled, SettingsContext } from "./components/settings/settings";
import GetMeteors from "./components/game/meteor/meteor";
import dialogData from "./components/dialog/dialog.data";
import { getDefaultDialogData, GetDialog, UseDialog } from "./components/dialog/dialog";
import { BallBackground } from "./components/backgrounds/ball/ball";

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

  const style = GetTheme();
  style.backgroundColor = style.backgroundColor === 'var(--burgundy)' ? "" : style.backgroundColor;
  return (
    <main className={styles.main} style={style}>
      <GetBackground/>
      <GetHTMLOnCondition/>
      <div className={styles.settingsButton}>
      <GetDialog data={data} dialog={dialog}/>
      </div>
    </main>
  );
}

function GetBackground(): React.ReactElement | boolean {
  return IsStarsEnabled() && <StarBackground/> || IsBallEnabled() && <BallBackground/>;
}

function GetHeader(): React.ReactElement {
  const data = GetLanguage();
  const selectedTheme: string = GetSettingsContext().selectedTheme;
  const style: string = (selectedTheme === "Light" || selectedTheme === "Luz") ? "rgb(230,230,230)" : "";
  const email: string = "jacob.m.montenegro@gmail.com";
  return (
    <div className={styles.headerContainer} style={{backgroundColor: style}}>
      {
        data.map((json, index) => (
          <div key={index} className={styles.header}>
            <h1 className={styles.title}>Jacob Montenegro</h1>
            <h2>{json.mainHeader.softwareDev}</h2>
            <a href={`mailto:${email}`} className={styles.email}>{email}</a>
          </div>
        ))
      }
    </div>
  );
}

function GetLine(): React.ReactElement {
  const style = {borderBottom: ""};
  style.borderBottom = GetBorder();
  return (
    <div className={styles.line} style={style}/>
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
    <a className={styles.downloadButton} style={GetButtonColors()} href={"Jacob_Montenegro_Resume.pdf"} download={"Jacob_Montenegro_Resume.pdf"}>
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
