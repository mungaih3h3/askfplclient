import { Stack } from "@mui/material";
import { FC, useContext, useState } from "react";
import { useParams } from "react-router";
import CCreateComment from "../components/create/CCreateComment";
import CComment from "../components/present/CComment";
import { AuthContext } from "../contexts/AuthProvider";
import { CommentsContext } from "../contexts/CommentsProvider";
import { WithAuthentication } from "../HOC/WithAuthentication";
import Comment from "../logic/Comment";

interface PCommentsProps {}

const PComments: FC<PCommentsProps> = () => {
  const [showAddReply, setShowAddReply] = useState(false);
  const { getAuthenticatedUser } = useContext(AuthContext);
  const { getComments, changeComment, addComment } =
    useContext(CommentsContext);
  const { pollId } = useParams<{ pollId: string }>();
  if (!pollId) return <em>No comments. The post might have been deleted</em>;

  return (
    <Stack spacing={2}>
      <h2>Comments</h2>
      <span onClick={() => setShowAddReply(true)}>reply to post</span>
      {showAddReply && (
        <CCreateComment
          onCreate={(newComment) => {
            addComment(newComment);
            setShowAddReply(false);
          }}
          initialComment={new Comment("", getAuthenticatedUser().username)}
        />
      )}
      {getComments(pollId).map((comment, index) => (
        <CComment
          comment={comment}
          onChange={(newComment) => {
            changeComment(newComment, index);
          }}
        />
      ))}
    </Stack>
  );
};

export default WithAuthentication(PComments);
