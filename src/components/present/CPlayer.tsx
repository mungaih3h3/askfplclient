import { Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { FC } from "react";
import Player, { PlayerRole } from "../../logic/Player";
import { fontSizes } from "../../theme/fontSizes";

interface CPlayerProps {
  player: Player;
}

export function shortRole(role: PlayerRole) {
  switch (role) {
    case PlayerRole.goalkeeper:
      return "gk";
    case PlayerRole.defender:
      return "def";
    case PlayerRole.midfielder:
      return "mid";
    case PlayerRole.forward:
      return "fwd";
    default:
      throw new Error("invalid role: " + role);
  }
}

const CPlayer: FC<CPlayerProps> = ({ player }) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      {player.valid ? (
        <Box>
          <Typography
            sx={{
              fontSize: fontSizes[2],
              fontWeight: 500,
            }}
          >
            {player.name}
          </Typography>
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
        </Box>
      ) : (
        <em>No Player</em>
      )}
    </Paper>
  );
};

export default CPlayer;
