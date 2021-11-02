import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";
import { VotesContext } from "../../contexts/VotesProvider";
import Option from "../../logic/Option";
import { fontSizes } from "../../theme/fontSizes";
import COption from "./COption";

interface COptionWrapperProps {
  option: Option;
  pastDeadline: boolean;
  votePercent: () => number;
  vote: (optionId: string) => any;
  userSelection: string | undefined;
}

const COptionWrapper: FC<COptionWrapperProps> = ({
  option,
  pastDeadline,
  vote,
  votePercent,
  userSelection,
}) => {
  const { isAuthenticated, openAuthDialog } = useContext(AuthContext);

  return (
    <Paper
      variant="outlined"
      sx={{
        padding: 2,
        backgroundColor: (theme) =>
          userSelection === option.id
            ? theme.palette.primary.main
            : theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onClick={async () => {
        if (!isAuthenticated()) {
          openAuthDialog();
        } else {
          // getTotalPollVotes(poll.id);
          if (pastDeadline) {
            toast.error(
              "You cannot vote for this poll. You are past the deadline"
            );
            return;
          }
          vote(option.id);
        }
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <COption option={option} />
      </Box>
      {userSelection && (
        <Typography sx={{ fontSize: fontSizes[5], p: 3, fontWeight: 700 }}>
          {votePercent()}%
        </Typography>
      )}
    </Paper>
  );
};

export default COptionWrapper;
