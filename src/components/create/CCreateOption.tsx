import { Add, Clear } from "@mui/icons-material";
import {
  Stack,
  Typography,
  Box,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import produce from "immer";
import { FC } from "react";
import { ActionType } from "../../logic/Action";
import Option from "../../logic/Option";
import { fontSizes } from "../../theme/fontSizes";
import { ActionFilter } from "./CActionFactory";
import CCreateActionSwitch from "./CCreateActionSwitch";
import CCreateSquadResources from "./CCreateSquadResources";
interface CCreateOptionProps {
  onChange: (option: Option) => any;
  initialOption: Option;
  onDelete: (option: Option) => any;
  onOpenFactory?: (filter: ActionFilter) => any;
}

const CCreateOption: FC<CCreateOptionProps> = ({
  onChange,
  initialOption,
  onDelete,
  onOpenFactory = () => {},
}) => {
  return (
    <>
      <Stack spacing={3} sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            startIcon={<Add />}
            size="small"
            variant="contained"
            onClick={() => {
              onOpenFactory({
                chips:
                  initialOption.actions.find(
                    (a) => a.type === ActionType.chip
                  ) === undefined,
                captain:
                  initialOption.actions.find(
                    (a) => a.type === ActionType.captain
                  ) === undefined,
              });
            }}
          >
            Action
          </Button>
          <IconButton
            onClick={() => {
              onDelete(initialOption);
            }}
          >
            <Clear
              sx={{
                fontSize: fontSizes[4],
                color: grey[300],
              }}
            />
          </IconButton>
        </Box>
        <Divider />
        {initialOption.actions.length === 0 && (
          <Typography>No actions. Good to go 💯</Typography>
        )}
        {initialOption.actions.length !== 0 && (
          <CCreateSquadResources
            resources={initialOption.resources}
            onChange={(newResources) => {
              onChange(
                produce(initialOption, (draft) => {
                  draft.resources = newResources;
                })
              );
            }}
          />
        )}
        {initialOption.actions.map((action, index) => (
          <CCreateActionSwitch
            key={action.id}
            action={action}
            onChange={(action) => {
              const newOption = produce(initialOption, (draft) => {
                draft.actions[index] = action;
              });
              onChange(newOption);
            }}
          />
        ))}
      </Stack>
    </>
  );
};

export default CCreateOption;
