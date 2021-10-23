import { Badge, Stack, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { Box } from "@mui/system";
import produce from "immer";
import { FC, useState } from "react";
import TripleCaptain from "../../../logic/Actions/Chips/TripleCaptain";
import { fontSizes } from "../../../theme/fontSizes";
import CCreatePlayer from "../CCreatePlayer";

interface CCreateTCProps {
  initialTC: TripleCaptain;
  onChange: (tc: TripleCaptain) => any;
}

const CCreateTC: FC<CCreateTCProps> = ({ initialTC, onChange }) => {
  const [TC, setTC] = useState(initialTC);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
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
        <CCreatePlayer
          player={TC.player}
          onChange={(player) => {
            const newTC = produce(TC, (draft) => {
              draft.player = player;
            });
            setTC(newTC);
            onChange(newTC);
          }}
          blacklist={[]}
        />
      </Badge>
    </Box>
  );
};

export default CCreateTC;
