import { createContext, FC, useContext, useState } from "react";
import toast from "react-hot-toast";
import { ApiMap } from "../api/ApiMap";
import { CCreateFeedbackDialog } from "../components/create/CCreateFeedback";
import { ApiContext } from "./ApiProvider";
import { AuthContext } from "./AuthProvider";

type TFeedbackContext = {
  openFeedbackDialog: () => any;
};

export const FeedbackContext = createContext<TFeedbackContext>({
  openFeedbackDialog: () => {
    throw new Error("No feedback context");
  },
});

export const FeedbackProvider: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { getInstance } = useContext(ApiContext);
  const { openAuthDialog, isAuthenticated } = useContext(AuthContext);
  return (
    <FeedbackContext.Provider
      value={{
        openFeedbackDialog: () => {
          if (isAuthenticated()) {
            setOpen(true);
          } else {
            openAuthDialog();
          }
        },
      }}
    >
      {children}
      <CCreateFeedbackDialog
        open={open}
        onClose={() => setOpen(false)}
        onCreate={async (feedback) => {
          try {
            toast.success("Delivering your feedback...");
            setOpen(false);
            await ApiMap.sendFeedback(getInstance(), feedback);
            toast.success("Delivered ✅ Thanks for the feedback!");
          } catch (error) {
            toast.error(
              "We are having a problem delivering your feedback. This has been reported and we are working on it"
            );
          }
        }}
      />
    </FeedbackContext.Provider>
  );
};
