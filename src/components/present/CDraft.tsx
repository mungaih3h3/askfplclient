import { Card, CardContent, Stack } from "@mui/material";
import { FC } from "react";
import Draft from "../../logic/Draft";
import CPlayer from "./CPlayer";

interface CDraftProps {
  draft: Draft;
}

const CDraft: FC<CDraftProps> = ({ draft }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack spacing={2} direction="row">
            {draft.goalkeepers.map((player, index) => (
              <CPlayer player={player} />
            ))}
          </Stack>
          <Stack spacing={2} direction="row">
            {draft.defenders.map((player, index) => (
              <CPlayer player={player} />
            ))}
          </Stack>
          <Stack spacing={2} direction="row">
            {draft.midfielders.map((player, index) => (
              <CPlayer player={player} />
            ))}
          </Stack>
          <Stack spacing={2} direction="row">
            {draft.forwards.map((player, index) => (
              <CPlayer player={player} />
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CDraft;
