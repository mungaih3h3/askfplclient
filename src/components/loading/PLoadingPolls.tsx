import { Stack } from "@mui/material";
import { CLoadingPoll } from "./CLoadingPoll";

export const PLoadingPolls = () => {
  return (
    <Stack spacing={2}>
      {new Array(10).fill(null).map((_, index) => (
        <CLoadingPoll key={index} />
      ))}
    </Stack>
  );
};
