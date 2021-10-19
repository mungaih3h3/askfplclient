import { Button, Paper, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useState } from "react";
import Player from "../../logic/Player";
import { Blacklist, PlayerMarketDialog } from "./PlayerMarket";
import { CancelPresentation } from "@mui/icons-material";
import CPlayer from "../present/CPlayer";

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
          <Stack spacing={1} direction="row">
            <CPlayer player={player} />
            <Button
              startIcon={<CancelPresentation />}
              onClick={(e) => {
                e.stopPropagation();
                onChange(Player.getNull());
              }}
            ></Button>
          </Stack>
        ) : (
          <Box sx={{ p: 1 }}>
            <em>No player</em>
          </Box>
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
