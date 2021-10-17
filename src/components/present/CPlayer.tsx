import { Paper, Stack } from "@mui/material";
import { FC } from "react";
import Player from "../../logic/Player";

interface CPlayerProps {
  player: Player;
}

const CPlayer: FC<CPlayerProps> = ({ player }) => {
  return (
    <Paper variant="outlined" sx={{ p: 1 }}>
      <Stack spacing={1}>
        <h4>{player.name}</h4>
        <p>{player.role}</p>
      </Stack>
    </Paper>
  );
};

export default CPlayer;