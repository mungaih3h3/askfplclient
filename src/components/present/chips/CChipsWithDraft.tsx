import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useState } from "react";
import ChipWithDraft from "../../../logic/Actions/Chips/ChipWithDraft";
import CDraft, { DraftDialog } from "../CDraft";

interface CChipsWithDraftProps {
  chip: ChipWithDraft;
}

const CChipsWithDraft: FC<CChipsWithDraftProps> = ({ chip }) => {
  const [draftDialog, showDraftDialog] = useState(false);
  return (
    <>
      <Box
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontWeight: 700, pb: 1 }}>{chip.chipType}</Typography>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            showDraftDialog(true);
          }}
        >
          Draft
        </Button>
      </Box>
      <DraftDialog
        open={draftDialog}
        onClose={() => showDraftDialog(false)}
        draft={chip.draft}
      />
    </>
  );
};

export default CChipsWithDraft;
