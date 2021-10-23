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
import CCreateDraftPlayer from "./CCreateDraftPlayer";
import { Box } from "@mui/system";
interface CCreateDraftProps {
  onChange: (draft: Draft) => any;
  initialDraft: Draft;
}

const CCreateDraft: FC<CCreateDraftProps> = ({ initialDraft, onChange }) => {
  const [draft, setDraft] = useState(initialDraft);
  return (
    <Stack spacing={2} sx={{ px: 1 }}>
      <Stack
        spacing={2}
        direction="row"
        sx={{
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <Box sx={{ flex: 1 }} />
        {draft.goalkeepers.map((player, index) => (
          <Box sx={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <CCreateDraftPlayer
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
          </Box>
        ))}
        <Box sx={{ flex: 1 }} />
      </Stack>
      <Stack
        spacing={1}
        direction="row"
        sx={{
          justifyContent: "space-around",
          display: "flex",
        }}
      >
        {draft.defenders.map((player, index) => (
          <Box sx={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <CCreateDraftPlayer
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
          </Box>
        ))}
      </Stack>
      <Stack
        spacing={2}
        direction="row"
        sx={{
          justifyContent: "space-around",
          display: "flex",
        }}
      >
        {draft.midfielders.map((player, index) => (
          <Box sx={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <CCreateDraftPlayer
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
          </Box>
        ))}
      </Stack>
      <Stack
        spacing={2}
        direction="row"
        sx={{
          justifyContent: "space-around",
          display: "flex",
        }}
      >
        <Box sx={{ flex: 1 }} />

        {draft.forwards.map((player, index) => (
          <Box sx={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <CCreateDraftPlayer
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
          </Box>
        ))}
        <Box sx={{ flex: 1 }} />
      </Stack>
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
      <DialogContent dividers={true} sx={{ display: "flex", px: 0, mx: 2 }}>
        <CCreateDraft {...rest} />
      </DialogContent>
    </Dialog>
  );
};

export default CCreateDraft;
