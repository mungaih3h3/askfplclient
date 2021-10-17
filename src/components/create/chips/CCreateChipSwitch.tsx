import { FC } from "react";
import Chip, { ChipType } from "../../../logic/Actions/Chip";
import TripleCaptain from "../../../logic/Actions/Chips/TripleCaptain";
import CCreateTC from "./CCreateTC";
import CCreateChipsWithDraft from "./CCreateChipsWithDraft";
import ChipWithDraft from "../../../logic/Actions/Chips/ChipWithDraft";

interface CCreateChipSwitchProps {
  initialChip: Chip;
  onChange: (chip: Chip) => any;
}

const CCreateChipSwitch: FC<CCreateChipSwitchProps> = ({
  onChange,
  initialChip,
}) => {
  switch (initialChip.chipType) {
    case ChipType.triplecaptain:
      return (
        <CCreateTC
          initialTC={initialChip as TripleCaptain}
          onChange={onChange}
        />
      );

    default:
      return (
        <CCreateChipsWithDraft
          initialChip={initialChip as ChipWithDraft}
          onChange={onChange}
        />
      );
  }
};

export default CCreateChipSwitch;
