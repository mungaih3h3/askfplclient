import { Card, CardContent, Stack, Typography } from "@mui/material";
import { FC } from "react";
import Option from "../../logic/Option";
import CActionSwitch from "./CActionSwitch";

interface COptionProps {
  option: Option;
}

const COption: FC<COptionProps> = ({ option }) => {
  return (
    <Card>
      <CardContent>
        {option.actions.length === 0 && (
          <Typography>No actions. Good to go 💯</Typography>
        )}
        <Stack spacing={3} sx={{ alignItems: "flex-start" }}>
          {option.actions.map((action) => (
            <CActionSwitch key={action.id} action={action} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default COption;
