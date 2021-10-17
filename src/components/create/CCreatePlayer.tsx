import { Paper, Stack } from "@mui/material";
import { FC, useState } from "react";
import Player from "../../logic/Player";
import { Blacklist, PlayerMarketDialog } from "./PlayerMarket";

interface CCreatePlayerProps {
  player: Player;
  onChange: (player: Player) => any;
  blacklist: Blacklist[];
}

const CCreatePlayer: FC<CCreatePlayerProps> = ({
  player,
  onChange,
  blacklist,
}) => {
  const [playerMarketDialog, setPlayerMarketDialog] = useState(false);
  return (
    <>
      <Paper
        variant="outlined"
        sx={{ p: 1 }}
        onClick={() => setPlayerMarketDialog(true)}
      >
        {player.valid ? (
          <Stack spacing={1}>
            <h4>{player.name}</h4>
            <p>{player.role}</p>
          </Stack>
        ) : (
          <div>
            <em>No player</em>
          </div>
        )}
      </Paper>

      <PlayerMarketDialog
        open={playerMarketDialog}
        onClose={() => setPlayerMarketDialog(false)}
        onSelect={(player) => {
          onChange(player);
        }}
        blacklist={blacklist}
      />
    </>
  );
};

export default CCreatePlayer;
