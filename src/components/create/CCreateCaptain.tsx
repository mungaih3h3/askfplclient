import { Badge, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { Box } from "@mui/system";
import produce from "immer";
import { FC, useState } from "react";
import { fontSizes } from "../../theme/fontSizes";
import CCreatePlayer from "./CCreatePlayer";
import Captain from "../../logic/Actions/Captain";

interface CCreateCaptainProps {
  initialCaptain: Captain;
  onChange: (tc: Captain) => any;
}

const CCreateCaptain: FC<CCreateCaptainProps> = ({
  initialCaptain: initialCaptain,
  onChange,
}) => {
  const [cap, setCap] = useState(initialCaptain);
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
              X{cap.times}
            </Typography>
          </Box>
        }
      >
        <CCreatePlayer
          player={cap.player}
          onChange={(player) => {
            const newTC = produce(cap, (draft) => {
              draft.player = player;
            });
            setCap(newTC);
            onChange(newTC);
          }}
          blacklist={[]}
        />
      </Badge>
    </Box>
  );
};

export default CCreateCaptain;
