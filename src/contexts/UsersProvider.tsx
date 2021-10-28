import { createContext, FC, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { hydrateUser } from "../api/hydrateUser";
import { CCreateUserDialog } from "../components/create/CCreateUser";
import { CUserPoolDialog } from "../components/present/CUserPool";
import Publisher, { Events } from "../logic/Publisher";
import User from "../logic/User";
import { ApiContext } from "./ApiProvider";
import { AuthContext } from "./AuthProvider";
type TUsersContext = {
  users: User[];
  activeUser: User | undefined;
  createUser: (user: User) => any;
  setActive: (user: User) => any;
  openUsersDialog: () => any;
  openCreateUserDialog: () => any;

  isUserDialogOpen: boolean;
};

export const UsersContext = createContext<TUsersContext>({
  users: [],
  activeUser: undefined,
  isUserDialogOpen: false,
  createUser: () => {
    throw new Error("No users context");
  },
  setActive: () => {
    throw new Error("No users context");
  },
  openUsersDialog: () => {
    throw new Error("No users context");
  },
  openCreateUserDialog: () => {
    throw new Error("No users context");
  },
});

export const UsersProvider: FC = ({ children }) => {
  const [users, setUsers] = useState([] as User[]);
  const [activeUser, setActiveUser] = useState(undefined as User | undefined);
  const [usersDialog, setUsersDialog] = useState(false);
  const [addUserDialog, setAddUserDialog] = useState(false);
  const { getInstance } = useContext(ApiContext);
  const { isAuthenticated, getAuthenticatedUser } = useContext(AuthContext);

  const createUser = (user: User) => {
    setUsers(users.concat(user));
    const saveBot = async () => {
      try {
        const { success, message } = await getInstance().post<any, any>(
          "/add/userbot",
          user
        );
        if (!success) throw new Error(message);
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      }
    };
    saveBot();
  };
  const setActive = (user: User) => {
    setActiveUser(user);
    Publisher.publish(Events.changeUser, user);
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
          setUsers(botUsers);
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
    <UsersContext.Provider
      value={{
        users,
        setActive,
        createUser,
        activeUser,
        isUserDialogOpen: usersDialog,
        openUsersDialog: () => setUsersDialog(true),
        openCreateUserDialog: () => setAddUserDialog(true),
      }}
    >
      {children}
      <CUserPoolDialog
        open={usersDialog}
        onClose={() => setUsersDialog(false)}
      />
      <CCreateUserDialog
        open={addUserDialog}
        onClose={() => setAddUserDialog(false)}
        onCreate={(user) => {
          createUser(user);
        }}
      />
    </UsersContext.Provider>
  );
};
