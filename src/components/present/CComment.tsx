import { Stack } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import produce from "immer";
import { FC, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import Comment from "../../logic/Comment";
import CCreateComment from "../create/CCreateComment";

interface CCommentProps {
  comment: Comment;
  onChange: (comment: Comment) => any;
}

const CComment: FC<CCommentProps> = ({ comment, onChange }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showAddReply, setShowAddReply] = useState(false);
  const { getAuthenticatedUser } = useContext(AuthContext);
  return (
    <Stack spacing={1}>
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <p>{comment.username}</p>
        <p>
          {formatDistanceToNow(new Date(comment.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <p>{comment.comment}</p>
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        {comment.comments.length > 0 && (
          <span onClick={() => setShowReplies(!showReplies)}>
            {showReplies ? "hide" : "show"} replies
          </span>
        )}
        <span onClick={() => setShowAddReply(true)}>reply</span>
      </div>
      {showAddReply && (
        <CCreateComment
          initialComment={new Comment("", getAuthenticatedUser().username)}
          onCreate={(newComment) => {
            const n = produce(comment, (draft) => {
              draft.comments.push(newComment);
            });
            onChange(n);
            setShowAddReply(false);
          }}
        />
      )}
      <div style={{ marginLeft: 10 }}>
        {showReplies &&
          comment.comments.map((reply) => (
            <CComment comment={reply} onChange={onChange} />
          ))}
      </div>
    </Stack>
  );
};

export default CComment;
