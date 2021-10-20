import { Card, CardContent, Stack, Typography } from "@mui/material";
import produce from "immer";
import { FC, useState } from "react";
import Transfer from "../../logic/Actions/Transfer";
import CCreatePlayer from "./CCreatePlayer";
import toast from "react-hot-toast";
import Player, { PlayerRole } from "../../logic/Player";
import { Blacklist } from "./PlayerMarket";
import { ArrowDownward, ArrowForward } from "@mui/icons-material";
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
    <Stack spacing={1}>
      <Typography sx={{}}>Transfer</Typography>
      <Stack spacing={2}>
        <CCreatePlayer
          extra="(out)"
          blacklist={[
            {
              type: "player",
              value:
                transfer.playerOut === undefined
                  ? new Player("", PlayerRole.defender)
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
        <CCreatePlayer
          extra="(in)"
          blacklist={[
            {
              type: "player",
              value:
                transfer.playerIn === undefined
                  ? new Player("", PlayerRole.defender)
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
      </Stack>
    </Stack>
  );
};

export default CCreateTransfer;
