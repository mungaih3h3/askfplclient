import { Add, Chat, Reply } from "@mui/icons-material";
import {
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { green, indigo, lime } from "@mui/material/colors";
import { Box } from "@mui/system";
import { FC, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { ApiMap } from "../api/ApiMap";
import { ApiContext } from "../contexts/ApiProvider";
import { AuthContext } from "../contexts/AuthProvider";

export const WithAlpha = (Component: FC) => {
  const Child = ({ ...props }) => {
    const [open, setOpen] = useState(false);
    const [openFeedback, setOpenFeedback] = useState(false);
    const [feedback, setFeedback] = useState("");
    const { isAuthenticated, openAuthDialog } = useContext(AuthContext);
    const { getInstance } = useContext(ApiContext);
    const history = useHistory();
    const [openDial, setOpenDial] = useState(false);
    useEffect(() => {
      try {
        const t = localStorage.getItem("hasSeenAlphaMessage");
        if (!t) setOpen(true);
        localStorage.setItem("hasSeenAlphaMessage", "true");
      } catch (error) {
        setOpen(true);
      }
    }, []);
    return (
      <>
        <Component {...props} />
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Alpha</DialogTitle>
          <DialogContent>
            <Stack spacing={1}>
              <Typography>This website is in its alpha stage 🚀</Typography>
              <Typography>
                This is a fancy way of saying "we have no idea what we are doing
                and we need your help" 🙏🙏
              </Typography>
              <Typography>
                To request a new feature or report a bug, use the message button
                (on your bottom right). You need to sign up/in to give feedback
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Ok, Got It</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openFeedback} onClose={() => setOpenFeedback(false)}>
          <DialogTitle>Feedback</DialogTitle>

          <DialogContent>
            <TextField
              placeholder="Request a new feature or report a bug..."
              value={feedback}
              onChange={({ target: { value } }) => setFeedback(value)}
              multiline
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={async () => {
                try {
                  toast.success("Delivering your feedback...");
                  setOpen(false);
                  setOpenFeedback(false);
                  await ApiMap.sendFeedback(getInstance(), feedback);
                  toast.success("Delivered ✅ Thanks for the feedback!");
                } catch (error) {
                  toast.error(
                    "We are having a problem delivering your feedback. This has been reported and we are working on it"
                  );
                }
              }}
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
        <Box>
          <Backdrop open={openDial} />
          <SpeedDial
            ariaLabel="mini menu"
            icon={<SpeedDialIcon />}
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            open={openDial}
            onClose={() => setOpenDial(false)}
            onOpen={() => setOpenDial(true)}
          >
            <SpeedDialAction
              icon={<Reply />}
              tooltipTitle="Feedback"
              tooltipOpen
              onClick={() => {
                if (isAuthenticated()) {
                  setOpenFeedback(true);
                } else {
                  openAuthDialog();
                }
              }}
            />
            <SpeedDialAction
              icon={<Add />}
              tooltipTitle="AddPoll"
              tooltipOpen
              onClick={() => {
                history.push("/create");
              }}
            />
          </SpeedDial>
        </Box>
      </>
    );
  };
  return Child;
};
