import { createContext } from "react";

const ThemeContext = createContext(["green", () => {}]); // an empty function, coz the 2nd thing in a useState (hook) is specifically a function

export default ThemeContext;
