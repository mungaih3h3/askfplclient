import { Stack } from "@mui/material";
import { FC } from "react";
import TripleCaptain from "../../../logic/Actions/Chips/TripleCaptain";
import CPlayer from "../CPlayer";

interface CTCProps {
  tc: TripleCaptain;
}

const CTC: FC<CTCProps> = ({ tc }) => {
  return (
    <Stack spacing={1}>
      <h4>Triple Captain</h4>
      <CPlayer player={tc.player} />
    </Stack>
  );
};

export default CTC;
