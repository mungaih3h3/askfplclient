import { FC, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import CSignIn from "../components/auth/CSignIn";
import { Card, CardContent, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";

export const WithAuthentication = (Component: FC) => {
  const Child = ({ ...props }) => {
    const { isAuthenticated } = useContext(AuthContext);
    if (isAuthenticated()) {
      return <Component {...props} />;
    } else {
      return (
        <Stack
          spacing={2}
          sx={{ p: 2, pt: 11, display: "flex", alignItems: "center" }}
        >
          <Card>
            <CardContent>
              <CSignIn />
            </CardContent>
          </Card>
          <Link
            to="/"
            style={{
              color: grey[100],
              textDecoration: "none",
              borderBottom: `2px solid ${grey[100]}`,
            }}
          >
            Explore as guest
          </Link>
        </Stack>
      );
    }
  };
  return Child;
};
