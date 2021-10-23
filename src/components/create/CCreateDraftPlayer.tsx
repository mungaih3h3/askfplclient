import { IconButton, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useState } from "react";
import Player from "../../logic/Player";
import { Blacklist, PlayerMarketDialog } from "./PlayerMarket";
import { CancelPresentation } from "@mui/icons-material";
import { shortRole } from "../present/CPlayer";
import { fontSizes } from "../../theme/fontSizes";
import { grey } from "@mui/material/colors";
import CTeam from "../present/CTeam";

interface CCreateDraftPlayerProps {
  player: Player;
  onChange: (player: Player) => any;
  blacklist: Blacklist[];
  extra?: string;
}

const CCreateDraftPlayer: FC<CCreateDraftPlayerProps> = ({
  player,
  onChange,
  blacklist,
  extra = "",
}) => {
  const [playerMarketDialog, setPlayerMarketDialog] = useState(false);
  return (
    <>
      <Stack
        spacing={2}
        sx={{ display: "flex", alignItems: "center" }}
        onClick={() => {
          setPlayerMarketDialog(true);
        }}
      >
        <CTeam team={player.team} />
        {player.valid ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Paper sx={{ p: 1, textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: fontSizes[1],
                  fontWeight: 400,
                }}
              >
                {player.name}
              </Typography>
            </Paper>
          </Box>
        ) : (
          <Paper sx={{ p: 1, textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: fontSizes[1],
                fontWeight: 400,
              }}
            >
              Add{extra}
            </Typography>
          </Paper>
        )}
      </Stack>

      <PlayerMarketDialog
        open={playerMarketDialog}
        onClose={() => setPlayerMarketDialog(false)}
        onSelect={(player) => {
          onChange(player);
          setPlayerMarketDialog(false);
        }}
        blacklist={blacklist}
      />
    </>
  );
};

export default CCreateDraftPlayer;
