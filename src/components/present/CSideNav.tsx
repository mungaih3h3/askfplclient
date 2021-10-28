import {
  Add,
  Explore,
  Login,
  Logout,
  Person,
  Reply,
  ViewStream,
} from "@mui/icons-material";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { FeedbackContext } from "../../contexts/FeedbackProvider";
import { BotContext } from "../../contexts/BotProvider";
import { fontSizes } from "../../theme/fontSizes";
import { CNavItems } from "./CNavItems";

export const CSideNav = () => {
  const { isAuthenticated, logOut, openAuthDialog, getAuthenticatedUser } =
    useContext(AuthContext);
  const { openFeedbackDialog, isOpen: isFeedbackOpen } =
    useContext(FeedbackContext);
  const { isBotDialogOpen, openBotDialog } = useContext(BotContext);
  const location = useLocation();
  const history = useHistory();
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Typography
        sx={{ py: 3, px: 4, fontSize: fontSizes[4], fontWeight: 600 }}
      >
        AskFpl
      </Typography>
      <Box sx={{ flex: 1 }}>
        <CNavItems />
      </Box>
      {isAuthenticated() ? (
        <MenuItem onClick={() => logOut()}>
          <ListItemIcon>
            <Logout sx={{ color: grey[500] }} />
          </ListItemIcon>
          <ListItemText sx={{ color: grey[500] }}>Log out</ListItemText>
        </MenuItem>
      ) : (
        <MenuItem onClick={() => openAuthDialog()}>
          <ListItemIcon>
            <Login sx={{ color: grey[500] }} />
          </ListItemIcon>
          <ListItemText sx={{ color: grey[500] }}>Log in</ListItemText>
        </MenuItem>
      )}
    </Box>
  );
};
