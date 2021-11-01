import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import { ReactComponent as AddPost } from "../../illustrations/addpost.svg";

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
      <Box sx={{ py: 2, pt: 4 }}>
        <AddPost width={200} height={150} style={{ zIndex: 0 }} />
      </Box>
      <Typography>Create your first poll</Typography>
      <Button
        onClick={() => history.push("/create")}
        variant="contained"
        startIcon={<Add />}
        size="small"
      >
        Poll
      </Button>
    </Stack>
  );
};
