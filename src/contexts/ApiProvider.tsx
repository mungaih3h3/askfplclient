import axios, { AxiosInstance } from "axios";
import { FC, useContext } from "react";
import { createContext } from "react";
import { url } from "../api/ApiInstance";
import { ActiveBotContext } from "./ActiveBotProvider";
import { AuthContext } from "./AuthProvider";

type TApiContext = {
  getInstance: (as?: string) => AxiosInstance;
};

export const ApiContext = createContext<TApiContext>({
  getInstance: () => {
    throw new Error("No api context");
  },
});

export const ApiProvider: FC = ({ children }) => {
  const { getToken, isAuthenticated } = useContext(AuthContext);
  const { getAuthenticatedUser } = useContext(AuthContext);
  const { activeBot } = useContext(ActiveBotContext);
  const getInstance = (
    as: string = isAuthenticated()
      ? activeBot !== undefined
        ? activeBot.username
        : getAuthenticatedUser().username
      : ""
  ) => {
    let token = "";
    try {
      token = getToken();
    } catch (error) {
      console.log(error);
      token = "";
    }
    const headers = {
      authorization: token,
      as,
    };
    return axios.create({
      baseURL: url,
      headers,
    });
  };
  return (
    <ApiContext.Provider value={{ getInstance }}>
      {children}
    </ApiContext.Provider>
  );
};
