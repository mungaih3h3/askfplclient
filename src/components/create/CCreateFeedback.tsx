import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";

interface CCreateFeedbackProps {
  onCreate: (feedback: string) => any;
}

const CCreateFeedback: FC<CCreateFeedbackProps> = ({ onCreate }) => {
  const [feedback, setFeedback] = useState("");
  return (
    <Stack spacing={2}>
      <TextField
        placeholder="Request a new feature or report a bug..."
        value={feedback}
        onChange={({ target: { value } }) => setFeedback(value)}
        multiline
      />
      <Button variant="contained" onClick={() => onCreate(feedback)}>
        Submit
      </Button>
    </Stack>
  );
};

interface CCreateFeedbackDialogProps extends CCreateFeedbackProps {
  open: boolean;
  onClose: () => any;
}

export const CCreateFeedbackDialog: FC<CCreateFeedbackDialogProps> = ({
  open,
  onClose,
  ...rest
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Feedback</DialogTitle>
      <DialogContent>
        <CCreateFeedback {...rest} />
      </DialogContent>
    </Dialog>
  );
};

export default CCreateFeedback;
