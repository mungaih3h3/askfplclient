import {
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { grey, lime } from "@mui/material/colors";
import { Box } from "@mui/system";
import { FC, forwardRef, useContext, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { FeedbackContext } from "../../contexts/FeedbackProvider";
import { fontSizes } from "../../theme/fontSizes";
import {
  Add,
  Explore,
  Logout,
  Menu as MenuIcon,
  Reply,
  ViewStream,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { CNavItems } from "./CNavItems";
interface CNavProps {
  title: string;
}
const CNav: FC<CNavProps> = forwardRef(({ title, ...props }, ref) => {
  const { isAuthenticated, openAuthDialog, logOut } = useContext(AuthContext);
  const [topMenu, setTopMenu] = useState(false);
  const topMenuAnchor = useRef(null);
  const history = useHistory();
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      {...props}
      ref={ref}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
        px: 2,
        position: onMobile ? "sticky" : "relative",
        top: 0,
        backgroundColor: (theme) => theme.palette.background.default,
        zIndex: 3,
      }}
    >
      <Stack
        spacing={2}
        direction="row"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Typography
          sx={{
            fontSize: fontSizes[4],
            px: 2,
            fontWeight: 600,
            color: grey[500],
            textTransform: "capitalize",
          }}
        >
          {title}
        </Typography>
        <Paper variant="outlined" sx={{ bgcolor: lime[300], py: 0, px: 1 }}>
          <Typography
            sx={{
              color: lime[900],
              fontSize: fontSizes[0],
            }}
          >
            Alpha
          </Typography>
        </Paper>
      </Stack>

      {onMobile &&
        (isAuthenticated() ? (
          <div>
            <IconButton ref={topMenuAnchor} onClick={() => setTopMenu(true)}>
              <MenuIcon
                sx={{
                  color: grey[500],
                }}
              />
            </IconButton>
            <Menu
              open={topMenu}
              anchorEl={topMenuAnchor.current}
              onClose={() => setTopMenu(false)}
            >
              <CNavItems />
              <Divider />
              <MenuItem
                onClick={() => {
                  setTopMenu(false);
                  logOut();
                }}
              >
                <ListItemIcon>
                  <Logout sx={{ color: grey[500] }} fontSize="small" />
                </ListItemIcon>
                <ListItemText sx={{ color: grey[500] }}>Log Out</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button
            size="small"
            variant="contained"
            onClick={() => openAuthDialog()}
          >
            Login
          </Button>
        ))}
    </Box>
  );
});

export default CNav;
