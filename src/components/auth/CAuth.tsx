import { Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";
import { FC, useState } from "react";
import CSignIn from "./CSignIn";
import CSignUp from "./CSignUp";

interface CAuthProps {
  onAuth: () => any;
}

const CAuth: FC<CAuthProps> = ({ onAuth }) => {
  const [value, setValue] = useState("Sign In" as "Sign In" | "Sign Up");
  return (
    <Stack spacing={2}>
      <Tabs
        textColor={"inherit"}
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
      >
        <Tab label="Sign In" value="Sign In" />
        <Tab label="Sign Up" value="Sign Up" />
      </Tabs>
      {value === "Sign In" && <CSignIn onAuth={onAuth} />}
      {value === "Sign Up" && <CSignUp onAuth={onAuth} />}
    </Stack>
  );
};

interface CAuthDialogProps extends CAuthProps {
  open: boolean;
  onClose: () => any;
}

export const CAuthDialog: FC<CAuthDialogProps> = ({
  open,
  onClose,
  ...rest
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <CAuth {...rest} />
      </DialogContent>
    </Dialog>
  );
};

export default CAuth;
