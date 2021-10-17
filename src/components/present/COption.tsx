import { Card, CardContent } from "@mui/material";
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
        {option.actions.map((action) => (
          <CActionSwitch action={action} />
        ))}
      </CardContent>
    </Card>
  );
};

export default COption;
