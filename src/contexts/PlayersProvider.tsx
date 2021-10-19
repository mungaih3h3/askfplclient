import { FC, useEffect, useState } from "react";
import { createContext } from "react";
import { apiInstance } from "../api/ApiInstance";
import dummyplayers from "../dummydata/dummyplayers";
import Player from "../logic/Player";
import toast from "react-hot-toast";
type TPlayersContext = {
  players: Player[];
};

export const PlayersContext = createContext<TPlayersContext>({
  players: [],
});

export const PlayersProvider: FC = ({ children }) => {
  const [players, setPlayers] = useState(dummyplayers as Player[]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const {
        data: { players },
      } = await apiInstance.get<any, any>("/players");
      setPlayers(
        players.map((player: any) => new Player(player.name, player.role))
      );
    };
    fetchPlayers().catch((error: any) => {
      toast.error(error.message, {
        position: "bottom-right",
      });
    });
  }, []);

  return (
    <PlayersContext.Provider value={{ players }}>
      {children}
    </PlayersContext.Provider>
  );
};
