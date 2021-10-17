import { Paper, Stack, TextField } from "@mui/material";
import produce from "immer";
import { FC, useState } from "react";
import Transfer from "../../logic/Actions/Transfer";

interface CCreateTransferProps {
  onChange: (transfer: Transfer) => any;
  initialTransfer: Transfer;
}

const CCreateTransfer: FC<CCreateTransferProps> = ({
  onChange,
  initialTransfer,
}) => {
  const [transfer, setTransfer] = useState(initialTransfer);
  return (
    <Paper variant="outlined">
      <Stack spacing={2} sx={{ padding: 1 }}>
        <TextField
          value={transfer.playerIn}
          placeholder="Enter player in"
          onChange={({ target: { value } }) => {
            const newTransfer = produce(transfer, (draft) => {
              draft.playerIn = value;
            });
            setTransfer(newTransfer);
            onChange(newTransfer);
          }}
        />
        <TextField
          value={transfer.playerOut}
          placeholder="Enter player in"
          onChange={({ target: { value } }) => {
            const newTransfer = produce(transfer, (draft) => {
              draft.playerOut = value;
            });
            setTransfer(newTransfer);
            onChange(newTransfer);
          }}
        />
      </Stack>
    </Paper>
  );
};

export default CCreateTransfer;
