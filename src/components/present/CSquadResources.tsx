import { Stack, Typography, Paper, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { FC } from "react";
import SquadResources from "../../logic/SquadResources";

interface CSquadResourcesProps {
  resources: SquadResources;
}

const CSquadResources: FC<CSquadResourcesProps> = ({ resources }) => {
  return (
    <Paper variant="outlined" sx={{ display: "inline-flex", mb: 4 }}>
      <Stack direction="row" spacing={2} sx={{ py: 1, px: 2 }}>
        <Stack spacing={1} direction="row">
          <Typography sx={{ fontWeight: 600 }}>{resources.bank}£</Typography>
          <Typography sx={{ color: grey[500] }}> remaining</Typography>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack spacing={1} direction="row">
          <Typography sx={{ fontWeight: 600 }}>{resources.hits}</Typography>
          <Typography sx={{ color: grey[500] }}> hit</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CSquadResources;
