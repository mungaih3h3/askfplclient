import { Button, Stack, TextField, Typography } from "@mui/material";
import produce from "immer";
import { FC, useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";
import { fontSizes } from "../../theme/fontSizes";
import { useParams, useLocation, useHistory } from "react-router-dom";

interface CSignInProps {
  onAuth?: () => any;
}

const CSignIn: FC<CSignInProps> = ({ onAuth = () => {} }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { signIn, isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  return (
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
        disabled={loading}
        onClick={async () => {
          try {
            if (user.username.length < 2) throw new Error("Invalid username");
            if (user.password.length < 2) throw new Error("Invalid password");
            setLoading(true);
            await signIn(user.username, user.password);
            setLoading(false);
            onAuth();
          } catch (error: any) {
            setLoading(false);
            toast.error(error.message);
          }
        }}
      >
        Sign In
      </Button>
    </Stack>
  );
};

export default CSignIn;
