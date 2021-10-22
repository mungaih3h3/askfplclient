import { Paper, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { FC } from "react";
import Player, { PlayerRole } from "../../logic/Player";
import { fontSizes } from "../../theme/fontSizes";
import arsenal from "../../jerseys/arsenal.webp";
import CTeam from "./CTeam";
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
      <Stack
        spacing={2}
        direction="row"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <CTeam team={player.team} />
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
        ) : (
          <em>No Player</em>
        )}
      </Stack>
    </Paper>
  );
};

export default CPlayer;
