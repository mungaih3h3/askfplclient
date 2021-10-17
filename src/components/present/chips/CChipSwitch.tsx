import { FC } from "react";
import Chip, { ChipType } from "../../../logic/Actions/Chip";
import ChipWithDraft from "../../../logic/Actions/Chips/ChipWithDraft";
import TripleCaptain from "../../../logic/Actions/Chips/TripleCaptain";
import CChipsWithDraft from "./CChipsWithDraft";
import CTC from "./CTC";

interface CChipSwitchProps {
  chip: Chip;
}

const CChipSwitch: FC<CChipSwitchProps> = ({ chip }) => {
  switch (chip.chipType) {
    case ChipType.triplecaptain:
      return <CTC tc={chip as TripleCaptain} />;
    default:
      return <CChipsWithDraft chip={chip as ChipWithDraft} />;
  }
};

export default CChipSwitch;
