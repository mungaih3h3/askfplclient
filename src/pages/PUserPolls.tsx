import { Button, IconButton, Stack } from "@mui/material";
import { FC, useContext } from "react";
import { useHistory } from "react-router-dom";
import CPoll from "../components/present/CPoll";
import { PollContext } from "../contexts/PollProvider";
import { WithAuthentication } from "../HOC/WithAuthentication";
import { Explore, AddBox } from "@mui/icons-material";
interface PUserPollsProps {}

const PUserPolls: FC<PUserPollsProps> = () => {
  const { userPolls } = useContext(PollContext);
  const history = useHistory();
  return (
    <Stack spacing={1}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <h2>User polls</h2>
        <IconButton
          onClick={() => {
            history.push("/");
          }}
        >
          <Explore />
        </IconButton>
      </div>
      {userPolls.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <em>You dont have any polls yet</em>
          <Button
            variant="outlined"
            onClick={() => {
              history.push("/create");
            }}
            startIcon={<AddBox />}
          >
            Add poll
          </Button>
        </div>
      )}
      {userPolls.map((poll) => (
        <CPoll key={poll.id} poll={poll} />
      ))}
    </Stack>
  );
};

export default WithAuthentication(PUserPolls);
