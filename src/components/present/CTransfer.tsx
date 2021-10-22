import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  Paper,
  Badge,
} from "@mui/material";
import { FC } from "react";
import Transfer from "../../logic/Actions/Transfer";
import CPlayer from "./CPlayer";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import { fontSizes } from "../../theme/fontSizes";
interface CTransferProps {
  transfer: Transfer;
}

const CTransfer: FC<CTransferProps> = ({ transfer }) => {
  return (
    <Stack spacing={2}>
      {/* <Typography sx={{}}>Transfer</Typography> */}
      <Stack
        spacing={1}
        direction="row"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Badge
          badgeContent={
            <Box
              sx={{
                position: "absolute",
                right: 24,
                px: 2,
                backgroundColor: red[100],
                color: red[900],
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
              }}
            >
              <ArrowUpward sx={{ fontSize: fontSizes[0], fontWeight: 600 }} />
              <Typography sx={{ fontSize: fontSizes[0], fontWeight: 600 }}>
                OUT
              </Typography>
            </Box>
          }
        >
          <CPlayer player={transfer.playerIn} />
        </Badge>
        <Badge
          badgeContent={
            <Box
              sx={{
                position: "absolute",
                right: 24,
                px: 2,
                backgroundColor: green[100],
                color: green[900],
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
              }}
            >
              <ArrowDownward sx={{ fontSize: fontSizes[0], fontWeight: 600 }} />
              <Typography sx={{ fontSize: fontSizes[0], fontWeight: 600 }}>
                IN
              </Typography>
            </Box>
          }
        >
          <CPlayer player={transfer.playerOut} />
        </Badge>
      </Stack>
    </Stack>
  );
};

export default CTransfer;
