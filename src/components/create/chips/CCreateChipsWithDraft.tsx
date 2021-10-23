import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import produce from "immer";
import { FC, useState } from "react";
import ChipWithDraft from "../../../logic/Actions/Chips/ChipWithDraft";
import CCreateDraft, { CreateDraftDialog } from "../CCreateDraft";

interface CCreateChipsWithDraftProps {
  onChange: (chipWithDraft: ChipWithDraft) => any;
  initialChip: ChipWithDraft;
}

const CCreateChipsWithDraft: FC<CCreateChipsWithDraftProps> = ({
  onChange,
  initialChip,
}) => {
  const [chip, setChip] = useState(initialChip);
  const [createDraftDialog, setCreateDraftDialog] = useState(false);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ textTransform: "capitalize" }}>
          {chip.chipType}
        </Typography>

        <Button onClick={() => setCreateDraftDialog(true)}>Draft</Button>
      </Box>
      <CreateDraftDialog
        open={createDraftDialog}
        onClose={() => setCreateDraftDialog(false)}
        initialDraft={chip.draft}
        onChange={(newDraft) => {
          const newChip = produce(chip, (draft) => {
            draft.draft = newDraft;
          });
          setChip(newChip);
          onChange(newChip);
        }}
      />
    </>
  );
};

export default CCreateChipsWithDraft;
