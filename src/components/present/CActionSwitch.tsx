import { FC } from "react";
import Action from "../../logic/Action";
import BenchAndPlay from "../../logic/Actions/BenchAndPlay";
import Chip from "../../logic/Actions/Chip";
import Transfer from "../../logic/Actions/Transfer";
import CBenchAndPlay from "./CBenchAndPlay";
import CChipSwitch from "./chips/CChipSwitch";
import CTransfer from "./CTransfer";

interface CActionSwitchProps {
  action: Action;
}

const CActionSwitch: FC<CActionSwitchProps> = ({ action }) => {
  switch (action.type) {
    case "transfer":
      return <CTransfer transfer={action as Transfer} />;
    case "benchandplay":
      return <CBenchAndPlay btpt={action as BenchAndPlay} />;
    case "chip":
      return <CChipSwitch chip={action as Chip} />;
    default:
      return <p>No renderer for action: {action.type}</p>;
  }
};

export default CActionSwitch;
