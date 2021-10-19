import { Paper, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { Box } from "@mui/system";
import { FC } from "react";
import Player from "../../logic/Player";
import { fontSizes } from "../../theme/fontSizes";

interface CPlayerProps {
  player: Player;
}

const CPlayer: FC<CPlayerProps> = ({ player }) => {
  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      {player.valid ? (
        <Box>
          <Typography
            sx={{
              fontSize: fontSizes[3],
              fontWeight: 600,
            }}
          >
            {player.name}
          </Typography>
          <Box sx={{ display: "inline-flex" }}>
            <Paper
              variant="outlined"
              sx={{
                p: 1,
                backgroundColor: indigo[100],
              }}
            >
              <Typography
                sx={{
                  fontSize: fontSizes[0],
                  color: indigo[900],
                  fontWeight: 700,
                }}
              >
                {player.role.toUpperCase()}
              </Typography>
            </Paper>
          </Box>
        </Box>
      ) : (
        <em>No Player</em>
      )}
    </Paper>
  );
};

export default CPlayer;
