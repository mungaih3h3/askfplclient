import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { FC } from "react";
import Action from "../../logic/Action";
import Transfer from "../../logic/Actions/Transfer";
import BenchAndPlay from "../../logic/Actions/BenchAndPlay";
import { Box } from "@mui/system";
interface CActionFactoryProps {
  onCreate: (action: Action) => any;
}

const CActionFactory: FC<CActionFactoryProps> = ({ onCreate }) => {
  return (
    <Stack spacing={2}>
      {["transfer", "bench and play"].map((actionType) => (
        <Box key={actionType}>
          <Button
            size="small"
            key={actionType}
            onClick={() => onCreate(actionFactory(actionType))}
          >
            {actionType}
          </Button>
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

function actionFactory(type: string): Action {
  switch (type) {
    case "transfer":
      return new Transfer();
    case "bench and play":
      return new BenchAndPlay();
    default:
      throw new Error("Type factory cannot make type: " + type);
  }
}

export default CActionFactory;
