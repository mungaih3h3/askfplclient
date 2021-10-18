import { Card, CardContent, Stack, Typography } from "@mui/material";
import { FC } from "react";
import Transfer from "../../logic/Actions/Transfer";
import CPlayer from "./CPlayer";
import { ArrowForward } from "@mui/icons-material";
interface CTransferProps {
  transfer: Transfer;
}

const CTransfer: FC<CTransferProps> = ({ transfer }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Typography sx={{ fontWeight: 700 }}>Transfer</Typography>
          <Stack
            spacing={2}
            direction="row"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {transfer.playerIn === undefined ? (
              <em>No player</em>
            ) : (
              <CPlayer player={transfer.playerIn} />
            )}
            <ArrowForward />
            {transfer.playerOut === undefined ? (
              <em>No player</em>
            ) : (
              <CPlayer player={transfer.playerOut} />
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CTransfer;
