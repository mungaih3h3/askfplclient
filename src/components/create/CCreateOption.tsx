import { Button, Card, CardContent, Paper } from "@mui/material";
import produce from "immer";
import { FC, useState } from "react";
import Option from "../../logic/Option";
import { CActionFactoryDialog } from "./CActionFactory";
import CCreateActionSwitch from "./CCreateActionSwitch";

interface CCreateOptionProps {
  onChange: (option: Option) => any;
  initialOption: Option;
}

const CCreateOption: FC<CCreateOptionProps> = ({ onChange, initialOption }) => {
  const [option, setOption] = useState(initialOption);
  const [actionFactoryDialog, setActionFactoryDialog] = useState(false);
  return (
    <>
      <Card>
        <CardContent>
          {option.actions.map((action, index) => (
            <CCreateActionSwitch
              action={action}
              onChange={(action) => {
                const newOption = produce(option, (draft) => {
                  draft.actions[index] = action;
                });
                setOption(newOption);
                onChange(newOption);
              }}
            />
          ))}
          <Button onClick={() => setActionFactoryDialog(true)}>
            Add new action
          </Button>
        </CardContent>
      </Card>
      <CActionFactoryDialog
        open={actionFactoryDialog}
        onClose={() => setActionFactoryDialog(false)}
        onCreate={(action) => {
          const newOption = produce(option, (draft) => {
            draft.actions.push(action);
          });
          setOption(newOption);
          onChange(newOption);
        }}
      />
    </>
  );
};

export default CCreateOption;
