import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import TripleCaptain from "../../../logic/Actions/Chips/TripleCaptain";
import CPlayer from "../CPlayer";

interface CTCProps {
  tc: TripleCaptain;
}

const CTC: FC<CTCProps> = ({ tc }) => {
  return (
    <Stack spacing={0}>
      <Typography sx={{ fontWeight: 700, pb: 1 }}>Triple Captain</Typography>
      <CPlayer player={tc.player} />
    </Stack>
  );
};

export default CTC;
