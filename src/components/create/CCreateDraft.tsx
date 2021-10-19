import Draft from "../../logic/Draft";
import { FC, useState } from "react";
import {
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import CCreatePlayer from "./CCreatePlayer";
import produce from "immer";
import { PlayerRole } from "../../logic/Player";
interface CCreateDraftProps {
  onChange: (draft: Draft) => any;
  initialDraft: Draft;
}

const CCreateDraft: FC<CCreateDraftProps> = ({ initialDraft, onChange }) => {
  const [draft, setDraft] = useState(initialDraft);
  return (
    <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
      <Stack spacing={2} direction="row">
        {draft.goalkeepers.map((player, index) => (
          <CCreatePlayer
            key={player.id}
            player={player}
            onChange={(newPlayer) => {
              const newDraft = produce(draft, (draft) => {
                draft.goalkeepers[index] = newPlayer;
              });
              setDraft(newDraft);
              onChange(newDraft);
            }}
            blacklist={[
              { type: "role", value: PlayerRole.defender },
              { type: "role", value: PlayerRole.midfielder },
              { type: "role", value: PlayerRole.forward },
            ]}
          />
        ))}
      </Stack>
      <Stack spacing={2} direction="row">
        {draft.defenders.map((player, index) => (
          <CCreatePlayer
            key={player.id}
            player={player}
            onChange={(newPlayer) => {
              const newDraft = produce(draft, (draft) => {
                draft.defenders[index] = newPlayer;
              });
              setDraft(newDraft);
              onChange(newDraft);
            }}
            blacklist={[
              { type: "role", value: PlayerRole.goalkeeper },
              { type: "role", value: PlayerRole.midfielder },
              { type: "role", value: PlayerRole.forward },
            ]}
          />
        ))}
      </Stack>
      <Stack spacing={2} direction="row">
        {draft.midfielders.map((player, index) => (
          <CCreatePlayer
            key={player.id}
            player={player}
            onChange={(newPlayer) => {
              const newDraft = produce(draft, (draft) => {
                draft.midfielders[index] = newPlayer;
              });
              setDraft(newDraft);
              onChange(newDraft);
            }}
            blacklist={[
              { type: "role", value: PlayerRole.defender },
              { type: "role", value: PlayerRole.goalkeeper },
              { type: "role", value: PlayerRole.forward },
            ]}
          />
        ))}
      </Stack>
      <Stack spacing={2} direction="row">
        {draft.forwards.map((player, index) => (
          <CCreatePlayer
            key={player.id}
            player={player}
            onChange={(newPlayer) => {
              const newDraft = produce(draft, (draft) => {
                draft.forwards[index] = newPlayer;
              });
              setDraft(newDraft);
              onChange(newDraft);
            }}
            blacklist={[
              { type: "role", value: PlayerRole.defender },
              { type: "role", value: PlayerRole.midfielder },
              { type: "role", value: PlayerRole.goalkeeper },
            ]}
          />
        ))}
      </Stack>{" "}
    </Stack>
  );
};
interface CreateDraftDialogProps extends CCreateDraftProps {
  open: boolean;
  onClose: () => any;
}
export const CreateDraftDialog: FC<CreateDraftDialogProps> = ({
  open,
  onClose,
  ...rest
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Make Draft</DialogTitle>
      <DialogContent>
        <CCreateDraft {...rest} />
      </DialogContent>
    </Dialog>
  );
};

export default CCreateDraft;
