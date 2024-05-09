import { useContext } from "react";
import { SettingsContext } from "./settings";
import en from "../../resources/languages/en.json";
import es from "../../resources/languages/es.json";

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