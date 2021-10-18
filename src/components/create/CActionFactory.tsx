import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
} from "@mui/material";
import { FC } from "react";
import Action from "../../logic/Action";
import Transfer from "../../logic/Actions/Transfer";
import BenchAndPlay from "../../logic/Actions/BenchAndPlay";
interface CActionFactoryProps {
  onCreate: (action: Action) => any;
}

const CActionFactory: FC<CActionFactoryProps> = ({ onCreate }) => {
  return (
    <Card>
      <CardContent>
        {["transfer", "bench and play"].map((actionType) => (
          <Button
            key={actionType}
            onClick={() => onCreate(actionFactory(actionType))}
          >
            {actionType}
          </Button>
        ))}
      </CardContent>
    </Card>
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
