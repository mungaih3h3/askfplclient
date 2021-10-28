import {
  Add,
  Explore,
  Login,
  Logout,
  Person,
  Reply,
  ViewStream,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { FeedbackContext } from "../../contexts/FeedbackProvider";
import { UsersContext } from "../../contexts/UsersProvider";
import { fontSizes } from "../../theme/fontSizes";

export const CSideNav = () => {
  const { isAuthenticated, logOut, openAuthDialog, getAuthenticatedUser } =
    useContext(AuthContext);
  const { openFeedbackDialog, isOpen: isFeedbackOpen } =
    useContext(FeedbackContext);
  const { isUserDialogOpen, openUsersDialog } = useContext(UsersContext);
  const location = useLocation();
  const history = useHistory();
  return (
    <Box
      sx={{
        px: 6,
        py: 4,
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Typography sx={{ py: 3, fontSize: fontSizes[4], fontWeight: 600 }}>
        AskFpl
      </Typography>
      <Stack spacing={4} sx={{ flex: 1, height: "100%", py: 2 }}>
        {[
          {
            title: "explore",
            active: location.pathname === "/",
            Icon: Explore,
            onClick: () => history.push("/"),
            show: true,
          },
          {
            title: "add poll",
            active: location.pathname === "/create",
            Icon: Add,
            onClick: () => history.push("/create"),
            show: true,
          },
          {
            title: "my polls",
            active: location.pathname === "/userpolls",
            Icon: ViewStream,
            onClick: () => history.push("/userpolls"),
            show: true,
          },
          {
            title: "feedback",
            active: isFeedbackOpen,
            Icon: Reply,
            onClick: () => openFeedbackDialog(),
            show: true,
          },
          {
            title: "user pool",
            active: isUserDialogOpen,
            Icon: Person,
            onClick: () => openUsersDialog(),
            show: isAuthenticated() && getAuthenticatedUser().hasRole("admin"),
          },
        ].map(({ title, Icon, active, onClick, show }) =>
          show ? (
            <Stack direction="row" spacing={2} onClick={onClick}>
              <Icon sx={{ color: active ? grey[100] : grey[500] }} />
              <Typography
                sx={{
                  color: active ? grey[100] : grey[500],
                  fontSize: fontSizes[2],
                  textTransform: "capitalize",
                }}
              >
                {title}
              </Typography>
            </Stack>
          ) : null
        )}
      </Stack>
      {isAuthenticated() ? (
        <Stack spacing={2} direction="row" onClick={() => logOut()}>
          <Logout sx={{ color: grey[500] }} />
          <Typography
            sx={{
              color: grey[500],
              fontSize: fontSizes[2],
              textTransform: "capitalize",
            }}
          >
            Log out
          </Typography>
        </Stack>
      ) : (
        <Stack spacing={2} direction="row" onClick={() => openAuthDialog()}>
          <Login sx={{ color: grey[500] }} />
          <Typography
            sx={{
              color: grey[500],
              fontSize: fontSizes[2],
              textTransform: "capitalize",
            }}
          >
            Log in
          </Typography>
        </Stack>
      )}
    </Box>
  );
};
