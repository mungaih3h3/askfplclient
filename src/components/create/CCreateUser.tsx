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

interface CCreateUserProps {
  onCreate: (user: User) => any;
}

const CCreateUser: FC<CCreateUserProps> = ({ onCreate }) => {
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
        variant="contained"
        onClick={() => {
          onCreate(new User(user.username, []));
        }}
      >
        Create
      </Button>
    </Stack>
  );
};

interface CCreateUserDialogProps extends CCreateUserProps {
  open: boolean;
  onClose: () => any;
}

export const CCreateUserDialog: FC<CCreateUserDialogProps> = ({
  open,
  onClose,
  ...rest
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <CCreateUser {...rest} />
      </DialogContent>
    </Dialog>
  );
};

export default CCreateUser;
