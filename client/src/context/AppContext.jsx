import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const { getToken, isSignedIn } = useAuth();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (isSignedIn) { // only fetch if user is signed in
        try {
          const t = await getToken({ template: "default" });
          setToken(t);
        } catch (err) {
          console.error("Failed to get token:", err);
          setToken(null);
        }
      } else {
        setToken(null);
      }
    };

    fetchToken();
  }, [isSignedIn, getToken]);

  return (
    <AppContext.Provider value={{ token }}>
      {children}
    </AppContext.Provider>
  );
};
