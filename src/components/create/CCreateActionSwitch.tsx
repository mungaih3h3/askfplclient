import { FC } from "react";
import Action from "../../logic/Action";
import BenchAndPlay from "../../logic/Actions/BenchAndPlay";
import Chip from "../../logic/Actions/Chip";
import Transfer from "../../logic/Actions/Transfer";
import CCreateBenchAndPlay from "./CCreateBenchAndPlay";
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
    case "transfer":
      return (
        <CCreateTransfer
          initialTransfer={action as Transfer}
          onChange={onChange}
        />
      );
    case "benchandplay":
      return (
        <CCreateBenchAndPlay
          initialBtpt={action as BenchAndPlay}
          onChange={onChange}
        />
      );
    case "chip":
      return (
        <CCreateChipSwitch initialChip={action as Chip} onChange={onChange} />
      );
    default:
      return <p>No renderer for action: {action.type}</p>;
  }
};

export default CCreateActionSwitch;
