import { Typography, Badge, Box } from "@mui/material";
import { green } from "@mui/material/colors";
import { FC } from "react";
import { fontSizes } from "../../theme/fontSizes";
import Captain from "../../logic/Actions/Captain";
import CPlayer from "./CPlayer";

interface CCaptainProps {
  captain: Captain;
}

const CCaptain: FC<CCaptainProps> = ({ captain }) => {
  return (
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
          <Typography sx={{ fontSize: fontSizes[0], fontWeight: 600 }}>
            X{captain.times}
          </Typography>
        </Box>
      }
    >
      <CPlayer player={captain.player} />
    </Badge>
  );
};

export default CCaptain;
