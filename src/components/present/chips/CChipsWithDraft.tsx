import { Stack } from "@mui/material";
import { FC } from "react";
import ChipWithDraft from "../../../logic/Actions/Chips/ChipWithDraft";
import CDraft from "../CDraft";

interface CChipsWithDraftProps {
  chip: ChipWithDraft;
}

const CChipsWithDraft: FC<CChipsWithDraftProps> = ({ chip: chip }) => {
  return (
    <Stack spacing={2}>
      <h4>{chip.chipType}</h4>
      <CDraft draft={chip.draft} />
    </Stack>
  );
};

export default CChipsWithDraft;
