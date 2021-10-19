import { Card, CardContent, Stack } from "@mui/material";
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
        {option.actions.length === 0 && <em>No actions. Good to go 💯</em>}
        <Stack spacing={2}>
          {option.actions.map((action) => (
            <CActionSwitch key={action.id} action={action} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default COption;
