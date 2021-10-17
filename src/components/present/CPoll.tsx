import { Card, CardContent, Stack } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { FC, useContext } from "react";
import { PollContext } from "../../contexts/PollProvider";
import Poll from "../../logic/Poll";
import COption from "./COption";

interface CPollProps {
  poll: Poll;
}

const CPoll: FC<CPollProps> = ({ poll }) => {
  const { userVotes, vote, voteCount } = useContext(PollContext);
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <div>
            <div style={{ display: "flex", gap: 10 }}>
              <p>{poll.username}</p>
              <p>
                {formatDistanceToNow(new Date(poll.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <p>{poll.title}</p>
          </div>
          {poll.options.map((option) => (
            <div
              style={{
                padding: 8,
                backgroundColor:
                  (userVotes.get(poll.id) || "") == option.id
                    ? "#D8E9A8"
                    : "rgba(0,0,0,0)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
              onClick={() => vote(poll.id, option.id)}
            >
              <COption option={option} />
              <p>
                {(voteCount.get(poll.id)?.get(option.id) || 0) +
                  Number(userVotes.get(poll.id) === option.id)}
              </p>
            </div>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CPoll;
