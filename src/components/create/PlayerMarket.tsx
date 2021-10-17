import {
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
} from "@mui/material";
import { FC, useContext } from "react";
import { PlayersContext } from "../../contexts/PlayersProvider";
import Player, { PlayerRole } from "../../logic/Player";
import CPlayer from "../present/CPlayer";
import toast from "react-hot-toast";
interface PlayerMarketProps {
  onSelect: (player: Player) => any;
  blacklist: Blacklist[];
}

export interface Blacklist {
  type: "role" | "player";
  value: PlayerRole | Player;
}
export function shouldAccept(player: Player, shouldReject: Blacklist[]) {
  for (const b of shouldReject) {
    switch (b.type) {
      case "role":
        if (player.role === (b.value as PlayerRole)) {
          return false;
        } else {
          break;
        }
      case "player":
        if (player.id === (b.value as Player).id) {
          return false;
        } else {
          break;
        }
      default:
        throw new Error("Invalid filter type: " + b.type);
    }
  }
  return true;
}

const PlayerMarket: FC<PlayerMarketProps> = ({ onSelect, blacklist }) => {
  const { players } = useContext(PlayersContext);
  return (
    <Card>
      <CardHeader>
        <h2>Player Market</h2>
      </CardHeader>
      <CardContent>
        {players.map((player) => (
          <div
            key={player.id}
            style={{
              opacity: shouldAccept(player, blacklist) ? 1 : 0.5,
            }}
            onClick={() => {
              try {
                if (!shouldAccept(player, blacklist))
                  throw new Error("Cannot add player");
                onSelect(player);
              } catch (error: any) {
                toast.error(error.message, {
                  position: "bottom-right",
                });
              }
            }}
          >
            <CPlayer player={player} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

interface PlayerMarketDialogProps extends PlayerMarketProps {
  open: boolean;
  onClose: () => any;
}

export const PlayerMarketDialog: FC<PlayerMarketDialogProps> = ({
  open,
  onClose,
  ...rest
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <PlayerMarket {...rest} />
      </DialogContent>
    </Dialog>
  );
};

export default PlayerMarket;
