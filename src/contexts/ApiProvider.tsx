import axios, { AxiosInstance } from "axios";
import { FC, useContext } from "react";
import { createContext } from "react";
import { url } from "../api/ApiInstance";
import { AuthContext } from "./AuthProvider";
import { UsersContext } from "./UsersProvider";

type TApiContext = {
  getInstance: (as?: string) => AxiosInstance;
};

export const ApiContext = createContext<TApiContext>({
  getInstance: () => {
    const headers = {
      authorization: JSON.parse(localStorage.getItem("token") || ""),
    };
    return axios.create({
      baseURL: url,
      headers,
    });
  },
});

export const ApiProvider: FC = ({ children }) => {
  const { getToken, isAuthenticated } = useContext(AuthContext);
  const { getAuthenticatedUser } = useContext(AuthContext);
  const { activeUser } = useContext(UsersContext);
  const getInstance = (
    as: string = isAuthenticated()
      ? activeUser !== undefined
        ? activeUser.username
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
