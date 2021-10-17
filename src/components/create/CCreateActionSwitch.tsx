import { FC } from "react";
import Action from "../../logic/Action";
import Transfer from "../../logic/Actions/Transfer";
import CCreateTransfer from "./CCreateTransfer";

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
    default:
      return <p>No renderer for action: {action.type}</p>;
  }
};

export default CCreateActionSwitch;
