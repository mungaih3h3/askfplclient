import { FC, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import CSignIn from "../components/auth/CSignIn";
import { Card, CardContent, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export const WithAuthentication = (Component: FC) => {
  const Child = ({ ...props }) => {
    const { isAuthenticated } = useContext(AuthContext);
    if (isAuthenticated()) {
      return <Component {...props} />;
    } else {
      return (
        <Stack spacing={2} sx={{ pt: 12 }}>
          <Card>
            <CardContent>
              <CSignIn />
            </CardContent>
          </Card>
          <Link to="/">Explore as guest</Link>
        </Stack>
      );
    }
  };
  return Child;
};
