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
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { fontSizes } from "../../theme/fontSizes";

interface CSignUpProps {
  onAuth?: () => any;
}

const CSignUp: FC<CSignUpProps> = ({ onAuth = () => {} }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { signUp, isAuthenticated } = useContext(AuthContext);
  return (
    <Stack spacing={1}>
      <Typography
        sx={{
          fontSize: fontSizes[6],
          fontWeight: 700,
        }}
      >
        Sign Up
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
        value={user.email}
        placeholder="Enter email..."
        onChange={({ target: { value } }) => {
          setUser(
            produce((draft) => {
              draft.email = value;
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
            await signUp(user.username, user.email, user.password);
            onAuth();
          } catch (error: any) {
            toast.error(error.message);
          }
        }}
      >
        Sign Up
      </Button>
    </Stack>
  );
};

export default CSignUp;
