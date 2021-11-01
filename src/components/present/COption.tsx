import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import Option from "../../logic/Option";
import CActionSwitch from "./CActionSwitch";
import CSquadResources from "./CSquadResources";

interface COptionProps {
  option: Option;
}

const COption: FC<COptionProps> = ({ option }) => {
  return (
    <Box sx={{ p: 2 }}>
      {option.actions.length === 0 && (
        <Typography>No actions. Good to go 💯</Typography>
      )}
      {option.actions.length !== 0 && (
        <CSquadResources resources={option.resources} />
      )}
      <Stack spacing={3} sx={{ alignItems: "flex-start" }}>
        {option.actions.map((action) => (
          <CActionSwitch key={action.id} action={action} />
        ))}
      </Stack>
    </Box>
  );
};

export default COption;
