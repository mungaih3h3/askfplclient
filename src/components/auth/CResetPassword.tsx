import { Button, Stack, TextField } from "@mui/material";
import { FC, useContext, useState } from "react";
import toast from "react-hot-toast";
import { ApiContext } from "../../contexts/ApiProvider";
import { AuthContext } from "../../contexts/AuthProvider";

interface CResetPasswordProps {
  onReset: () => any;
  email: string;
  resetCode: string;
}

const CResetPassword: FC<CResetPasswordProps> = ({
  onReset,
  email,
  resetCode,
}) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { getInstance } = useContext(ApiContext);
  const { setToken } = useContext(AuthContext);
  return (
    <Stack spacing={2}>
      <TextField
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        placeholder="Enter your new password..."
      />
      <Button
        disabled={loading}
        variant="contained"
        onClick={async () => {
          try {
            setLoading(true);
            if (password.length < 4) throw new Error("Password too short");
            const {
              data: { success, message, token },
            } = await getInstance().post<any, any>(
              `/reset/password/${email}/${resetCode}`,
              {
                password,
              }
            );
            if (!success) throw new Error(message);
            else {
              setToken(token);
              toast.success("Password reset successfully");
            }
            onReset();
            setLoading(false);
          } catch (error: any) {
            setLoading(false);
            console.log(error);
            toast.error(error.message);
          }
        }}
      >
        Reset Password
      </Button>
    </Stack>
  );
};

export default CResetPassword;
