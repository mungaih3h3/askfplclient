import {
  Button,
  IconButton,
  Stack,
  Typography,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import CPoll from "../components/present/CPoll";
import { VotesContext } from "../contexts/VotesProvider";
import {
  Menu as MenuIcon,
  AddBox,
  Logout,
  Add as AddIcon,
  ViewStream,
} from "@mui/icons-material";

import { CLoadingPoll } from "../components/loading/CLoadingPoll";
import Poll from "../logic/Poll";
import { fetchPolls } from "../api/Polls";
import { fontSizes } from "../theme/fontSizes";
import InfiniteScroll from "react-infinite-scroll-component";
import { getUserPollVotes } from "../api/Votes";
import { AuthContext } from "../contexts/AuthProvider";
import toast from "react-hot-toast";
import { CAuthDialog } from "../components/auth/CAuth";
import { Box } from "@mui/system";
import { grey, lime } from "@mui/material/colors";
import { WithAlpha } from "../HOC/WithAlpha";
import Publisher from "../logic/Publisher";

interface PPollsProps {}

const PPolls: FC<PPollsProps> = () => {
  const history = useHistory();
  const [polls, setPolls] = useState([] as Poll[]);
  const [error, setError] = useState({
    error: false,
    errorMessage: "",
  });
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { addVoteCounts, addUserVotes } = useContext(VotesContext);
  const { isAuthenticated, getToken, logOut } = useContext(AuthContext);
  const [authDialog, setAuthDialog] = useState(false);
  const [topMenu, setTopMenu] = useState(false);
  const topMenuAnchor = useRef(null);
  const getPaginatedPolls = async (
    startDate: Date,
    limit: number
  ): Promise<Poll[]> => {
    try {
      const {
        polls: newPolls,
        hasMore,
        voteCounts,
      } = await fetchPolls(startDate, limit);
      addVoteCounts(voteCounts);
      setLoading(false);
      setPolls((prevPolls) => prevPolls.concat(newPolls));
      setHasMore(hasMore);
      return newPolls;
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setError({
        error: true,
        errorMessage: error.message,
      });
      return [];
    }
  };
  const fetchUserVotes = async () => {
    try {
      const userPollVotes = await getUserPollVotes(
        await getToken(),
        polls.map((p) => p.id)
      );
      addUserVotes(userPollVotes);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (isAuthenticated()) {
      fetchUserVotes();
    }
  }, [polls]);
  useEffect(() => {
    setPolls([]);
    getPaginatedPolls(new Date(), 10);
  }, []);
  useEffect(() => {
    const fnId = Publisher.subscribeTo("login", () => {
      fetchUserVotes();
    });
    return () => {
      Publisher.unsubscribeTo("login", fnId);
    };
  }, []);
  return (
    <Stack spacing={1} sx={{ mb: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
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
            }}
          >
            Polls
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

        {isAuthenticated() ? (
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
              <MenuItem onClick={() => history.push("/create")}>
                <ListItemIcon>
                  <AddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add Poll</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => history.push("/userpolls")}>
                <ListItemIcon>
                  <ViewStream fontSize="small" />
                </ListItemIcon>
                <ListItemText>My Polls</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => logOut()}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Log Out</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button
            size="small"
            variant="contained"
            onClick={() => setAuthDialog(true)}
          >
            Login
          </Button>
        )}
      </Box>
      {!loading && !error.error && polls.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <em>No polls yet</em>
          <Button
            onClick={() => history.push("/create")}
            variant="outlined"
            startIcon={<AddBox />}
            size="small"
          >
            Add
          </Button>
        </div>
      )}
      {!loading && error.error && (
        <Stack spacing={0.5} sx={{ pt: 100, textAlign: "center" }}>
          <h4>Sorry, unexpected error</h4>
          <small>We are working on solving the problem. Be back soon</small>
        </Stack>
      )}
      <InfiniteScroll
        dataLength={polls.length}
        next={async () => {
          await getPaginatedPolls(
            new Date(polls[polls.length - 1].createdAt),
            10
          );
        }}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          polls.length !== 0 && (
            <Stack spacing={1} sx={{ textAlign: "center", py: 3 }}>
              <Typography>Yay! That's all for now</Typography>
              <Typography>Refresh for newer posts</Typography>
              <Button
                onClick={async () => {
                  setPolls([]);
                  setLoading(true);
                  await getPaginatedPolls(new Date(), 10);
                }}
              >
                Refresh
              </Button>
            </Stack>
          )
        }
      >
        <Stack spacing={5}>
          {!error.error &&
            loading &&
            new Array(4)
              .fill(null)
              .map((_, index) => <CLoadingPoll key={index} />)}
          {!error.error &&
            !loading &&
            polls.map((poll, index) => (
              <CPoll key={poll.id + index} poll={poll} />
            ))}
        </Stack>
      </InfiniteScroll>
      <CAuthDialog
        open={authDialog}
        onClose={() => setAuthDialog(false)}
        onAuth={() => setAuthDialog(false)}
      />
    </Stack>
  );
};

export default WithAlpha(PPolls);
