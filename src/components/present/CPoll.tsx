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
import { amber, grey, indigo } from "@mui/material/colors";
import { Box } from "@mui/system";
import { formatDistanceToNow } from "date-fns";
import { FC, useContext } from "react";
import { VotesContext } from "../../contexts/VotesProvider";
import Poll from "../../logic/Poll";
import { fontSizes } from "../../theme/fontSizes";
import COption from "./COption";
import { Comment, Lock, Share } from "@mui/icons-material";
import { AuthContext } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import { PollsContext } from "../../contexts/PollsProvider";
import COptionWrapper from "./COptionWrapper";

interface CPollProps {
  poll: Poll;
  onWantDiscussion: (pollId: string) => any;
  currentGW: number;
}

const CPoll: FC<CPollProps> = ({ poll, onWantDiscussion, currentGW }) => {
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
              <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
                {currentGW > poll.gw && <Lock sx={{ color: amber[500] }} />}
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
              </Stack>
            </Box>

            <Typography sx={{ fontSize: fontSizes[4] }}>
              {poll.title}
            </Typography>
          </Stack>
          {poll.options.map((option) => (
            <COptionWrapper
              key={option.id}
              {...{
                option,
                votePercent: () => {
                  const optionVotes =
                    voteCount.get(poll.id)?.get(option.id) || 0;
                  return (optionVotes / getTotalPollVotes(poll.id)) * 100;
                },
                pastDeadline: currentGW > poll.gw,
                vote: (optionId: string) => vote(poll.id, optionId),
                userSelection: userVotes.get(poll.id),
              }}
            />
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
