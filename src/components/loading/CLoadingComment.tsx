import { Skeleton, Stack } from "@mui/material";
import { FC } from "react";

export const CLoadingComment: FC = () => {
  return (
    <Stack spacing={2}>
      <Skeleton variant="text" width={300} />
      <Skeleton variant="rectangular" height={80} />
    </Stack>
  );
};
