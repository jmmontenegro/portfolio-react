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

function getSection(data: sectionProps): React.ReactElement {

  return (
    <Section sectionTitle={data.sectionTitle} bulletins={data.bulletins}/>
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
          <SetSections/>
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

function SetSections(): React.ReactElement {

  const data = GetLanguage();
  let statement: sectionProps = { bulletins: [] },
  skills: sectionProps = { bulletins: [] },
  experience: sectionProps = { bulletins: [] },
  projects: sectionProps = { bulletins: [] },
  education: sectionProps = { bulletins: [] },
  awards: sectionProps = { bulletins: [] };

  data.map(json => {
    statement = {
      bulletins: [
        {
          title: json.sections.misc.personalStatement.title,
          description: json.sections.misc.personalStatement.content
        }
      ]
    };

    skills = {
      bulletins: [
        {
          title: json.sections.misc.keySkills.title,
          bullets: json.sections.misc.keySkills.bullets
        }
      ]
    }

    experience = {
      sectionTitle: json.sections.experience.title,
      bulletins: [
        {
          title: json.sections.experience.experiences.title,
          description : json.sections.experience.experiences.description,
          dates: json.sections.experience.experiences.dates
        }
      ]
    };

    projects = {
      sectionTitle: json.sections.project.title,
      bulletins: json.sections.project.projects
    };

    projects.bulletins.forEach(project => {
      if (project.graphics !== undefined)
        project.graphics = [raycasterDemo1, raycasterDemo2, raycasterDemo3]
    })
    
    education = {
      sectionTitle: json.sections.education.title,
      bulletins: [
        {
          title: json.sections.education.degree.title,
          description: json.sections.education.degree.description,
          dates: json.sections.education.degree.dates
        }
      ]
    };

    awards = {
      sectionTitle: json.sections.leadership.title,
      bulletins: [
        {
          title: json.sections.leadership.awards.title,
          description: json.sections.leadership.awards.description,
          dates: json.sections.leadership.awards.dates
        }
      ]
    };
  });

  return (
    <>
      {getSection(statement)}
      {getSection(skills)}
      {getSection(experience)}
      {getSection(projects)}
      {getSection(awards)}
      {getSection(education)}
    </>
  );
}