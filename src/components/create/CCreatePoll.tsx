import {
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
  IconButton,
  Divider,
  InputBase,
} from "@mui/material";
import produce from "immer";
import { FC, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import Option from "../../logic/Option";
import Poll from "../../logic/Poll";
import CCreateOption from "./CCreateOption";
import toast from "react-hot-toast";
import { Box } from "@mui/system";
import { grey, indigo } from "@mui/material/colors";
import { Add, AddCircleOutline, Clear } from "@mui/icons-material";
import { fontSizes } from "../../theme/fontSizes";
import { CActionFactoryDialog } from "./CActionFactory";
interface CCreatePollProps {
  onCreate: (poll: Poll) => any;
}

const CCreatePoll: FC<CCreatePollProps> = ({ onCreate }) => {
  const { getAuthenticatedUser } = useContext(AuthContext);
  const initialPoll = new Poll("", [], getAuthenticatedUser().username);
  const [poll, setPoll] = useState(initialPoll);
  const [actionDialog, setActionDialog] = useState({
    open: false,
    index: -1,
    chips: false,
    captain: false,
  });
  return (
    <>
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>
          <Stack spacing={3}>
            <InputBase
              sx={{
                fontSize: fontSizes[4],
              }}
              placeholder="Enter poll title"
              value={poll.title}
              onChange={({ target: { value } }) => {
                setPoll(
                  produce((draft) => {
                    draft.title = value;
                  })
                );
              }}
            />

            <Stack spacing={2}>
              {poll.options.map((option, index) => (
                <Card
                  key={option.id}
                  sx={{
                    width: "100%",
                  }}
                >
                  <CardContent sx={{ py: 2 }}>
                    <CCreateOption
                      key={option.id}
                      initialOption={option}
                      onChange={(newOption) => {
                        setPoll(
                          produce((draft) => {
                            draft.options[index] = newOption;
                          })
                        );
                      }}
                      onDelete={() => {
                        setPoll(
                          produce((draft) => {
                            draft.options.splice(index, 1);
                          })
                        );
                      }}
                      onOpenFactory={(filter) => {
                        setActionDialog({ open: true, index, ...filter });
                      }}
                    />
                  </CardContent>
                </Card>
              ))}
              <Paper
                variant="outlined"
                sx={{
                  my: 2,
                  p: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderStyle: "dashed",
                }}
                onClick={() => {
                  try {
                    const newPoll = produce(poll, (draft) => {
                      draft.addOption(new Option());
                    });
                    setPoll(newPoll);
                  } catch (error: any) {
                    toast.error(error.message);
                  }
                }}
              >
                <Stack
                  spacing={1}
                  direction="row"
                  sx={{
                    color: grey[400],
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AddCircleOutline sx={{ fontSize: fontSizes[4] }} />
                  <Typography sx={{ fontSize: fontSizes[3] }}>
                    option
                  </Typography>
                </Stack>
              </Paper>
            </Stack>
          </Stack>
        </CardContent>
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: indigo[600],
            color: indigo[50],
            py: 2,
            m: "0",
            width: "100%",
          }}
          onClick={() => {
            try {
              if (poll.title.length === 0)
                throw new Error("A poll must have a title");
              if (poll.options.length < 2)
                throw new Error("A poll must have atleast 2 options");
              for (const option of poll.options) {
                let noActionsNumber = 0;
                if (option.actions.length < 1) {
                  if (noActionsNumber >= 1) {
                    throw new Error("Only one option can be empty");
                  } else {
                    noActionsNumber++;
                  }
                }
              }
              onCreate(poll);
              setPoll(initialPoll);
            } catch (error: any) {
              toast.error(error.message, { position: "bottom-right" });
            }
          }}
        >
          Create
        </Box>
      </Card>
      <CActionFactoryDialog
        open={actionDialog.open}
        filter={{ chips: actionDialog.chips, captain: actionDialog.captain }}
        onClose={() =>
          setActionDialog({ ...actionDialog, open: false, index: -1 })
        }
        onCreate={(newAction) => {
          const newPoll = produce(poll, (draft) => {
            draft.options[actionDialog.index].actions.push(newAction);
          });
          setPoll(newPoll);
          setActionDialog({ ...actionDialog, open: false, index: -1 });
        }}
      />
    </>
  );
};

export default CCreatePoll;
