import {
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { FC } from "react";
import Draft from "../../logic/Draft";
import CDraftPlayer from "./CDraftPlayer";
import CPlayer from "./CPlayer";

interface CDraftProps {
  draft: Draft;
}

const CDraft: FC<CDraftProps> = ({ draft }) => {
  return (
    <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
      <Stack spacing={2} direction="row">
        {draft.goalkeepers.map((player, index) => (
          <CDraftPlayer player={player} />
        ))}
      </Stack>
      <Stack spacing={2} direction="row">
        {draft.defenders.map((player, index) => (
          <CDraftPlayer player={player} />
        ))}
      </Stack>
      <Stack spacing={2} direction="row">
        {draft.midfielders.map((player, index) => (
          <CDraftPlayer player={player} />
        ))}
      </Stack>
      <Stack spacing={2} direction="row">
        {draft.forwards.map((player, index) => (
          <CDraftPlayer player={player} />
        ))}
      </Stack>
    </Stack>
  );
};

interface DraftDialogProps extends CDraftProps {
  open: boolean;
  onClose: () => any;
}

export const DraftDialog: FC<DraftDialogProps> = ({
  open,
  onClose,
  ...rest
}) => {
  return (
    <Dialog scroll={"body"} open={open} onClose={onClose}>
      <DialogTitle>Draft</DialogTitle>
      <DialogContent dividers={true} sx={{ display: "flex", px: 0, mx: 2 }}>
        <CDraft {...rest} />
      </DialogContent>
    </Dialog>
  );
};

export default CDraft;
