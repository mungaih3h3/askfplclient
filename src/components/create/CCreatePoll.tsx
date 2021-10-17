import { Button, Card, CardContent, Stack, TextField } from "@mui/material";
import produce from "immer";
import { FC, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import Option from "../../logic/Option";
import Poll from "../../logic/Poll";
import CCreateOption from "./CCreateOption";
import toast from "react-hot-toast";

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
        <Stack spacing={1}>
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
          {poll.options.map((option, index) => (
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
          ))}
          <Button
            onClick={() => {
              setPoll(
                produce((draft) => {
                  draft.options.push(new Option());
                })
              );
            }}
          >
            Add new Option
          </Button>

          <Button
            onClick={() => {
              try {
                if (poll.title.length === 0)
                  throw new Error("A poll must have a title");
                if (poll.options.length < 2)
                  throw new Error("A poll must have atleast 2 options");
                for (const option of poll.options) {
                  if (option.actions.length < 1)
                    throw new Error(
                      "Every option on the poll must have atleast one action"
                    );
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
