import { Card, CardContent, Stack } from "@mui/material";
import produce from "immer";
import { FC, useState } from "react";
import ChipWithDraft from "../../../logic/Actions/Chips/ChipWithDraft";
import CCreateDraft from "../CCreateDraft";

interface CCreateChipsWithDraftProps {
  onChange: (chipWithDraft: ChipWithDraft) => any;
  initialChip: ChipWithDraft;
}

const CCreateChipsWithDraft: FC<CCreateChipsWithDraftProps> = ({
  onChange,
  initialChip,
}) => {
  const [chip, setChip] = useState(initialChip);
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <h4>{chip.chipType.toUpperCase()}</h4>

          <CCreateDraft
            initialDraft={chip.draft}
            onChange={(newDraft) => {
              const newWC = produce(chip, (draft) => {
                draft.draft = newDraft;
              });
              setChip(newWC);
              onChange(newWC);
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CCreateChipsWithDraft;
