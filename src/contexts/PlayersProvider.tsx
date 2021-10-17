import { FC, useState } from "react";
import { createContext } from "react";
import dummyplayers from "../dummydata/dummyplayers";
import Player from "../logic/Player";

type TPlayersContext = {
  players: Player[];
};

export const PlayersContext = createContext<TPlayersContext>({
  players: [],
});

export const PlayersProvider: FC = ({ children }) => {
  const [players, setPlayers] = useState(dummyplayers as Player[]);

  return (
    <PlayersContext.Provider value={{ players }}>
      {children}
    </PlayersContext.Provider>
  );
};
