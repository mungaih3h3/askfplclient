import { Card, CardContent, Stack, Typography } from "@mui/material";
import { FC } from "react";
import BenchAndPlay from "../../logic/Actions/BenchAndPlay";
import CPlayer from "./CPlayer";
import { ArrowForward } from "@mui/icons-material";
interface CBenchAndPlayProps {
  btpt: BenchAndPlay;
}

const CBenchAndPlay: FC<CBenchAndPlayProps> = ({ btpt }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Typography sx={{ fontWeight: 700 }}>Bench and play</Typography>

          <Stack
            spacing={2}
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <CPlayer player={btpt.playerIn} />
            <ArrowForward />
            <CPlayer player={btpt.playerOut} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CBenchAndPlay;
