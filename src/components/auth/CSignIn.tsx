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
  const { redirect } = useParams<{ redirect?: string }>();
  const location = useLocation();
  const history = useHistory();
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
        onClick={async () => {
          try {
            await signIn(user.username, user.password);
            onAuth();
          } catch (error: any) {
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
