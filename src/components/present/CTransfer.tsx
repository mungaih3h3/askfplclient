import { Card, CardContent } from "@mui/material";
import { FC } from "react";
import Transfer from "../../logic/Actions/Transfer";
import CPlayer from "./CPlayer";

interface CTransferProps {
  transfer: Transfer;
}

const CTransfer: FC<CTransferProps> = ({ transfer }) => {
  return (
    <Card>
      <CardContent>
        <span>
          player in{" "}
          {transfer.playerIn === undefined ? (
            <em>No player</em>
          ) : (
            <CPlayer player={transfer.playerIn} />
          )}
        </span>
        <span>
          player out{" "}
          {transfer.playerOut === undefined ? (
            <em>No player</em>
          ) : (
            <CPlayer player={transfer.playerOut} />
          )}
        </span>
      </CardContent>
    </Card>
  );
};

export default CTransfer;
