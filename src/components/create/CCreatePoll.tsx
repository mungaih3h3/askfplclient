import {
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  TextField,
  CardHeader,
  Typography,
  IconButton,
} from "@mui/material";
import produce from "immer";
import { FC, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import Option from "../../logic/Option";
import Poll from "../../logic/Poll";
import CCreateOption from "./CCreateOption";
import toast from "react-hot-toast";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import { AddBox, Delete } from "@mui/icons-material";
interface CCreatePollProps {
  onCreate: (poll: Poll) => any;
}

const CCreatePoll: FC<CCreatePollProps> = ({ onCreate }) => {
  const { getAuthenticatedUser } = useContext(AuthContext);
  const initialPoll = new Poll("", [], getAuthenticatedUser().username);
  const [poll, setPoll] = useState(initialPoll);
  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <TextField
            placeholder="Enter poll title..."
            value={poll.title}
            onChange={({ target: { value } }) => {
              setPoll(
                produce((draft) => {
                  draft.title = value;
                })
              );
            }}
          />
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {poll.options.length === 0 && (
                <Typography
                  sx={{
                    height: 100,
                  }}
                >
                  No options
                </Typography>
              )}
            </Box>
            <Stack spacing={2}>
              {poll.options.map((option, index) => (
                <Card key={option.id}>
                  <CardHeader
                    title={`Option #${index + 1}`}
                    sx={{ pb: 0 }}
                    action={
                      <IconButton
                        onClick={() => {
                          setPoll(
                            produce((draft) => {
                              draft.options.splice(index, 1);
                            })
                          );
                        }}
                      >
                        <Delete />
                      </IconButton>
                    }
                  />
                  <CardContent>
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
                    />
                  </CardContent>
                </Card>
              ))}
              <Button
                sx={{
                  backgroundColor: "rgba(0,0,0,0)",
                  borderRadius: 0,
                  m: 1,
                  color: grey[100],
                }}
                startIcon={<AddBox />}
                onClick={() => {
                  setPoll(
                    produce((draft) => {
                      draft.options.push(new Option());
                    })
                  );
                }}
              >
                option
              </Button>
            </Stack>
          </Paper>

          <Button
            variant="contained"
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
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CCreatePoll;
