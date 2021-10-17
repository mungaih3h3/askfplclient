import { Button, Stack, TextField } from "@mui/material";
import produce from "immer";
import { FC, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";

interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { signIn } = useContext(AuthContext);
  return (
    <Stack spacing={1}>
      <h2>Sign In</h2>
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
      <Button onClick={() => signIn(user.username)}>Sign In</Button>
    </Stack>
  );
};

export default SignIn;
