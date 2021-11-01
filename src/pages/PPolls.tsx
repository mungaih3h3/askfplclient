import { Stack, Typography } from "@mui/material";
import { FC, useContext } from "react";
import CPoll from "../components/present/CPoll";
import InfiniteScroll from "react-infinite-scroll-component";
import { DiscussionContext } from "../contexts/DiscussionProvider";
import { PollsContext, PollsProvider } from "../contexts/PollsProvider";

const PPolls: FC = () => {
  const { hasMore, fetchMorePolls, polls, currentGW } =
    useContext(PollsContext);
  const { openDiscussion } = useContext(DiscussionContext);
  return (
    <InfiniteScroll
      dataLength={polls.length}
      next={async () => {
        await fetchMorePolls();
      }}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        polls.length !== 0 && (
          <Stack spacing={1} sx={{ textAlign: "center", py: 3 }}>
            <Typography>Yay! That's all for now</Typography>
          </Stack>
        )
      }
    >
      <Stack spacing={5}>
        {polls.map((poll, index) => (
          <CPoll
            key={poll.id + index}
            poll={poll}
            onWantDiscussion={(pollId) => {
              openDiscussion(poll.id);
            }}
            currentGW={currentGW}
          />
        ))}
      </Stack>
    </InfiniteScroll>
  );
};

export default () => (
  <PollsProvider>
    <PPolls />
  </PollsProvider>
);
