import { Button, Card, CardContent, Stack } from "@mui/material";
import produce from "immer";
import { FC, useState } from "react";
import Option from "../../logic/Option";
import { CActionFactoryDialog } from "./CActionFactory";
import CCreateActionSwitch from "./CCreateActionSwitch";
import { CChipFactoryDialog } from "./chips/CChipFactory";
import { Add } from "@mui/icons-material";
interface CCreateOptionProps {
  onChange: (option: Option) => any;
  initialOption: Option;
}

const CCreateOption: FC<CCreateOptionProps> = ({ onChange, initialOption }) => {
  const [option, setOption] = useState(initialOption);
  const [actionFactoryDialog, setActionFactoryDialog] = useState(false);
  const [chipFactoryDialog, setChipFactoryDialog] = useState(false);
  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            {option.actions.length === 0 && <em>No actions</em>}
            {option.actions.map((action, index) => (
              <CCreateActionSwitch
                key={action.id}
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
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() => setActionFactoryDialog(true)}
              >
                Add action
              </Button>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() => setChipFactoryDialog(true)}
              >
                Add chip
              </Button>
            </Stack>
          </Stack>
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
      <CChipFactoryDialog
        open={chipFactoryDialog}
        onClose={() => setChipFactoryDialog(false)}
        onCreate={(chip) => {
          const newOption = produce(option, (draft) => {
            draft.actions.push(chip);
          });
          setOption(newOption);
          onChange(newOption);
        }}
      />
    </>
  );
};

export default CCreateOption;
