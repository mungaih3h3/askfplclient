import { Add, Remove } from "@mui/icons-material";
import {
  IconButton,
  InputBase,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import produce from "immer";
import { FC } from "react";
import toast from "react-hot-toast";
import SquadResources from "../../logic/SquadResources";
import { fontSizes } from "../../theme/fontSizes";

interface CCreateSquadResourcesProps {
  onChange: (resources: SquadResources) => any;
  resources: SquadResources;
}

const CCreateSquadResources: FC<CCreateSquadResourcesProps> = ({
  onChange,
  resources,
}) => {
  return (
    <Stack spacing={3} direction="row" sx={{ py: 2 }}>
      <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
        <InputBase
          sx={{ width: 50, fontSize: fontSizes[3], fontWeight: 600 }}
          size="small"
          placeholder="0"
          defaultValue={0}
          onBlur={({ target: { value } }) => {
            onChange(
              produce(resources, (draft) => {
                try {
                  const val = parseFloat(value);
                  if (isNaN(val))
                    throw new Error("Invalid remaining bank amount");
                  else draft.bank = parseFloat(val.toFixed(1));
                } catch (error: any) {
                  toast.error(error.message);
                  draft.bank = 0;
                }
              })
            );
          }}
        />
        <Typography noWrap sx={{ color: grey[500] }}>
          £ bank
        </Typography>
      </Stack>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Paper
          variant="outlined"
          sx={{
            px: 2,
            py: 1,
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: fontSizes[3] }}>
            {resources.hits}
          </Typography>
          <Stack spacing={1} direction="row">
            <Add
              onClick={() => {
                onChange(
                  produce(resources, (draft) => {
                    draft.hits -= 4;
                  })
                );
              }}
            />
            <Remove
              onClick={() => {
                onChange(
                  produce(resources, (draft) => {
                    draft.hits = 0;
                  })
                );
              }}
            />
          </Stack>
        </Paper>
        <Typography sx={{ color: grey[500] }}>hit</Typography>
      </Box>
    </Stack>
  );
};

export default CCreateSquadResources;
