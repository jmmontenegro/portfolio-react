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
import { BackgroundContext, GetSettings, SettingsProvider } from "./components/settings/settings";

export default function Home(): ReactElement {
  
  const statement: bulletinProps = {
    title: "Personal Statement",
    description: "Experienced software developer skilled in designing and implementing robust software solutions. \
    Proficient in various programming languages and frameworks, with a focus on creating efficient and scalable applications. \
    Known for delivering high-quality code and innovative solutions that meet project requirements and exceed client expectations."
  };

  const skills: bulletinProps = {
    title: "Key Skills",
    bullets: [
       {
        main: "Proficiencies",
        keyPoints: [
          "TypeScript","Java", "Spring Boot", "Angular (13-16)",
          "Python.",
          "CI/CD",
          "Fullstack development",
          "Front-end developement",
          "Back-end development",
          "Developing RESTful APIs",
          "Agile methodologies"
        ]
      },
      {
        main: "Experienced",
        keyPoints: [
          "PostgreSQL",
          "C and C++.",
          "Node.js",
          "TFS",
          "Linux (Ubuntu, Kali)",
          "GitHub"
        ]
      }
    ],
  };

  const experience: bulletinProps = {
    title: "General Motors - Software Developer",
    description: [
      "Conducted in-depth research and developed solutions for a synthetic image generation team.",
      "Produced lifelike data to enhance AI computer vision models.",
      "Researched, designed, and implemented diagnostic solutions for vehicle defects.",
      "Leveraged a Spring Boot backend to create RESTful APIs.",
      "Developed a dynamic Angular (TypeScript) frontend for user interaction.",
      "Utilized PostgreSQL databases for data storage and retrieval."
    ],
    dates: "July 2021 – February 2024"
  };

  const projects: bulletinProps[] = [
    {
      title: "Raycaster Engine",
      description: "Currently engaged in the development of a Raycasting Engine utilizing the C programming language. \
        This project is an endeavor to enhance proficiency in the application of pointers, as well as memory management.\
        This will further solidify understanding of these critical aspects of systems programming.",
      dates: "April 2024",
      graphics: [raycasterDemo1, raycasterDemo2, raycasterDemo3]
    },
    {
      title: "Raspberry Pi Development",
      description: [
        "Implemented a network-wide ad-blocking solution using Pi-hole on a Raspberry Pi. \
        This project involved setting up and configuring the Pi-hole to block web advertisements across all devices on my network.",
        "Successfully blocked unwanted content without the need for browser-based ad-blockers, improving overall network performance.",
        "Enhanced network security by setting up a Virtual Private Network (VPN) on the Raspberry Pi, allowing secure remote access to my home network.",
        "Gained hands-on experience with network configuration, Linux system administration, and cybersecurity best practices."
      ],
      dates: "March 2024"
    },
    {
      title: "Discord Bot",
      description: [
        "Engineered an interactive Python-based bot for Discord, enhancing user engagement and community interaction.",
        "Implemented a feature for automated birthday announcements, fostering a sense of community and personal connection among members.",
        "Devised a welcoming system that sends personalized greetings to new members, promoting a friendly and inclusive environment.",
        "Integrated a music playing feature in chat, enriching the user experience and fostering a lively community atmosphere."
      ],
      dates: "2022",
    },
    {
      title: "Tutoring Tracking Tool",
      description: [
        "Designed and implemented a Java-based comprehensive tutoring tracking tool aimed at streamlining the management of tutoring services.",
        "Developed a feature for logging and tracking hours, enhancing the efficiency of time management for both tutors and students.",
        "Implemented a sorting mechanism that categorizes tutors and students by their respective majors and courses, facilitating seamless matching of tutors with students.",
        "The tool significantly improved the organization of tutoring services, leading to increased productivity and better resource allocation."
      ],
      dates: "2019-2021",
    },
    {
      title: "Pen-Testing Tool",
      description: [
        "Engineered a robust penetration testing application that integrates industry-standard tools such as Nmap and Wireshark into a unified Qt-based user interface.",
        "Leveraged the power of the Cassandra database for efficient data management and retrieval, enhancing the tool’s performance and scalability.",
        "Contributed to the promotion of robust security practices by enabling users to perform comprehensive network analysis and vulnerability assessments.",
        "The tool significantly improved the efficiency and effectiveness of penetration testing, thereby strengthening defense mechanisms and promoting cybersecurity."
      ],
      dates: "August 2020 – May 2021",
    },
  ];

  const awards: bulletinProps = {
    title: "General Motors - eDiagnostics",
    description: [
      "Manufacturing in 2030 Award Winners.",
      "Enterprise Integration and Technology."
    ],
    dates: "2023"
  };

  const education: bulletinProps = {
    title: "The University of Texas at El Paso (UTEP)",
    description: "Bachelor of Science in Computer Science with a Minor in Mathematics",
    dates: "August 2017 – May 2021"
  };
  return (
    <main className={styles.main}>
      <SettingsProvider>
        <GetBackground/>
      </SettingsProvider>
      <GetHeader/>
      <GetLine/>
      <div className={styles.resume}>
        <GetDownloadButton/>
        <Bulletin title={statement.title} description={statement.description}></Bulletin>
        <Bulletin title={skills.title} bullets={skills.bullets}></Bulletin>
        <Borders>Experience</Borders>
        <Bulletin title={experience.title} description={experience.description} dates={experience.dates}></Bulletin>
        <Borders>Projects</Borders>
        { getProjects(projects) }
        <Borders>Leadership Awards</Borders>
        <Bulletin title={awards.title} description={awards.description} dates={awards.dates}></Bulletin>
        <Borders>Education</Borders>
        <Bulletin title={education.title} description={education.description} dates={education.dates}></Bulletin>
      </div>
      <GetLine/>

      <div className={styles.settingsButton} hidden={true}>
        <GetDialog title={"Settings"} content={<GetSettings/>} buttonIcon={faCog} iconSize="3x"/>
      </div>
    </main>
  );
}

function GetBackground(): ReactElement | null {
  const { isEnabled } = useContext(BackgroundContext);
  return isEnabled ? <StarBackground /> : null;
}

function GetHeader(): ReactElement {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Jacob Montenegro</h1>
      <h2>Software Developer</h2>
      <a href="mailto:jacob.m.montenegro@gmail.com" className={styles.email}>jacob.m.montenegro@gmail.com</a>
    </div>
  );
}

function GetDownloadButton(): ReactElement {
  return (
    <a className={styles.downloadButton} href={"Jacob_Montenegro_Resume.pdf"} download={"Jacob_Montenegro_Resume.pdf"}>
      <FontAwesomeIcon icon={faFileDownload} size={"2x"} width={40} height={40}></FontAwesomeIcon>
      <p>Download Resume</p>
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