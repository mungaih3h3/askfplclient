import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";

export const CNoPolls = () => {
  const history = useHistory();
  return (
    <Stack
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Typography>No polls yet</Typography>
      <Button
        onClick={() => history.push("/create")}
        variant="outlined"
        startIcon={<Add />}
        size="small"
      >
        Poll
      </Button>
    </Stack>
  );
};
