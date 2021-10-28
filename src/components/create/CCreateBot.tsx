import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import produce from "immer";
import { FC, useState } from "react";
import User from "../../logic/User";

interface CCreateBotProps {
  onCreate: (user: User) => any;
  loading: boolean;
}

const CCreateBot: FC<CCreateBotProps> = ({ onCreate, loading }) => {
  const [user, setUser] = useState({ username: "" });
  return (
    <Stack spacing={2}>
      <TextField
        placeholder="Enter user name..."
        value={user.username}
        onChange={({ target: { value } }) => {
          setUser(
            produce((draft) => {
              draft.username = value;
            })
          );
        }}
      />
      <Button
        disabled={loading}
        variant="contained"
        onClick={() => {
          onCreate(new User(user.username, []));
        }}
      >
        {loading ? "Loading..." : "Create"}
      </Button>
    </Stack>
  );
};

interface CCreateBotDialogProps extends CCreateBotProps {
  open: boolean;
  onClose: () => any;
}

export const CCreateBotDialog: FC<CCreateBotDialogProps> = ({
  open,
  onClose,
  ...rest
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Bot</DialogTitle>
      <DialogContent>
        <CCreateBot {...rest} />
      </DialogContent>
    </Dialog>
  );
};

export default CCreateBot;
