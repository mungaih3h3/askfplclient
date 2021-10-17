import { createContext, FC, useState } from "react";
import User from "../logic/User";

type TAuthContext = {
  getAuthenticatedUser: () => User;
  isAuthenticated: () => boolean;
  signIn: (username: string) => any;
};

export const AuthContext = createContext<TAuthContext>({
  getAuthenticatedUser: () => {
    throw new Error("No context");
  },
  isAuthenticated: () => false,
  signIn: () => {},
});

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState(undefined as User | undefined);
  const getAuthenticatedUser = () => {
    if (user) return user;
    else {
      throw new Error("Unauthenticated");
    }
  };
  const isAuthenticated = () => Boolean(user);
  const signIn = (username: string) => {
    setUser(new User(username));
  };
  return (
    <AuthContext.Provider
      value={{ getAuthenticatedUser, isAuthenticated, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
