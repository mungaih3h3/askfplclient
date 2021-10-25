import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import Action, { ActionType } from "../../logic/Action";
import Transfer from "../../logic/Actions/Transfer";
import BenchAndPlay from "../../logic/Actions/BenchAndPlay";
import { Box } from "@mui/system";
import { chipFactory } from "./chips/CChipFactory";
import { ChipType } from "../../logic/Actions/Chip";
import Captain from "../../logic/Actions/Captain";
interface CActionFactoryProps {
  onCreate: (action: Action) => any;
}

const CActionFactory: FC<CActionFactoryProps> = ({ onCreate }) => {
  return (
    <Stack spacing={2}>
      {[ActionType.transfer, ActionType.benchandplay, ActionType.captain].map(
        (actionType) => (
          <Box
            key={actionType}
            onClick={() => onCreate(actionFactory(actionType))}
          >
            <Typography sx={{ textTransform: "capitalize" }}>
              {actionType}
            </Typography>
          </Box>
        )
      )}
      <Divider />
      {[
        ChipType.wildcard,
        ChipType.freehit,
        ChipType.triplecaptain,
        ChipType.benchboost,
      ].map((chipType) => (
        <Box
          key={chipType}
          onClick={() => {
            onCreate(chipFactory(chipType));
          }}
        >
          <Typography sx={{ textTransform: "capitalize" }}>
            {chipType}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
};

interface CActionFactoryDialogProps extends CActionFactoryProps {
  open: boolean;
  onClose: () => any;
}

export const CActionFactoryDialog: FC<CActionFactoryDialogProps> = ({
  open,
  onClose,
  ...rest
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Actions</DialogTitle>
      <DialogContent>
        <CActionFactory {...rest} />
      </DialogContent>
    </Dialog>
  );
};

function actionFactory(type: ActionType): Action {
  switch (type) {
    case ActionType.transfer:
      return new Transfer();
    case ActionType.benchandplay:
      return new BenchAndPlay();
    case ActionType.captain:
      return new Captain();
    default:
      throw new Error("Type factory cannot make type: " + type);
  }
}

export default CActionFactory;
