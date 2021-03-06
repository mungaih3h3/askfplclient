import { IconButton, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useState } from "react";
import Player from "../../logic/Player";
import { Blacklist, PlayerMarketDialog } from "./PlayerMarket";
import { CancelPresentation, Clear } from "@mui/icons-material";
import { shortRole } from "../present/CPlayer";
import { fontSizes } from "../../theme/fontSizes";
import { grey } from "@mui/material/colors";
import CTeam from "../present/CTeam";

interface CCreatePlayerProps {
  player: Player;
  onChange: (player: Player) => any;
  blacklist: Blacklist[];
  extra?: string;
}

const CCreatePlayer: FC<CCreatePlayerProps> = ({
  player,
  onChange,
  blacklist,
  extra = "",
}) => {
  const [playerMarketDialog, setPlayerMarketDialog] = useState(false);
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
        onClick={() => setPlayerMarketDialog(true)}
      >
        <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
          <CTeam team={player.team} />
          {player.valid ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: fontSizes[1],
                    fontWeight: 400,
                  }}
                >
                  {player.name} {extra}
                </Typography>
                <Stack spacing={1} direction="row">
                  <Box sx={{ display: "inline-flex", py: 1 }}>
                    <Typography
                      sx={{
                        fontSize: fontSizes[0],
                        color: grey[300],
                      }}
                    >
                      {player.team.shortName.toUpperCase()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "inline-flex", py: 1 }}>
                    <Typography
                      sx={{
                        fontSize: fontSizes[0],
                        color: grey[500],
                      }}
                    >
                      {shortRole(player.role).toUpperCase()}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
          ) : (
            <Box sx={{ p: 1 }}>
              <Typography>Add</Typography>
            </Box>
          )}
        </Stack>
        {player.valid && (
          <IconButton
            sx={{ p: 0, m: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              onChange(Player.getNull());
            }}
          >
            <Clear sx={{ color: grey[500], fontSize: fontSizes[3] }} />
          </IconButton>
        )}
      </Paper>

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

export default CCreatePlayer;
