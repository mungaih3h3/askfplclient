import { Button, Card, CardContent, Stack, TextField } from "@mui/material";
import produce from "immer";
import { FC, useState } from "react";
import Option from "../../logic/Option";
import Poll from "../../logic/Poll";
import CCreateOption from "./CCreateOption";

interface CCreatePollProps {
  onCreate: (poll: Poll) => any;
  initialPoll: Poll;
}

const CCreatePoll: FC<CCreatePollProps> = ({ onCreate, initialPoll }) => {
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

          <Button onClick={() => onCreate(poll)}>Create</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CCreatePoll;
