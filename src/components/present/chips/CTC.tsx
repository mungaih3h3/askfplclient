import { Stack, Typography, Badge, Box } from "@mui/material";
import { green } from "@mui/material/colors";
import { FC } from "react";
import TripleCaptain from "../../../logic/Actions/Chips/TripleCaptain";
import { fontSizes } from "../../../theme/fontSizes";
import CPlayer from "../CPlayer";

interface CTCProps {
  tc: TripleCaptain;
}

const CTC: FC<CTCProps> = ({ tc }) => {
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
            X3
          </Typography>
        </Box>
      }
    >
      <CPlayer player={tc.player} />
    </Badge>
  );
};

export default CTC;
