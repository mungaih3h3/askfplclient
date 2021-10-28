import { createContext, FC, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { hydrateUser } from "../api/hydrateUser";
import { CCreateBotDialog } from "../components/create/CCreateBot";
import { CUserPoolDialog } from "../components/present/CBotPool";
import Publisher, { Events } from "../logic/Publisher";
import User from "../logic/User";
import { ApiContext } from "./ApiProvider";
import { AuthContext } from "./AuthProvider";
type TBotContext = {
  bots: User[];
  createBot: (user: User) => Promise<any>;
  openBotDialog: () => any;
  openCreateBotDialog: () => any;
  isBotDialogOpen: boolean;
};

export const BotContext = createContext<TBotContext>({
  bots: [],
  isBotDialogOpen: false,
  createBot: async () => {
    throw new Error("No users context");
  },
  openBotDialog: () => {
    throw new Error("No users context");
  },
  openCreateBotDialog: () => {
    throw new Error("No users context");
  },
});

export const BotProvider: FC = ({ children }) => {
  const [bots, setBots] = useState([] as User[]);
  const [isBotDialogOpen, setBotDialog] = useState(false);
  const [addBotDialog, setAddBotDialog] = useState(false);
  const { getInstance } = useContext(ApiContext);
  const { isAuthenticated, getAuthenticatedUser } = useContext(AuthContext);
  const [loadingSaveBot, setLoadingSaveBot] = useState(false);

  const saveBot = async (user: User) => {
    try {
      const {
        data: { success, message },
      } = await getInstance().post<any, any>("/add/userbot", user);
      if (!success) throw new Error(message);
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  };
  const createBot = async (user: User) => {
    try {
      await saveBot(user);
      if (bots.find((b) => b.username === user.username)) {
        throw new Error("Username not available");
      }
      setBots(bots.concat(user));
    } catch (error: any) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchBots = async () => {
      if (isAuthenticated()) {
        try {
          const {
            data: { success, message, bots },
          } = await getInstance(getAuthenticatedUser().username).get<any, any>(
            "/userbots"
          );
          if (!success) throw new Error(message);
          const botUsers: User[] = bots.map((bot: any) => hydrateUser(bot));
          setBots(botUsers);
        } catch (error: any) {
          console.log(error);
          toast.error(error.message);
        }
      }
    };
    fetchBots();
    const fnId = Publisher.subscribeTo(Events.login, async (user: User) => {
      await fetchBots();
    });
    return () => {
      Publisher.unsubscribeTo(Events.login, fnId);
    };
  }, []);

  return (
    <BotContext.Provider
      value={{
        bots: bots,
        createBot,
        isBotDialogOpen,
        openBotDialog: () => setBotDialog(true),
        openCreateBotDialog: () => setAddBotDialog(true),
      }}
    >
      {children}
      <CUserPoolDialog
        open={isBotDialogOpen}
        onClose={() => setBotDialog(false)}
      />
      <CCreateBotDialog
        open={addBotDialog}
        onClose={() => setAddBotDialog(false)}
        onCreate={async (user) => {
          try {
            setLoadingSaveBot(true);
            await createBot(user);
            setLoadingSaveBot(false);
            setAddBotDialog(false);
          } catch (error: any) {
            setLoadingSaveBot(false);
            toast.error(error.message);
          }
        }}
        loading={loadingSaveBot}
      />
    </BotContext.Provider>
  );
};
