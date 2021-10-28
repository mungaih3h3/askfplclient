import { FC, useContext } from "react";
import {
  Add,
  Explore,
  Login,
  Logout,
  Person,
  Reply,
  ViewStream,
} from "@mui/icons-material";
import { useHistory, useLocation } from "react-router-dom";
import { FeedbackContext } from "../../contexts/FeedbackProvider";
import { AuthContext } from "../../contexts/AuthProvider";
import { BotContext } from "../../contexts/BotProvider";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { grey } from "@mui/material/colors";
export const CNavItems: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { isOpen: isFeedbackOpen, openFeedbackDialog } =
    useContext(FeedbackContext);
  const { isAuthenticated, openAuthDialog, getAuthenticatedUser } =
    useContext(AuthContext);
  const { openBotDialog, isBotDialogOpen } = useContext(BotContext);
  return (
    <>
      {[
        {
          title: "Explore",
          active: location.pathname === "/",
          Icon: Explore,
          onClick: () => history.push("/"),
          show: true,
        },
        {
          title: "Add Poll",
          active: location.pathname === "/create",
          Icon: Add,
          onClick: () => history.push("/create"),
          show: true,
        },
        {
          title: "My Polls",
          active: location.pathname === "/userpolls",
          Icon: ViewStream,
          onClick: () => history.push("/userpolls"),
          show: true,
        },
        {
          title: "Feedback",
          active: isFeedbackOpen,
          Icon: Reply,
          onClick: () => openFeedbackDialog(),
          show: true,
        },
        {
          title: "Bot Pool",
          active: isBotDialogOpen,
          Icon: Person,
          onClick: () => openBotDialog(),
          show: isAuthenticated() && getAuthenticatedUser().hasRole("admin"),
        },
      ].map(({ title, active, Icon, onClick, show }) => {
        if (!show) return null;
        else {
          return (
            <MenuItem onClick={onClick}>
              <ListItemIcon>
                <Icon
                  fontSize="small"
                  sx={{ color: active ? grey[100] : grey[500] }}
                />
              </ListItemIcon>
              <ListItemText sx={{ color: active ? grey[100] : grey[500] }}>
                {title}
              </ListItemText>
            </MenuItem>
          );
        }
      })}
    </>
  );
};
