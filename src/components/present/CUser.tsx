import { Paper, Typography } from "@mui/material";
import { FC } from "react";
import User from "../../logic/User";

interface CUserProps {
  user: User;
}

const CUser: FC<CUserProps> = ({ user }) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography>{user.username}</Typography>
    </Paper>
  );
};

export default CUser;
