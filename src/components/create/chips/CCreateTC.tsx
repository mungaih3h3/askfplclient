import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import produce from "immer";
import { FC, useState } from "react";
import TripleCaptain from "../../../logic/Actions/Chips/TripleCaptain";
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
      <h4>TripleCaptain</h4>

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
    </Box>
  );
};

export default CCreateTC;
