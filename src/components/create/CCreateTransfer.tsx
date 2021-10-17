import { Paper, Stack, TextField } from "@mui/material";
import produce from "immer";
import { FC, useState } from "react";
import Transfer from "../../logic/Actions/Transfer";
import CCreatePlayer from "./CCreatePlayer";
import toast from "react-hot-toast";
import Player, { PlayerRole } from "../../logic/Player";
import { Blacklist } from "./PlayerMarket";
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
    <Paper variant="outlined">
      <Stack spacing={2} sx={{ padding: 1 }}>
        <span>
          <CCreatePlayer
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
                if (transfer.playerOut.valid) {
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
          <span
            onClick={() => {
              const newTransfer = produce(transfer, (draft) => {
                draft.playerIn = Player.getNull();
              });
              setTransfer(newTransfer);
              onChange(newTransfer);
            }}
          >
            reset
          </span>
        </span>
        <span>
          <CCreatePlayer
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
                  if (
                    transfer.playerIn.valid &&
                    transfer.playerIn.role !== role
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
            player={transfer.playerOut}
            onChange={(newPlayer) => {
              try {
                if (transfer.playerIn.valid) {
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
          <span
            onClick={() => {
              const newTransfer = produce(transfer, (draft) => {
                draft.playerOut = Player.getNull();
              });
              setTransfer(newTransfer);
              onChange(newTransfer);
            }}
          >
            reset
          </span>
        </span>
      </Stack>
    </Paper>
  );
};

export default CCreateTransfer;
