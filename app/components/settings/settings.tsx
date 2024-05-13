"use client";

import { createContext, useContext, useState } from "react";
import { GetDropDownMenu } from "../dropdown/dropdown";
import styles from "./settings.module.css";
import en from "../../resources/languages/en.json";
import es from "../../resources/languages/es.json";

export const defaultSettings = {
  isEnabled: false,
  toggleDisplay: () => {},
  selectedOption: '',
  setSelectedOption: (value:string) => {},
  isRunningGame: false,
  setGameState: () => {}
};

export const SettingsContext = createContext(defaultSettings);

export function SettingsProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isRunningGame, runGame] = useState(false);

  const toggleDisplay = () => {
    setIsEnabled(prevState => !prevState);
  };

  const setGameState = () => {
    runGame(prevState => !prevState);
  };

  return (
    <SettingsContext.Provider value={{ isEnabled, toggleDisplay, selectedOption, setSelectedOption, isRunningGame, setGameState }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function GetSettings(): React.ReactElement {

  const data = GetLanguage();
  let title:string = "", 
  items:string[] = [],
  enable:string = "",
  disable:string = "",
  background:string = "";

  data.map(json => {
    title = json.dialogs.settings.languageSelect;
    items = json.dialogs.settings.languages;
    enable = json.dialogs.settings.enable;
    disable = json.dialogs.settings.disable;
    background = json.dialogs.settings.background;
  });

  const { isEnabled, toggleDisplay, selectedOption, setSelectedOption, isRunningGame, setGameState} = useContext(SettingsContext);

  const handleDropdownChange = (selectedOption:string) => {
      setSelectedOption(selectedOption);
  };
  
  return (
  <div className={styles.settings}>
    <button className={styles.toggleButton} onClick={toggleDisplay}>{ isEnabled ? disable : enable } {background}</button>
    <GetDropDownMenu onChange={handleDropdownChange} title={title} items={items}/>
    {IsBackgroundEnabled() && <button className={styles.toggleButton} onClick={setGameState}>Play Game</button>}
  </div>
  );
}

export function IsBackgroundEnabled(): boolean {
  const { isEnabled } = useContext(SettingsContext);
  return isEnabled;
}

export function GetLanguage() {
  const { selectedOption } = useContext(SettingsContext);

  switch(selectedOption) {
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