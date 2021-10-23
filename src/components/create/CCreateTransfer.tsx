import { Badge, Typography, Box } from "@mui/material";
import produce from "immer";
import { FC, useState } from "react";
import Transfer from "../../logic/Actions/Transfer";
import CCreatePlayer from "./CCreatePlayer";
import toast from "react-hot-toast";
import Player, { PlayerRole } from "../../logic/Player";
import { Blacklist } from "./PlayerMarket";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import { fontSizes } from "../../theme/fontSizes";
interface CCreateTransferProps {
  onChange: (transfer: Transfer) => any;
  initialTransfer: Transfer;
}

const CCreateTransfer: FC<CCreateTransferProps> = ({
  onChange,
  initialTransfer,
}) => {
  const [transfer, setTransfer] = useState(initialTransfer);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: 1,
      }}
    >
      <Badge
        sx={{ flex: 1 }}
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
        <CCreatePlayer
          blacklist={[
            {
              type: "player",
              value:
                transfer.playerOut === undefined
                  ? Player.getNull(PlayerRole.defender)
                  : transfer.playerOut,
            },
            ...([
              PlayerRole.goalkeeper,
              PlayerRole.defender,
              PlayerRole.midfielder,
              PlayerRole.forward,
            ]
              .filter((role) => {
                if (
                  transfer.playerOut.valid &&
                  transfer.playerOut.role !== role
                )
                  return true;
                else return false;
              })
              .map(
                (role) =>
                  ({
                    type: "role",
                    value: role,
                  } as Blacklist)
              ) as Blacklist[]),
          ]}
          player={transfer.playerIn}
          onChange={(newPlayer) => {
            try {
              if (transfer.playerOut.valid && newPlayer.valid) {
                if (transfer.playerOut.role !== newPlayer.role)
                  throw new Error("Players in a transfer must share a role");
                if (transfer.playerOut.id === newPlayer.id)
                  throw new Error(
                    "A player cannot be transfered in/out for themselves"
                  );
              }
              const newTransfer = produce(transfer, (draft) => {
                draft.playerIn = newPlayer;
              });
              setTransfer(newTransfer);
              onChange(newTransfer);
            } catch (error: any) {
              toast.error(error.message);
            }
          }}
        />
      </Badge>
      <Badge
        sx={{ flex: 1 }}
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
        <CCreatePlayer
          blacklist={[
            {
              type: "player",
              value:
                transfer.playerIn === undefined
                  ? Player.getNull(PlayerRole.defender)
                  : transfer.playerIn,
            },
            ...([
              PlayerRole.goalkeeper,
              PlayerRole.defender,
              PlayerRole.midfielder,
              PlayerRole.forward,
            ]
              .filter((role) => {
                if (transfer.playerIn.valid && transfer.playerIn.role !== role)
                  return true;
                else return false;
              })
              .map(
                (role) =>
                  ({
                    type: "role",
                    value: role,
                  } as Blacklist)
              ) as Blacklist[]),
          ]}
          player={transfer.playerOut}
          onChange={(newPlayer) => {
            try {
              if (transfer.playerIn.valid && newPlayer.valid) {
                if (transfer.playerIn.role !== newPlayer.role)
                  throw new Error("Players in a transfer must share a role");

                if (transfer.playerIn.id === newPlayer.id)
                  throw new Error(
                    "A player cannot be transfered in/out for themselves"
                  );
              }
              const newTransfer = produce(transfer, (draft) => {
                draft.playerOut = newPlayer;
              });
              setTransfer(newTransfer);
              onChange(newTransfer);
            } catch (error: any) {
              toast.error(error.message);
            }
          }}
        />
      </Badge>
    </Box>
  );
};

export default CCreateTransfer;
