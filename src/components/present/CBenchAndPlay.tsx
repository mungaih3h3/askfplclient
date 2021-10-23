import { Typography, Badge } from "@mui/material";
import { FC } from "react";
import BenchAndPlay from "../../logic/Actions/BenchAndPlay";
import CPlayer from "./CPlayer";
import { Box } from "@mui/system";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import { fontSizes } from "../../theme/fontSizes";

interface CBenchAndPlayProps {
  btpt: BenchAndPlay;
}

const CBenchAndPlay: FC<CBenchAndPlayProps> = ({ btpt }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
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
        <CPlayer player={btpt.playerIn} />
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
        <CPlayer player={btpt.playerOut} />
      </Badge>
    </Box>
  );
};

export default CBenchAndPlay;
