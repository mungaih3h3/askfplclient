import { Add } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import { Box } from "@mui/system";
import { FC, useContext, useState } from "react";
import { ActiveBotContext } from "../../contexts/ActiveBotProvider";
import { AuthContext } from "../../contexts/AuthProvider";
import { BotContext } from "../../contexts/BotProvider";
import { fontSizes } from "../../theme/fontSizes";
import CBot from "./CBot";
interface CUserPoolProps {}

const CUserPool: FC<CUserPoolProps> = () => {
  const { bots, openCreateBotDialog } = useContext(BotContext);
  const { activeBot, setActiveBot } = useContext(ActiveBotContext);
  const { getAuthenticatedUser } = useContext(AuthContext);
  return (
    <>
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: fontSizes[3] }}>Bots</Typography>

          <Button
            size="small"
            variant="outlined"
            startIcon={<Add />}
            onClick={() => openCreateBotDialog()}
          >
            bot
          </Button>
        </Box>
        {bots.map((user) => (
          <Paper
            key={user.username}
            sx={{
              p: 2,
              backgroundColor:
                activeBot?.username === user.username
                  ? indigo[700]
                  : "rgba(0,0,0,0)",
              cursor: "pointer",
            }}
            onClick={() => {
              if (activeBot?.username === user.username) {
                setActiveBot(undefined);
              } else {
                setActiveBot(user);
              }
            }}
          >
            <CBot user={user} />
          </Paper>
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
      <DialogContent>
        <CUserPool {...rest} />
      </DialogContent>
    </Dialog>
  );
};

export default CUserPool;
