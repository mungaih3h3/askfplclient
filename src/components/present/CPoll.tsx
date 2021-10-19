import {
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import { Box } from "@mui/system";
import { formatDistanceToNow } from "date-fns";
import { FC, useContext } from "react";
import { useHistory } from "react-router-dom";
import { PollContext } from "../../contexts/PollProvider";
import Poll from "../../logic/Poll";
import { fontSizes } from "../../theme/fontSizes";
import COption from "./COption";
import { Comment } from "@mui/icons-material";

interface CPollProps {
  poll: Poll;
}

const CPoll: FC<CPollProps> = ({ poll }) => {
  const { userVotes, vote, voteCount } = useContext(PollContext);
  const history = useHistory();
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={3}>
          <Stack spacing={1}>
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
            <Typography sx={{ fontWeight: 700, fontSize: fontSizes[5] }}>
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
                    ? indigo[700]
                    : "rgba(0,0,0,0)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
              onClick={() => vote(poll.id, option.id)}
            >
              <Box sx={{ flexGrow: 1 }}>
                <COption option={option} />
              </Box>
              <Typography
                sx={{ fontSize: fontSizes[5], p: 3, fontWeight: 700 }}
              >
                {(voteCount.get(poll.id)?.get(option.id) || 0) +
                  Number(userVotes.get(poll.id) === option.id)}
              </Typography>
            </Paper>
          ))}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              startIcon={<Comment />}
              onClick={() => history.push(`/comments/${poll.id}`)}
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
