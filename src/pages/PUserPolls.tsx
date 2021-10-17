import { Stack } from "@mui/material";
import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import CPoll from "../components/present/CPoll";
import { PollContext } from "../contexts/PollProvider";
import { WithAuthentication } from "../HOC/WithAuthentication";

interface PUserPollsProps {}

const PUserPolls: FC<PUserPollsProps> = () => {
  const { userPolls } = useContext(PollContext);
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
        <Link to="/">Explore</Link>
      </div>
      {userPolls.map((poll) => (
        <CPoll poll={poll} />
      ))}
    </Stack>
  );
};

export default WithAuthentication(PUserPolls);
