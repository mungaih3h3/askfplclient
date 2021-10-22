import {
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
  Badge,
} from "@mui/material";
import { FC } from "react";
import BenchAndPlay from "../../logic/Actions/BenchAndPlay";
import CPlayer from "./CPlayer";
import { ArrowForward } from "@mui/icons-material";
import { Box } from "@mui/system";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import { fontSizes } from "../../theme/fontSizes";

interface CBenchAndPlayProps {
  btpt: BenchAndPlay;
}

const CBenchAndPlay: FC<CBenchAndPlayProps> = ({ btpt }) => {
  return (
    <Stack spacing={2}>
      {/* <Typography sx={{}}>Bench and play</Typography> */}
      <Stack
        spacing={1}
        direction="row"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Badge
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
      </Stack>
    </Stack>
  );
};

export default CBenchAndPlay;
