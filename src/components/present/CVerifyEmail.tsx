import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";

export const CVerifyEmail: FC = () => {
  return (
    <Stack spacing={2} sx={{ py: 2 }}>
      <Typography>
        ✅ We sent a link to your email. Use the link to login
      </Typography>
    </Stack>
  );
};

type CVerifyEmailDialogProps = {
  open: boolean;
  onClose: () => any;
};
export const CVerifyEmailDialog: FC<CVerifyEmailDialogProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Verify your email</DialogTitle>
      <DialogContent>
        <CVerifyEmail />
      </DialogContent>
    </Dialog>
  );
};
