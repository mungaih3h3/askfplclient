import { decode } from "jsonwebtoken";
import { createContext, FC, useEffect, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { authenticate, register } from "../api/Auth";
import { CAuthDialog } from "../components/auth/CAuth";
import { useLocalStorage } from "../components/hooks/useLocalStorage";
import Publisher, { Events } from "../logic/Publisher";
import User from "../logic/User";

type TAuthContext = {
  getAuthenticatedUser: () => User;
  isAuthenticated: () => boolean;
  signIn: (username: string, password: string) => Promise<any>;
  logOut: () => Promise<any>;
  getToken: () => string;
  signUp: (name: string, email: string, password: string) => Promise<any>;
  openAuthDialog: () => any;
  token: string;
};

export const AuthContext = createContext<TAuthContext>({
  getAuthenticatedUser: () => {
    throw new Error("No context");
  },
  isAuthenticated: () => {
    return localStorage.getItem("token") !== null;
  },
  signIn: async () => {},
  getToken: () => {
    throw new Error("Unautheticated");
  },
  logOut: async () => {},
  signUp: async () => {},
  openAuthDialog: () => {},
  token: "",
});

export const AuthProvider: FC = ({ children }) => {
  const [token, setToken] = useLocalStorage<string>("token", "");
  const getAuthenticatedUser = () => {
    if (token === "") {
      throw new Error("Unauthenticated");
    } else {
      const { username, roles } = decode(token as string) as any;
      return new User(username, roles);
    }
  };
  const [authDialog, setAuthDialog] = useState(false);
  const isAuthenticated = () => {
    return token !== "";
  };
  const signIn = async (name: string, password: string) => {
    const tokenServer = await authenticate(name, password);
    setToken(tokenServer);
    const { username } = decode(tokenServer) as any;
    Publisher.publish(Events.login, new User(username));
  };
  const signUp = async (name: string, email: string, password: string) => {
    const token = await register(name, password, email);
    setToken(token);
  };
  const getToken = () => {
    return token;
  };
  const logOut = async () => {
    try {
      setToken("");
      Publisher.publish(Events.logout, undefined);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        getAuthenticatedUser,
        isAuthenticated,
        signIn,
        getToken,
        logOut,
        signUp,
        openAuthDialog: () => setAuthDialog(true),
        token,
      }}
    >
      {children}
      <CAuthDialog
        open={authDialog}
        onClose={() => setAuthDialog(false)}
        onAuth={() => setAuthDialog(false)}
      />
    </AuthContext.Provider>
  );
};
