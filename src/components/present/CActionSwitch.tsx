import { FC } from "react";
import Action from "../../logic/Action";
import Transfer from "../../logic/Actions/Transfer";
import CTransfer from "./CTransfer";

interface CActionSwitchProps {
  action: Action;
}

const CActionSwitch: FC<CActionSwitchProps> = ({ action }) => {
  switch (action.type) {
    case "transfer":
      return <CTransfer transfer={action as Transfer} />;
    default:
      return <p>No renderer for action: {action.type}</p>;
  }
};

export default CActionSwitch;
