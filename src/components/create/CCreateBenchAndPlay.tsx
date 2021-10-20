import { Card, CardContent, Stack, Typography } from "@mui/material";
import produce from "immer";
import { FC, useState } from "react";
import BenchAndPlay from "../../logic/Actions/BenchAndPlay";
import CCreatePlayer from "./CCreatePlayer";
import { ArrowForward } from "@mui/icons-material";

interface CCreateBenchAndPlayProps {
  initialBtpt: BenchAndPlay;
  onChange: (btpt: BenchAndPlay) => any;
}

const CCreateBenchAndPlay: FC<CCreateBenchAndPlayProps> = ({
  initialBtpt,
  onChange,
}) => {
  const [btpt, setBtpt] = useState(initialBtpt);
  return (
    <Stack spacing={1}>
      <Typography sx={{}}>Bench and play</Typography>
      <Stack spacing={2}>
        <CCreatePlayer
          extra="(in)"
          player={btpt.playerIn}
          onChange={(newPlayer) => {
            setBtpt(
              produce((draft) => {
                draft.playerIn = newPlayer;
              })
            );
          }}
          blacklist={[
            {
              type: "player",
              value: btpt.playerOut,
            },
          ]}
        />
        <CCreatePlayer
          extra={"(out)"}
          player={btpt.playerOut}
          onChange={(newPlayer) => {
            const newBtpt = produce(btpt, (draft) => {
              draft.playerOut = newPlayer;
            });
            setBtpt(newBtpt);
            onChange(newBtpt);
          }}
          blacklist={[
            {
              type: "player",
              value: btpt.playerIn,
            },
          ]}
        />
      </Stack>
    </Stack>
  );
};

export default CCreateBenchAndPlay;
