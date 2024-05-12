"use client";

import styles from "./page.module.css";
import Section from "./components/section/section";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faFileDownload }  from '@fortawesome/free-solid-svg-icons';
import raycasterDemo1 from "../app/resources/raycaster_demo1.gif";
import raycasterDemo2 from "../app/resources/raycaster_demo2.gif";
import raycasterDemo3 from "../app/resources/raycaster_demo3.gif";
import StarBackground from "./components/star-background/star-background";
import GetDialog from "./components/dialog/dialog";
import { GetLanguage, GetSettings, GetSettingsContext, IsBackgroundEnabled } from "./components/settings/settings";
import GetMeteors from "./components/game/meteor/meteor";
import { sectionProps } from "./components/section/section.data";

export default function Home(): React.ReactElement {
  const data = GetLanguage();

  return (
    <main className={styles.main}>
      <GetBackground/>
      <GetHTMLOnGameCondition/>
      <div className={styles.settingsButton}>
        {
          data.map((json, index) => (
            <GetDialog key={index} title={json.dialogs.settings.title} content={<GetSettings/>} buttonIcon={faCog} iconSize="3x"/>
          ))
        }
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

function GetHTMLOnGameCondition(): React.ReactElement {
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
  const data = GetLanguage();

  return (
    <a className={styles.downloadButton} href={"Jacob_Montenegro_Resume.pdf"} download={"Jacob_Montenegro_Resume.pdf"}>
      <FontAwesomeIcon icon={faFileDownload} size={"2x"} width={40} height={40}></FontAwesomeIcon>
      {
        data.map((json, index) => (
          <p key={index}>{json.downloadButton}</p>
        ))
      }
    </a>
  );
}

function GetSections(): React.ReactElement {

  const data = GetLanguage();
  const sectionMaster: sectionProps[] = [];
  
  data.map((json:any) => {
    Object.keys(json.sections).forEach((sectionKey:string) => {
      let section = json.sections[sectionKey];
      if (section.sectionTitle === "Projects") {
        section.bulletins[0].graphics = [raycasterDemo1, raycasterDemo2, raycasterDemo3]
      }
      sectionMaster.push(section);
    })
  });

  return (
    <>
      {
        sectionMaster.map((section, index) => {
          return <Section key={index} sectionTitle={section.sectionTitle} bulletins={section.bulletins}/>
        })
      }
    </>
  );
}