import { FC } from "react";
import { createContext } from "react";
import { useLocalStorage } from "../components/hooks/useLocalStorage";
import User from "../logic/User";

type TActiveBotContext = {
  activeBot: User | undefined;
  setActiveBot: (bot: User | undefined) => any;
};

export const ActiveBotContext = createContext<TActiveBotContext>({
  activeBot: undefined,
  setActiveBot: () => {},
});

export const ActiveBotProvider: FC = ({ children }) => {
  const [activeBot, setActiveBot] = useLocalStorage<User | undefined>(
    "activeBot",
    undefined
  );
  return (
    <ActiveBotContext.Provider value={{ activeBot, setActiveBot }}>
      {children}
    </ActiveBotContext.Provider>
  );
};
