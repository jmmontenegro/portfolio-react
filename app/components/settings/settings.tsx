"use client";

import { ReactElement, ReactNode, createContext, useContext, useState } from "react";
import { GetDropDownMenu } from "../dropdown/dropdown";
import { GetLanguage } from "./language";

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

  const { isEnabled, toggleDisplay, selectedOption, setSelectedOption  } = useContext(SettingsContext);

  const handleDropdownChange = (selectedOption:string) => {
      setSelectedOption(selectedOption);
  };
  
  return (
  <div>
    <button onClick={toggleDisplay}>{ isEnabled ? disable : enable } {background}</button>
    <GetDropDownMenu onChange={handleDropdownChange} title={title} items={items}/>
  </div>
  );
}