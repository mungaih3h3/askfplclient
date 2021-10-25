import { FC } from "react";
import Action, { ActionType } from "../../logic/Action";
import BenchAndPlay from "../../logic/Actions/BenchAndPlay";
import Captain from "../../logic/Actions/Captain";
import Chip from "../../logic/Actions/Chip";
import Transfer from "../../logic/Actions/Transfer";
import CBenchAndPlay from "./CBenchAndPlay";
import CCaptain from "./CCaptain";
import CChipSwitch from "./chips/CChipSwitch";
import CTransfer from "./CTransfer";

interface CActionSwitchProps {
  action: Action;
}

const CActionSwitch: FC<CActionSwitchProps> = ({ action }) => {
  switch (action.type) {
    case ActionType.transfer:
      return <CTransfer transfer={action as Transfer} />;
    case ActionType.benchandplay:
      return <CBenchAndPlay btpt={action as BenchAndPlay} />;
    case ActionType.chip:
      return <CChipSwitch chip={action as Chip} />;
    case ActionType.captain:
      return <CCaptain captain={action as Captain} />;
    default:
      return <p>No renderer for action: {action.type}</p>;
  }
};

export default CActionSwitch;
