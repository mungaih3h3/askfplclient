import { Stack } from "@mui/material";
import produce from "immer";
import { FC, useState } from "react";
import BenchAndPlay from "../../logic/Actions/BenchAndPlay";
import Player from "../../logic/Player";
import CCreatePlayer from "./CCreatePlayer";

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
    <Stack spacing={2}>
      <span>
        Bench
        <CCreatePlayer
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
        <span
          onClick={() => {
            setBtpt(
              produce((draft) => {
                draft.playerIn = Player.getNull();
              })
            );
          }}
        >
          reset
        </span>
      </span>
      <span>
        Play
        <CCreatePlayer
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
        <span
          onClick={() => {
            const newBtpt = produce(btpt, (draft) => {
              draft.playerOut = Player.getNull();
            });
            setBtpt(newBtpt);
            onChange(newBtpt);
          }}
        >
          reset
        </span>
      </span>
    </Stack>
  );
};

export default CCreateBenchAndPlay;
