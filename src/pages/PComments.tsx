import { Button, Stack } from "@mui/material";
import { FC, useContext, useState } from "react";
import { useParams } from "react-router";
import CCreateComment from "../components/create/CCreateComment";
import CComment from "../components/present/CComment";
import { AuthContext } from "../contexts/AuthProvider";
import { CommentsContext } from "../contexts/CommentsProvider";
import { WithAuthentication } from "../HOC/WithAuthentication";
import Comment from "../logic/Comment";
import { Reply, ArrowBackIos } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
interface PCommentsProps {}

const PComments: FC<PCommentsProps> = () => {
  const [showAddReply, setShowAddReply] = useState(false);
  const { getAuthenticatedUser } = useContext(AuthContext);
  const history = useHistory();
  const { getComments, changeComment, addComment } =
    useContext(CommentsContext);
  const { pollId } = useParams<{ pollId: string }>();
  if (!pollId) return <em>No comments. The post might have been deleted</em>;

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <h2>Discussion</h2>
        <Button
          onClick={() => history.goBack()}
          variant="outlined"
          startIcon={<ArrowBackIos />}
        >
          Back
        </Button>
      </Box>
      <Box>
        <Button
          startIcon={<Reply />}
          onClick={() => setShowAddReply(!showAddReply)}
        >
          reply to post
        </Button>
      </Box>
      {showAddReply && (
        <CCreateComment
          onCreate={(newComment) => {
            addComment(newComment);
            setShowAddReply(false);
          }}
          initialComment={new Comment("", getAuthenticatedUser().username)}
        />
      )}
      <Stack spacing={2}>
        {getComments(pollId).map((comment, index) => (
          <CComment
            comment={comment}
            onChange={(newComment) => {
              changeComment(newComment, index);
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default WithAuthentication(PComments);
