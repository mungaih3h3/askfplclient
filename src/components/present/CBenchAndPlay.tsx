import { Stack } from "@mui/material";
import { FC } from "react";
import BenchAndPlay from "../../logic/Actions/BenchAndPlay";
import CPlayer from "./CPlayer";

interface CBenchAndPlayProps {
  btpt: BenchAndPlay;
}

const CBenchAndPlay: FC<CBenchAndPlayProps> = ({ btpt }) => {
  return (
    <Stack spacing={1}>
      <span>
        Bench
        <CPlayer player={btpt.playerIn} />
      </span>
      <span>
        Bench
        <CPlayer player={btpt.playerOut} />
      </span>
    </Stack>
  );
};

export default CBenchAndPlay;
