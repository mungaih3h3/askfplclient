import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import produce from "immer";
import { FC, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { fontSizes } from "../theme/fontSizes";

interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { signIn } = useContext(AuthContext);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: "10rem",
      }}
    >
      <Card>
        <CardContent>
          <Stack spacing={1}>
            <Typography
              sx={{
                fontSize: fontSizes[6],
                fontWeight: 700,
              }}
            >
              Sign In
            </Typography>
            <TextField
              value={user.username}
              placeholder="Enter username..."
              onChange={({ target: { value } }) => {
                setUser(
                  produce((draft) => {
                    draft.username = value;
                  })
                );
              }}
            />
            <TextField
              value={user.password}
              type="password"
              placeholder="Enter password..."
              onChange={({ target: { value } }) => {
                setUser(
                  produce((draft) => {
                    draft.password = value;
                  })
                );
              }}
            />
            <Button variant="contained" onClick={() => signIn(user.username)}>
              Sign In
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignIn;
