import { Button, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import produce from "immer";
import { FC, useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { fontSizes } from "../../theme/fontSizes";
const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

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
  const [loading, setLoading] = useState(false);
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
        disabled={loading}
        onClick={async () => {
          try {
            if (!user.email.match(emailRegex))
              throw new Error("Please enter a valid email address");
            if (user.username.length < 4)
              throw new Error("Username must be atleast 5 characters long");
            if (user.password.length < 4)
              throw new Error("Password must be atleast 5 characters long");
            setLoading(true);
            await signUp(user.username, user.email, user.password);
            setLoading(false);
            onAuth();
          } catch (error: any) {
            setLoading(false);
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
