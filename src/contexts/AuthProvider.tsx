import { decode } from "jsonwebtoken";
import { createContext, FC, useEffect, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { authenticate } from "../api/Auth";
import User from "../logic/User";

type TAuthContext = {
  getAuthenticatedUser: () => User;
  isAuthenticated: () => boolean;
  signIn: (username: string, password: string) => Promise<any>;
  logOut: () => Promise<any>;
  getToken: () => Promise<string>;
};

export const AuthContext = createContext<TAuthContext>({
  getAuthenticatedUser: () => {
    throw new Error("No context");
  },
  isAuthenticated: () => false,
  signIn: async () => {},
  getToken: async () => {
    throw new Error("Unautheticated");
  },
  logOut: async () => {},
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
    try {
      const token = await authenticate(name, password);
      await localStorage.setItem("token", token);
      const { username } = decode(token) as any;
      setUser(new User(username));
      setToken(token);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const getToken = async () => {
    const token = await localStorage.getItem("token");
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
    await localStorage.removeItem("token");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
