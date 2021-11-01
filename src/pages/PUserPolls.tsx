import { Stack } from "@mui/material";
import { FC, useContext } from "react";
import CPoll from "../components/present/CPoll";
import { WithAuthentication } from "../HOC/WithAuthentication";
import InfiniteScroll from "react-infinite-scroll-component";
import { DiscussionContext } from "../contexts/DiscussionProvider";
import { PollsContext, PollsProvider } from "../contexts/PollsProvider";

const PUserPolls: FC = () => {
  const { openDiscussion } = useContext(DiscussionContext);
  const {
    polls: userPolls,
    hasMore,
    fetchMorePolls,
    currentGW,
  } = useContext(PollsContext);
  return (
    <InfiniteScroll
      dataLength={userPolls.length}
      next={async () => {
        await fetchMorePolls();
      }}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <Stack spacing={5}>
        {userPolls.map((poll) => (
          <CPoll
            currentGW={currentGW}
            key={poll.id}
            poll={poll}
            onWantDiscussion={() => {
              openDiscussion(poll.id);
            }}
          />
        ))}
      </Stack>
    </InfiniteScroll>
  );
};

export default WithAuthentication(() => (
  <PollsProvider onlyUser={true}>
    <PUserPolls />
  </PollsProvider>
));
