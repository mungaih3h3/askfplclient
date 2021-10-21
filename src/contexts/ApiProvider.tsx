import axios, { AxiosInstance } from "axios";
import { FC, useContext } from "react";
import { createContext } from "react";
import { url } from "../api/ApiInstance";
import { AuthContext } from "./AuthProvider";

type TApiContext = {
  getInstance: () => AxiosInstance;
};

export const ApiContext = createContext<TApiContext>({
  getInstance: () => {
    throw new Error("No api context");
  },
});

export const ApiProvider: FC = ({ children }) => {
  const { getToken } = useContext(AuthContext);
  const getInstance = () => {
    let token = "";
    try {
      token = getToken();
    } catch (error) {
      token = "";
    }
    return axios.create({
      baseURL: url,
      headers: {
        authorization: token,
      },
    });
  };
  return (
    <ApiContext.Provider value={{ getInstance }}>
      {children}
    </ApiContext.Provider>
  );
};
