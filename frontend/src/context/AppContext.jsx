import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const value = { navigate, loading, setLoading, user, setUser };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
