import { Person } from "@mui/icons-material";
import { Paper, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { FC } from "react";
import User from "../../logic/User";
import { fontSizes } from "../../theme/fontSizes";

interface CBotProps {
  user: User;
  onClick?: (user: User) => any;
}

const CBot: FC<CBotProps> = ({ user, onClick = () => {} }) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }} onClick={() => onClick(user)}>
      <Stack
        spacing={2}
        direction={"row"}
        sx={{ alignItems: "center", minWidth: 150 }}
      >
        <Person sx={{ color: grey[500] }} />
        <Box>
          <Typography sx={{ fontSize: fontSizes[1] }}>
            {user.username}
          </Typography>
          <Typography sx={{ color: grey[500] }}>bot</Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default CBot;
