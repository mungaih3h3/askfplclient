import {
  Button,
  Card,
  CardContent,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import { Box } from "@mui/system";
import { formatDistanceToNow } from "date-fns";
import { FC, useContext } from "react";
import { VotesContext } from "../../contexts/VotesProvider";
import Poll from "../../logic/Poll";
import { fontSizes } from "../../theme/fontSizes";
import COption from "./COption";
import { Comment, Share } from "@mui/icons-material";
import { AuthContext } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";

interface CPollProps {
  poll: Poll;
  onWantDiscussion: (pollId: string) => any;
}

const CPoll: FC<CPollProps> = ({ poll, onWantDiscussion }) => {
  const { userVotes, vote, voteCount, getTotalPollVotes } =
    useContext(VotesContext);
  const { isAuthenticated, openAuthDialog } = useContext(AuthContext);
  const theme = useTheme();
  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack
                spacing={1}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: grey[700],
                  fontSize: fontSizes[2],
                }}
                direction="row"
              >
                <span>{poll.username}</span>
                <span>-</span>
                <span>
                  {formatDistanceToNow(new Date(poll.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </Stack>
              <Paper
                sx={{
                  py: 1,
                  px: 2,
                  display: "flex",
                  alignItems: "center",
                }}
                variant="outlined"
              >
                <Typography sx={{ color: grey[500] }}>GW{poll.gw}</Typography>
              </Paper>
            </Box>

            <Typography sx={{ fontSize: fontSizes[4] }}>
              {poll.title}
            </Typography>
          </Stack>
          {poll.options.map((option) => (
            <Paper
              key={option.id}
              variant="outlined"
              sx={{
                padding: 2,
                backgroundColor:
                  (userVotes.get(poll.id) || "") === option.id
                    ? theme.palette.primary.main
                    : theme.palette.background.default,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              onClick={async () => {
                if (!isAuthenticated()) {
                  openAuthDialog();
                } else {
                  vote(poll.id, option.id);
                }
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <COption option={option} />
              </Box>
              {userVotes.get(poll.id) !== undefined && (
                <Typography
                  sx={{ fontSize: fontSizes[5], p: 3, fontWeight: 700 }}
                >
                  {voteCount.get(poll.id)?.get(option.id) || 0} votes
                </Typography>
              )}
            </Paper>
          ))}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(
                  window.location.origin + "/poll/" + poll.id
                );
                toast.success("Link copied to clipboard");
              }}
            >
              <Share />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Comment />}
              onClick={() => onWantDiscussion(poll.id)}
            >
              Discussion
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CPoll;
