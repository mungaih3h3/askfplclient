import { Add } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import { Box } from "@mui/system";
import { FC, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { UsersContext } from "../../contexts/UsersProvider";
import User from "../../logic/User";
import { CCreateUserDialog } from "../create/CCreateUser";
import CUser from "./CUser";
interface CUserPoolProps {}

const CUserPool: FC<CUserPoolProps> = () => {
  const { users, setActive, activeUser, openCreateUserDialog } =
    useContext(UsersContext);
  const { getAuthenticatedUser } = useContext(AuthContext);
  const [addUser, setAddUser] = useState(false);
  return (
    <>
      <Stack spacing={2}>
        <Button startIcon={<Add />} onClick={() => openCreateUserDialog()}>
          user
        </Button>
        {users.map((user) => (
          <Box
            key={user.username}
            sx={{
              p: 2,
              backgroundColor:
                activeUser?.username === user.username
                  ? indigo[700]
                  : "rgba(0,0,0,0)",
            }}
            onClick={() => {
              if (activeUser?.username === user.username) {
                setActive(getAuthenticatedUser());
              } else {
                setActive(user);
              }
            }}
          >
            <CUser user={user} />
          </Box>
        ))}
      </Stack>
    </>
  );
};

interface CUserPoolDialogProps extends CUserPoolProps {
  open: boolean;
  onClose: () => any;
}

export const CUserPoolDialog: FC<CUserPoolDialogProps> = ({
  open,
  onClose,
  ...rest
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Users</DialogTitle>
      <DialogContent>
        <CUserPool {...rest} />
      </DialogContent>
    </Dialog>
  );
};

export default CUserPool;
