import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { FC } from "react";
import Transfer from "../../logic/Actions/Transfer";
import CPlayer from "./CPlayer";
import { ArrowForward } from "@mui/icons-material";
interface CTransferProps {
  transfer: Transfer;
}

const CTransfer: FC<CTransferProps> = ({ transfer }) => {
  return (
    <Stack spacing={2}>
      <Typography sx={{}}>Transfer</Typography>
      <Stack
        spacing={1}
        direction="row"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <CPlayer player={transfer.playerIn} />
        <ArrowForward />
        <CPlayer player={transfer.playerOut} />
      </Stack>
    </Stack>
  );
};

export default CTransfer;
