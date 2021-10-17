import { FC, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import SignIn from "../pages/PSignIn";

export const WithAuthentication = (Component: FC) => {
  const Child = ({ ...props }) => {
    const { isAuthenticated } = useContext(AuthContext);
    if (isAuthenticated()) {
      return <Component {...props} />;
    } else {
      return <SignIn />;
    }
  };
  return Child;
};
