"use client";

import { ReactElement, useContext } from "react";
import Bulletin from "./components/bulletin/bulletin";
import styles from "./page.module.css";
import Borders from "./components/borders/borders";
import { bulletinProps } from "./components/bulletin/bulletin.interface";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { faCog, faFileDownload }  from '@fortawesome/free-solid-svg-icons';
import raycasterDemo1 from "../app/resources/raycaster_demo1.gif";
import raycasterDemo2 from "../app/resources/raycaster_demo2.gif";
import raycasterDemo3 from "../app/resources/raycaster_demo3.gif";
import StarBackground from "./components/star-background/star-background";
import GetDialog from "./components/dialog/dialog";
import React from "react";
import { SettingsContext, GetSettings, SettingsProvider } from "./components/settings/settings";
import { GetLanguage } from "./components/settings/language";

export default function Home(): ReactElement {
  const data = GetLanguage();
  let statement: bulletinProps = {title: ''},
  skills: bulletinProps = {title: ''},
  experience: bulletinProps = {title: ''},
  projects: bulletinProps[] = [],
  education: bulletinProps  = {title: ''},
  awards: bulletinProps = {title: ''},
  experienceSection: string = '',
  projectSection: string = '',
  leadershipSection: string = '',
  educationSection: string = '';

  data.map(json => {
    const experienceSection:string = json.sections.experience.title;
    projectSection = json.sections.project.title;
    leadershipSection = json.sections.leadership.title;
    educationSection = json.sections.education.title;

    statement = {
      title: json.sections.misc.personalStatement.title,
      description: json.sections.misc.personalStatement.content
    };

    skills = {
      title: json.sections.misc.keySkills.title,
      bullets: json.sections.misc.keySkills.bullets
    }

    experience = {
      title: json.sections.experience.experiences.title,
      description : json.sections.experience.experiences.description,
      dates: json.sections.experience.experiences.dates
    };

    projects = json.sections.project.projects;

    projects.forEach(project => {
      if (project.graphics !== undefined)
        project.graphics = [raycasterDemo1, raycasterDemo2, raycasterDemo3]
    })
    
    education = {
      title: json.sections.education.degree.title,
      description: json.sections.education.degree.description,
      dates: json.sections.education.degree.dates
    };

    awards = {
      title: json.sections.leadership.awards.title,
      description: json.sections.leadership.awards.description,
      dates: json.sections.leadership.awards.dates
    };
  });

  return (
    <main className={styles.main}>
      <GetBackground/>
      <GetHeader/>
      <GetLine/>
      <div className={styles.resume}>
        <GetDownloadButton/>
        <Bulletin title={statement.title} description={statement.description}></Bulletin>
        <Bulletin title={skills.title} bullets={skills.bullets}></Bulletin>
        <Borders>{experienceSection}</Borders>
        <Bulletin title={experience.title} description={experience.description} dates={experience.dates}></Bulletin>
        <Borders>{projectSection}</Borders>
        { getProjects(projects) }
        <Borders>{leadershipSection}</Borders>
        <Bulletin title={awards.title} description={awards.description} dates={awards.dates}></Bulletin>
        <Borders>{educationSection}</Borders>
        <Bulletin title={education.title} description={education.description} dates={education.dates}></Bulletin>
      </div>
      <GetLine/>
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

function GetBackground(): ReactElement | null {
  const { isEnabled } = useContext(SettingsContext);
  return isEnabled ? <StarBackground /> : null;
}

function GetHeader(): ReactElement {

  const data = GetLanguage();
  return (
    <div className={styles.header}>
      {
        data.map((json, index) => (
          <div key={index}>
            <h1 className={styles.title}>Jacob Montenegro</h1>
            <h2>{json.mainHeader.softwareDev}</h2>
          <a href="mailto:jacob.m.montenegro@gmail.com" className={styles.email}>jacob.m.montenegro@gmail.com</a>
        </div>
        ))
      }
    </div>
  );
}

function GetDownloadButton(): ReactElement {

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

function GetLine(): ReactElement {
  return (
    <div className={styles.line}></div>
  );
}

function getProjects(projects: bulletinProps[]): ReactElement[] {
  return (
    projects.map((project, index) => (
      <Bulletin key={index} title={project.title} description={project.description} graphics={project.graphics} dates={project.dates}></Bulletin>
    ))
  );
}