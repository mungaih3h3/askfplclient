import { createContext, FC, useState } from "react";
import {
  ActionFilter,
  CActionFactoryDialog,
} from "../components/create/CActionFactory";
import { produce } from "immer";
import Action from "../logic/Action";
type TActionFactoryContext = {
  openActionFactoryDialog: (
    filter: ActionFilter,
    onCreateCallback: (action: Action) => any
  ) => any;
};

export const ActionFactoryContext = createContext<TActionFactoryContext>({
  openActionFactoryDialog: () => {
    throw new Error("No action factory context");
  },
});

export const ActionFactoryProvider: FC = ({ children }) => {
  const [actionFactoryDialog, setActionFactoryDialog] = useState({
    open: false,
    chips: false,
    captain: false,
    onCreateCallback: (action: Action) => {},
  });
  return (
    <ActionFactoryContext.Provider
      value={{
        openActionFactoryDialog: (filter, onCreateCallback) =>
          setActionFactoryDialog({ open: true, onCreateCallback, ...filter }),
      }}
    >
      {children}
      <CActionFactoryDialog
        open={actionFactoryDialog.open}
        filter={{
          chips: actionFactoryDialog.chips,
          captain: actionFactoryDialog.captain,
        }}
        onClose={() =>
          setActionFactoryDialog({
            ...actionFactoryDialog,
            open: false,
          })
        }
        onCreate={(newAction) => {
          actionFactoryDialog.onCreateCallback(newAction);
          setActionFactoryDialog({ ...actionFactoryDialog, open: false });
        }}
      />
    </ActionFactoryContext.Provider>
  );
};
