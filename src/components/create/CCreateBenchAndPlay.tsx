import { Card, Box, Badge, Stack, Typography } from "@mui/material";
import produce from "immer";
import { FC, useState } from "react";
import BenchAndPlay from "../../logic/Actions/BenchAndPlay";
import CCreatePlayer from "./CCreatePlayer";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import { fontSizes } from "../../theme/fontSizes";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Badge
        sx={{ flex: 1 }}
        badgeContent={
          <Box
            sx={{
              position: "absolute",
              right: 24,
              px: 2,
              backgroundColor: red[100],
              color: red[900],
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowUpward sx={{ fontSize: fontSizes[0], fontWeight: 600 }} />
            <Typography sx={{ fontSize: fontSizes[0], fontWeight: 600 }}>
              BENCH
            </Typography>
          </Box>
        }
      >
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
      </Badge>
      <Badge
        sx={{ flex: 1 }}
        badgeContent={
          <Box
            sx={{
              position: "absolute",
              right: 24,
              px: 2,
              backgroundColor: green[100],
              color: green[900],
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowDownward sx={{ fontSize: fontSizes[0], fontWeight: 600 }} />
            <Typography sx={{ fontSize: fontSizes[0], fontWeight: 600 }}>
              PLAY
            </Typography>
          </Box>
        }
      >
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
      </Badge>
    </Box>
  );
};

export default CCreateBenchAndPlay;
