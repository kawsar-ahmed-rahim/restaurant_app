import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();
const AppContextProvider = ({ children }) => {
    const navigate = useNavigate
    const value = {navigate};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
