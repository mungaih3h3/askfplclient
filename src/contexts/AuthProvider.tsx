import { decode } from "jsonwebtoken";
import { createContext, FC, useEffect, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { authenticate, register } from "../api/Auth";
import { CAuthDialog } from "../components/auth/CAuth";
import { useLocalStorage } from "../components/hooks/useLocalStorage";
import { CVerifyEmailDialog } from "../components/present/CVerifyEmail";
import { CSendPasswordResetDialog } from "../components/auth/CSendPasswordReset";

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
  openVerifyEmailDialog: () => any;
  openSendPasswordResetDialog: () => any;
  token: string;
  setToken: (token: string) => any;
};

export const AuthContext = createContext<TAuthContext>({
  getAuthenticatedUser: () => {
    throw new Error("No context");
  },
  openVerifyEmailDialog: () => {
    throw new Error("No context");
  },
  openSendPasswordResetDialog: () => {
    throw new Error("No context");
  },
  isAuthenticated: () => {
    return localStorage.getItem("token") !== null;
  },
  signIn: async () => {},
  getToken: () => {
    throw new Error("Unautheticated");
  },
  setToken: () => {},
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
  const [verifyEmailDialog, setVerifyEmailDialog] = useState(false);
  const [sendPasswordResetDialog, setSendPasswordResetDialog] = useState(false);
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
    await register(name, password, email);
    setVerifyEmailDialog(true);
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
        openVerifyEmailDialog: () => setVerifyEmailDialog(true),
        openSendPasswordResetDialog: () => setSendPasswordResetDialog(true),
        token,
        setToken,
      }}
    >
      {children}
      <CAuthDialog
        open={authDialog}
        onClose={() => setAuthDialog(false)}
        onAuth={() => setAuthDialog(false)}
      />
      <CVerifyEmailDialog
        open={verifyEmailDialog}
        onClose={() => setVerifyEmailDialog(false)}
      />
      <CSendPasswordResetDialog
        open={sendPasswordResetDialog}
        onClose={() => setSendPasswordResetDialog(false)}
      />
    </AuthContext.Provider>
  );
};
