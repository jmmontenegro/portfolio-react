"use client";

import { createContext, useContext, useState } from "react";
import { GetDropDownMenu } from "../dropdown/dropdown";
import styles from "./settings.module.css";
import en from "../../resources/languages/en.json";
import es from "../../resources/languages/es.json";
import { UseDialog } from "../dialog/dialog";

export const defaultSettings = {
  areStarsEnabled: false,
  toggleStars: () => {},
  isBallEnabled: false,
  toggleBall: () => {},
  selectedOption: '',
  setSelectedOption: (value:string) => {},
  selectedTheme: '',
  setSelectedTheme: (value:string) => {},
  isRunningGame: false,
  setGameState: () => {}
};

export const SettingsContext = createContext(defaultSettings);

export function SettingsProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [areStarsEnabled, setStars] = useState(false);
  const [isBallEnabled, setBall] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [isRunningGame, runGame] = useState(false);

  const toggleStars = () => {
    setStars(prevState => !prevState);
  };

  const toggleBall = () => {
    setBall(prevState => !prevState);
  };

  const setGameState = () => {
    runGame(prevState => !prevState);
  };

  return (
    <SettingsContext.Provider value={{ areStarsEnabled, toggleStars, isBallEnabled, toggleBall, selectedOption, setSelectedOption, selectedTheme, setSelectedTheme, isRunningGame, setGameState }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function GetSettings({ dialog }: { dialog: ReturnType<typeof UseDialog> }): React.ReactElement {

  const data = GetLanguage();
  let title:string = "", 
  items:string[] = [],
  enable:string = "",
  disable:string = "",
  background:string = "",
  playGame:string = "",
  themes: string[] = [],
  themeTitle:string = "";
    themes = ['light', 'dark', "default"];

  data.map(json => {
    const settings = json.dialogs.settings;
    title = settings.languageSelect;
    items = settings.languages;
    enable = settings.enable;
    disable = settings.disable;
    background = settings.stars;
    playGame = settings.playGame;
    themes = [settings.themes.default, settings.themes.light, settings.themes.dark];

    const currentTheme = GetSettingsContext().selectedTheme === "" ? settings.themes.default: GetSettingsContext().selectedTheme;
    const index = themes.indexOf(currentTheme);
    if (index !== -1) {
      themes.splice(index, 1);
      themes.unshift(currentTheme);
    }
    themeTitle = settings.themeTitle;
  });

  const { areStarsEnabled, toggleStars, isBallEnabled, toggleBall, selectedOption, setSelectedOption, selectedTheme, setSelectedTheme, isRunningGame, setGameState} = useContext(SettingsContext);

  const handleLanguageDropdownChange = (selectedOption:string) => {
      setSelectedOption(selectedOption);
  };

  const handleThemeDropdownChange = (selectedTheme:string) => {
    setSelectedTheme(selectedTheme);
  };

  const newSetGameState = () => {
    dialog.handleClose();
    setGameState();
  };

  return (
    <div className={styles.settings}>
      <button className={styles.toggleButton} onClick={toggleBall}>{ isBallEnabled ? disable : enable } {background}</button>
      <button className={styles.toggleButton} onClick={toggleStars}>{ areStarsEnabled ? disable : enable } {background}</button>
      <GetDropDownMenu onChange={handleThemeDropdownChange} title={themeTitle} items={themes}/>
      <GetDropDownMenu onChange={handleLanguageDropdownChange} title={title} items={items}/>
      {IsStarEnabled() && <button className={styles.toggleButton} onClick={newSetGameState}>{playGame}</button>}
    </div>
  );
}

export function IsStarEnabled(): boolean {
  return GetSettingsContext().areStarsEnabled;
}

export function IsBallEnabled(): boolean {
  return GetSettingsContext().isBallEnabled;
}

export function GetLanguage() {
  switch(GetSettingsContext().selectedOption) {
    case 'Spanish' || 'Español':
      return es;

    default:
    case 'English' || 'Inglés':
      return en;
  }
}

export function GetSettingsContext(): typeof defaultSettings {
  return useContext(SettingsContext);
}

export interface stylesData {
  backgroundColor: string;
  color?: string;
  border?: string; 
}

export function GetTheme(): stylesData {
  let style:stylesData = {} as stylesData;

  switch(GetSettingsContext().selectedTheme) {

    case 'Light':
    case 'Luz':
      style.backgroundColor = "rgb(230,230,230)";
      style.color = 'black';
      break;

    case 'Dark':
    case 'Oscuro':
      style.backgroundColor = "black";
      style.color = 'white';
      break;

    default:
      style.backgroundColor = "var(--burgundy)"
      break;
  }
  return style;
}

export function GetBorder(): string {
  switch(GetSettingsContext().selectedTheme) {
    case 'Light':
    case 'Luz':
      return '2px solid black';
    case 'Dark':
    case 'Oscuro':
      return '2px solid white';
    default:
      return '2px solid var(--kobe)';
  }
}

export function GetSection(): string {
  switch(GetSettingsContext().selectedTheme) {
    case 'Light':
    case 'Luz':
      return '1px solid black';
    default:
    case 'Dark': 
    case 'Oscuro':
      return '1px solid white';
  }
}

export function GetButtonColors(): stylesData {
  let style:stylesData = {} as stylesData;
  switch(GetSettingsContext().selectedTheme) {
    case 'Light':
    case 'Luz':
      style.backgroundColor = "white";
      style.border = "2px solid black"
      break;
    case 'Dark':
    case 'Oscuro':
      style.backgroundColor = "black";
      style.border = "2px solid white"
      break;
    default:
      break;
  }
  return style;
}