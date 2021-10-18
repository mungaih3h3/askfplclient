import { Button, IconButton, Paper, Stack } from "@mui/material";
import { FC, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import CPoll from "../components/present/CPoll";
import { PollContext } from "../contexts/PollProvider";
import { AddBox } from "@mui/icons-material";

interface PPollsProps {}

const PPolls: FC<PPollsProps> = () => {
  const { polls } = useContext(PollContext);
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
        <Button
          onClick={() => history.push("/create")}
          variant="outlined"
          startIcon={<AddBox />}
          size="small"
        >
          Add
        </Button>
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
      <Stack spacing={2}>
        {polls.map((poll) => (
          <CPoll poll={poll} />
        ))}
      </Stack>
    </Stack>
  );
};

export default PPolls;
