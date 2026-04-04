import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const AppContext = createContext();
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;
const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(true);
  const value = { navigate, loading, setLoading, user, setUser, axios };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
