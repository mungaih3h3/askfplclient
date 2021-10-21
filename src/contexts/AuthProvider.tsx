import { decode } from "jsonwebtoken";
import { createContext, FC, useEffect, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { authenticate, register } from "../api/Auth";
import Publisher from "../logic/Publisher";
import User from "../logic/User";

type TAuthContext = {
  getAuthenticatedUser: () => User;
  isAuthenticated: () => boolean;
  signIn: (username: string, password: string) => Promise<any>;
  logOut: () => Promise<any>;
  getToken: () => string;
  signUp: (name: string, email: string, password: string) => Promise<any>;
};

export const AuthContext = createContext<TAuthContext>({
  getAuthenticatedUser: () => {
    throw new Error("No context");
  },
  isAuthenticated: () => false,
  signIn: async () => {},
  getToken: () => {
    throw new Error("Unautheticated");
  },
  logOut: async () => {},
  signUp: async () => {},
});

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState(undefined as User | undefined);
  const [token, setToken] = useState("");
  const getAuthenticatedUser = () => {
    if (user) return user;
    else {
      throw new Error("Unauthenticated");
    }
  };
  const isAuthenticated = () => Boolean(user);
  const signIn = async (name: string, password: string) => {
    const token = await authenticate(name, password);
    await localStorage.setItem("token", token);
    const { username } = decode(token) as any;
    Publisher.publish("login", undefined);
    setUser(new User(username));
    setToken(token);
  };
  const signUp = async (name: string, email: string, password: string) => {
    const token = await register(name, password, email);
    await localStorage.setItem("token", token);
    const { username } = decode(token) as any;
    setUser(new User(username));
    setToken(token);
  };
  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(undefined);
      setToken("");
      throw new Error("Unauthenticated");
    } else {
      const { username } = decode(token) as any;
      setUser(new User(username));
      setToken(token);
      return token;
    }
  };
  const logOut = async () => {
    try {
      await localStorage.removeItem("token");
      Publisher.publish("logout", undefined);
    } catch (error) {}

    setUser(undefined);
    setToken("");
  };
  useLayoutEffect(() => {
    const hydrateAuth = async () => {
      const token = await localStorage.getItem("token");
      if (!token) {
        setUser(undefined);
        setToken("");
      } else {
        const { username } = decode(token) as any;
        setUser(new User(username));
        setToken(token);
      }
    };
    hydrateAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        getAuthenticatedUser,
        isAuthenticated,
        signIn,
        getToken,
        logOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
