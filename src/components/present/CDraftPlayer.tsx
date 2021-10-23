import { Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import Player from "../../logic/Player";
import { fontSizes } from "../../theme/fontSizes";
import CTeam from "./CTeam";

interface CDraftPlayerProps {
  player: Player;
}

const CDraftPlayer: FC<CDraftPlayerProps> = ({ player }) => {
  return (
    <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
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
            Add
          </Typography>
        </Paper>
      )}
    </Stack>
  );
};

export default CDraftPlayer;
