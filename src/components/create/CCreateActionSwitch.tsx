import { FC } from "react";
import Action, { ActionType } from "../../logic/Action";
import BenchAndPlay from "../../logic/Actions/BenchAndPlay";
import Captain from "../../logic/Actions/Captain";
import Chip from "../../logic/Actions/Chip";
import Transfer from "../../logic/Actions/Transfer";
import CCreateBenchAndPlay from "./CCreateBenchAndPlay";
import CCreateCaptain from "./CCreateCaptain";
import CCreateTransfer from "./CCreateTransfer";
import CCreateChipSwitch from "./chips/CCreateChipSwitch";

interface CCreateActionSwitchProps {
  action: Action;
  onChange: (action: Action) => any;
}

const CCreateActionSwitch: FC<CCreateActionSwitchProps> = ({
  action,
  onChange,
}) => {
  switch (action.type) {
    case ActionType.transfer:
      return (
        <CCreateTransfer
          initialTransfer={action as Transfer}
          onChange={onChange}
        />
      );
    case ActionType.benchandplay:
      return (
        <CCreateBenchAndPlay
          initialBtpt={action as BenchAndPlay}
          onChange={onChange}
        />
      );
    case ActionType.chip:
      return (
        <CCreateChipSwitch initialChip={action as Chip} onChange={onChange} />
      );
    case ActionType.captain:
      return (
        <CCreateCaptain
          initialCaptain={action as Captain}
          onChange={onChange}
        />
      );
    default:
      return <p>No renderer for action: {action.type}</p>;
  }
};

export default CCreateActionSwitch;
