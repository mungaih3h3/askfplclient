import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import produce from "immer";
import { FC, useState } from "react";
import Option from "../../logic/Option";
import { CActionFactoryDialog } from "./CActionFactory";
import CCreateActionSwitch from "./CCreateActionSwitch";
import { CChipFactoryDialog } from "./chips/CChipFactory";
import { Add } from "@mui/icons-material";
import { Box } from "@mui/system";
interface CCreateOptionProps {
  onChange: (option: Option) => any;
  initialOption: Option;
}

const CCreateOption: FC<CCreateOptionProps> = ({ onChange, initialOption }) => {
  return (
    <>
      <Stack spacing={3} sx={{ py: 4 }}>
        {initialOption.actions.length === 0 && (
          <Typography>No actions. Good to go 💯</Typography>
        )}
        {initialOption.actions.map((action, index) => (
          <CCreateActionSwitch
            key={action.id}
            action={action}
            onChange={(action) => {
              const newOption = produce(initialOption, (draft) => {
                draft.actions[index] = action;
              });
              onChange(newOption);
            }}
          />
        ))}
      </Stack>
    </>
  );
};

export default CCreateOption;
