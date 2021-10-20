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
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthProvider";
import { fontSizes } from "../theme/fontSizes";

interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { signIn, isAuthenticated } = useContext(AuthContext);
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
            <Button
              variant="contained"
              onClick={async () => {
                try {
                  await signIn(user.username, user.password);
                } catch (error: any) {
                  toast.error(error.message);
                }
              }}
            >
              Sign In
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignIn;
