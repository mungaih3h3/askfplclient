import { Button, Dialog, DialogContent, Stack } from "@mui/material";
import { FC } from "react";
import Chip, { ChipType } from "../../../logic/Actions/Chip";
import BenchBoost from "../../../logic/Actions/Chips/BenchBoost";
import FreeHit from "../../../logic/Actions/Chips/FreeHit";
import TripleCaptain from "../../../logic/Actions/Chips/TripleCaptain";
import WildCard from "../../../logic/Actions/Chips/WildCard";
import Player from "../../../logic/Player";

interface CChipFactoryProps {
  onCreate: (chip: Chip) => any;
}

const CChipFactory: FC<CChipFactoryProps> = ({ onCreate }) => {
  return (
    <Stack spacing={1}>
      {[
        ChipType.wildcard,
        ChipType.freehit,
        ChipType.triplecaptain,
        ChipType.benchboost,
      ].map((chipType) => (
        <Button
          key={chipType}
          onClick={() => {
            onCreate(chipFactory(chipType));
          }}
        >
          {chipType}
        </Button>
      ))}
    </Stack>
  );
};

interface CChipFactoryDialogProps extends CChipFactoryProps {
  open: boolean;
  onClose: () => any;
}

export const CChipFactoryDialog: FC<CChipFactoryDialogProps> = ({
  open,
  onClose,
  ...rest
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <CChipFactory {...rest} />
      </DialogContent>
    </Dialog>
  );
};

function chipFactory(type: ChipType): Chip {
  switch (type) {
    case ChipType.wildcard:
      return new WildCard();
    case ChipType.freehit:
      return new FreeHit();
    case ChipType.triplecaptain:
      return new TripleCaptain(Player.getNull());
    case ChipType.benchboost:
      return new BenchBoost();
    default:
      throw new Error("Invalid chip type");
  }
}

export default CChipFactory;
