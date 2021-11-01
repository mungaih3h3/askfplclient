import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useContext, useState } from "react";
import toast from "react-hot-toast";
import { sendPasswordResetLink } from "../../api/Auth";
import { ApiContext } from "../../contexts/ApiProvider";

interface CSendPasswordResetProps {
  onSend: () => any;
}
const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const CSendPasswordReset: FC<CSendPasswordResetProps> = ({ onSend }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { getInstance } = useContext(ApiContext);
  return (
    <Stack spacing={2}>
      <TextField
        value={email}
        onChange={({ target: { value } }) => {
          setEmail(value);
        }}
        placeholder={"Enter email address"}
      />
      <Button
        disabled={loading}
        variant="contained"
        onClick={async () => {
          try {
            if (!email.match(emailRegex)) {
              throw new Error("Invalid email address");
            } else {
              await sendPasswordResetLink(email);
              toast.success(
                "We sent a link to your email. Use the link to reset your password"
              );
            }
          } catch (error: any) {
            console.log(error);
            toast.error(error.message);
          }
        }}
      >
        Send
      </Button>
    </Stack>
  );
};

interface CSendPasswordResetDialogProps {
  open: boolean;
  onClose: () => any;
}

export const CSendPasswordResetDialog: FC<CSendPasswordResetDialogProps> = ({
  open,
  onClose,
  ...rest
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Password reset</DialogTitle>
      <DialogContent>
        <CSendPasswordReset onSend={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CSendPasswordReset;
