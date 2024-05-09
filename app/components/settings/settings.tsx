"use client";

import { ReactElement, ReactNode, createContext, useContext, useEffect, useState } from "react";
import dropDownData from "../dropdown/dropdown.data";
import { getDropDownMenu } from "../dropdown/dropdown";

export const BackgroundContext = createContext({ isEnabled: false, toggleDisplay: () => {} });

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleDisplay = () => {
    setIsEnabled(prevState => !prevState);
    console.log('Toggled');
  };

  useEffect(() => {
    console.log(`Is Enabled: ${isEnabled}`);
  }, [isEnabled]);

  return (
    <BackgroundContext.Provider value={{ isEnabled, toggleDisplay }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function GetSettings(): ReactElement {
  const languageSettings: dropDownData = {
    title: "Please select a language:",
    items: ["English","Spanish"]
  }

  const { isEnabled, toggleDisplay } = useContext(BackgroundContext);
  
  return (
  <div>
    <button onClick={toggleDisplay}>{ isEnabled ? "Disable" : "Enabled" } Background</button>
    { getDropDownMenu(languageSettings) }
  </div>
  );
}