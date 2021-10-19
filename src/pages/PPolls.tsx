import { Button, IconButton, Stack } from "@mui/material";
import { FC, useContext } from "react";
import { useHistory } from "react-router-dom";
import CPoll from "../components/present/CPoll";
import { PollContext } from "../contexts/PollProvider";
import { AddBox } from "@mui/icons-material";
import { CLoadingPoll } from "../components/loading/CLoadingPoll";

interface PPollsProps {}

const PPolls: FC<PPollsProps> = () => {
  const { polls, loading, error, errorMessage } = useContext(PollContext);
  const history = useHistory();

  return (
    <Stack spacing={1} sx={{ mb: 6 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <h2>Polls</h2>
        <IconButton onClick={() => history.push("/create")}>
          <AddBox />
        </IconButton>
      </div>
      {polls.length === 0 && (
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
      {error ? (
        <Stack spacing={0.5} sx={{ pt: 100, textAlign: "center" }}>
          <h4>Sorry, unexpected error</h4>
          <small>We are working on solving the problem. Be back soon</small>
        </Stack>
      ) : (
        <Stack spacing={2}>
          {loading
            ? new Array(4)
                .fill(null)
                .map((_, index) => <CLoadingPoll key={index} />)
            : polls.map((poll) => <CPoll key={poll.id} poll={poll} />)}
        </Stack>
      )}
    </Stack>
  );
};

export default PPolls;
