import { Stack } from "@mui/material";
import { FC, useContext } from "react";
import CPoll from "../components/present/CPoll";
import { PollContext } from "../contexts/PollProvider";
import { WithAuthentication } from "../HOC/WithAuthentication";

interface PUserPollsProps {}

const PUserPolls: FC<PUserPollsProps> = () => {
  const { userPolls } = useContext(PollContext);
  return (
    <Stack spacing={1}>
      <h2>User polls</h2>
      {userPolls.map((poll) => (
        <CPoll poll={poll} />
      ))}
    </Stack>
  );
};

export default WithAuthentication(PUserPolls);
