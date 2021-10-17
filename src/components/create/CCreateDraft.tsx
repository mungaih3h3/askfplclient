import Draft from "../../logic/Draft";
import { FC, useState } from "react";
import { Stack } from "@mui/material";
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
    <Stack spacing={2}>
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

export default CCreateDraft;
