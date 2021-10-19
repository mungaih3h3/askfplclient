import { createContext, FC, useState } from "react";
import User from "../logic/User";

type TAuthContext = {
  getAuthenticatedUser: () => User;
  isAuthenticated: () => boolean;
  signIn: (username: string) => any;
  getToken: () => string;
};

export const AuthContext = createContext<TAuthContext>({
  getAuthenticatedUser: () => {
    throw new Error("No context");
  },
  isAuthenticated: () => false,
  signIn: () => {},
  getToken: () => {
    throw new Error("Unautheticated");
  },
});

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState(undefined as User | undefined);
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11bmdhaSIsImlhdCI6MTYzNDYyNDMwM30.wzAAN2lcewsWTPzLyWWq3qQY8jJXtt0kGkBNEKWJTGI"
  );
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
  const getToken = () => {
    if (token === "") throw new Error("Authentication error");
    return token;
  };
  return (
    <AuthContext.Provider
      value={{ getAuthenticatedUser, isAuthenticated, signIn, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
