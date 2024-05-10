"use client";

import { ReactElement, ReactNode, createContext, useContext, useState } from "react";
import { GetDropDownMenu } from "../dropdown/dropdown";
import styles from "./settings.module.css";
import en from "../../resources/languages/en.json";
import es from "../../resources/languages/es.json";

export const SettingsContext = createContext({ isEnabled: false, toggleDisplay: () => {}, selectedOption: '', setSelectedOption: (value: string) => {} });

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const [selectedOption, setSelectedOption] = useState('');

  const toggleDisplay = () => {
    setIsEnabled(prevState => !prevState);
  };

  return (
    <SettingsContext.Provider value={{ isEnabled, toggleDisplay, selectedOption, setSelectedOption }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function GetSettings(): ReactElement {

  const data = GetLanguage();
  let title:string="", 
  items:string[] = [],
  enable:string = '',
  disable:string = '',
  background:string = '';

  data.map(json => {
    title = json.dialogs.settings.languageSelect;
    items = json.dialogs.settings.languages;
    enable = json.dialogs.settings.enable;
    disable = json.dialogs.settings.disable;
    background = json.dialogs.settings.background;
  });

  const { isEnabled, toggleDisplay, selectedOption, setSelectedOption } = useContext(SettingsContext);

  const handleDropdownChange = (selectedOption:string) => {
      setSelectedOption(selectedOption);
  };
  
  return (
  <div className={styles.settings}>
    <button className={styles.toggleButton} onClick={toggleDisplay}>{ isEnabled ? disable : enable } {background}</button>
    <GetDropDownMenu onChange={handleDropdownChange} title={title} items={items}/>
    {IsBackgroundEnabled() && <button className={styles.toggleButton}>Play Game</button>}
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