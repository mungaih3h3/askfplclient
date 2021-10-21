import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { PlayersContext } from "../../contexts/PlayersProvider";
import Player, { PlayerRole } from "../../logic/Player";
import CPlayer from "../present/CPlayer";
import toast from "react-hot-toast";
import Fuse from "fuse.js";
import { AutoSizer, List } from "react-virtualized";
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
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResult] = useState([] as Player[]);
  const fuse = useRef(
    new Fuse(
      players,
      {
        keys: ["name", "role"],
      },
      Fuse.createIndex(["name", "role"], players)
    )
  );
  useEffect(() => {
    const filter = async () => {
      const results = await new Promise<Fuse.FuseResult<Player>[]>(
        (resolve) => {
          resolve(fuse.current.search(search));
        }
      );
      setSearchResult(results.map((s) => s.item));
    };
    if (search === "") {
      setSearchResult(players);
    } else {
      filter();
    }
  }, [search]);
  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }: any) {
    const player = searchResults[index];
    return (
      <div
        key={player.id}
        style={{
          opacity: shouldAccept(player, blacklist) ? 1 : 0.5,
          ...style,
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
    );
  }

  return (
    <Stack spacing={2}>
      <TextField
        placeholder="Search"
        value={search}
        onChange={({ target: { value } }) => {
          setSearch(value);
        }}
      />
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            width={width}
            height={1080}
            rowCount={searchResults.length}
            rowHeight={80}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </Stack>
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
      <DialogTitle>Players</DialogTitle>
      <DialogContent sx={{ overflowY: "hidden" }}>
        <PlayerMarket {...rest} />
      </DialogContent>
    </Dialog>
  );
};

export default PlayerMarket;
