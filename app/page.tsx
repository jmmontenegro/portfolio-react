import { ReactElement } from "react";
import Bulletin from "./components/bulletin/bulletin";
import styles from "./page.module.css";
import Borders from "./components/borders/borders";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { faFileDownload }  from '@fortawesome/free-solid-svg-icons';
import { Button } from "@nextui-org/button";
import Image from "next/image";
import icon from "../app/favicon.ico";
import raycasterDemo1 from "../app/resources/raycaster_demo1.gif";
import raycasterDemo2 from "../app/resources/raycaster_demo2.gif";
import raycasterDemo3 from "../app/resources/raycaster_demo3.gif";
import { bulletinProps } from "./components/bulletin/bulletin.interface";
import resume from "./resources/raycaster_demo1.gif";


export default function Home(): ReactElement {
  
  const statement: bulletinProps = {
    title: "Personal Statement",
    description: "Experienced software developer skilled in designing and implementing robust software solutions. \
    Proficient in various programming languages and frameworks, with a focus on creating efficient and scalable applications. \
    Known for delivering high-quality code and innovative solutions that meet project requirements and exceed client expectations."
  };

  const skills: bulletinProps = {
    title: "Key Skills",
    description: [
      "TypeScript: Proficient in TypeScript, a statically typed superset of JavaScript.",
      "Java: Strong knowledge of Java programming language.",
      "Spring Boot: Practiced with Spring Boot for building robust back-end applications.",
      "Angular (13-16): Proficiency with Angular versions 13 through 16 for front-end development.",
      "Python: Proficient in Python.",
      "C and C++: Experienced in both C and C++."
    ]
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
        "Engineered an interactive bot for Discord, enhancing user engagement and community interaction.",
        "Implemented a feature for automated birthday announcements, fostering a sense of community and personal connection among members.",
        "Devised a welcoming system that sends personalized greetings to new members, promoting a friendly and inclusive environment.",
        "Integrated a music playing feature in chat, enriching the user experience and fostering a lively community atmosphere."
      ],
      dates: "2022",
    },
    {
      title: "Tutoring Tracking Tool",
      description: [
        "Designed and implemented a comprehensive tutoring tracking tool aimed at streamlining the management of tutoring services.",
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
        { getHeader() }
        { getLine() }
      <div className={styles.resume}>
        <a className={styles.downloadButton} href={"Jacob_Montenegro_Resume.pdf"} download={"Jacob_Montenegro_Resume.pdf"}>
          
          <FontAwesomeIcon icon={faFileDownload} width={50} height={50}></FontAwesomeIcon>
          Download Resume
        </a>
        <Bulletin title={statement.title} description={statement.description}></Bulletin>
        <Bulletin title={skills.title} description={skills.description}></Bulletin>
        <Borders>Experience</Borders>
        <Bulletin title={experience.title} description={experience.description} dates={experience.dates}></Bulletin>
        <Borders>Projects</Borders>
        { getProjects(projects) }
        <Borders>Leadership Awards</Borders>
        <Bulletin title={awards.title} description={awards.description} dates={awards.dates}></Bulletin>
        <Borders>Education</Borders>
        <Bulletin title={education.title} description={education.description} dates={education.dates}></Bulletin>
      </div>
      { getLine() }
    </main>
  );
}

function getHeader(): ReactElement {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Jacob Montenegro</h1>
      <h2>Software Developer</h2>
      <a href="mailto:jacob.m.montenegro@gmail.com" className={styles.email}>jacob.m.montenegro@gmail.com</a>
    </div>
  );
}

function getLine(): ReactElement {
  return (
    <div className={styles.line}></div>
  );
}

function downloadPdf() {
  return (
    <a href={"website/app/resources/Jacob_Montenegro_Resume.pdf"} download={"Jacob_Montenegro_Resume.pdf"}></a>
  );
}

function getProjects(projects: bulletinProps[]): ReactElement[] {
  return (
    projects.map((project, index) => (
      <Bulletin key={index} title={project.title} description={project.description} graphics={project.graphics} dates={project.dates}></Bulletin>
    ))
  );
}