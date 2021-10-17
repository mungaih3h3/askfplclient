import { Card, CardContent } from "@mui/material";
import { FC } from "react";
import Transfer from "../../logic/Actions/Transfer";

interface CTransferProps {
  transfer: Transfer;
}

const CTransfer: FC<CTransferProps> = ({ transfer }) => {
  return (
    <Card>
      <CardContent>
        <p>{transfer.playerIn}</p>
        <p>{transfer.playerOut}</p>
      </CardContent>
    </Card>
  );
};

export default CTransfer;
