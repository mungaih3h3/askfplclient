import { Chat } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { green, lime } from "@mui/material/colors";
import { FC, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiMap } from "../api/ApiMap";
import { ApiContext } from "../contexts/ApiProvider";
import { AuthContext } from "../contexts/AuthProvider";

export const WithAlpha = (Component: FC) => {
  const Child = ({ ...props }) => {
    const [open, setOpen] = useState(false);
    const [openFeedback, setOpenFeedback] = useState(false);
    const [feedback, setFeedback] = useState("");
    const { isAuthenticated } = useContext(AuthContext);
    const { getInstance } = useContext(ApiContext);
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
        {isAuthenticated() && (
          <IconButton
            onClick={() => setOpenFeedback(true)}
            sx={{
              position: "fixed",
              bottom: 10,
              right: 10,
            }}
          >
            <Chat />
          </IconButton>
        )}
      </>
    );
  };
  return Child;
};
