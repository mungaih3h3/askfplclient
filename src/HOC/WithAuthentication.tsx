import { FC, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Redirect } from "react-router-dom";

export const WithAuthentication = (Component: FC) => {
  const Child = ({ ...props }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />;
  };
  return Child;
};
