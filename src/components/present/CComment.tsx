import { Button, Card, CardContent, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { formatDistanceToNow } from "date-fns";
import produce from "immer";
import { FC, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import Comment from "../../logic/Comment";
import CCreateComment from "../create/CCreateComment";
import { Reply, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box } from "@mui/system";
interface CCommentProps {
  comment: Comment;
  onChange: (comment: Comment) => any;
}

const CComment: FC<CCommentProps> = ({ comment, onChange }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showAddReply, setShowAddReply] = useState(false);
  const { getAuthenticatedUser } = useContext(AuthContext);
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <div
            style={{
              display: "flex",
              gap: 10,
              color: grey[500],
              alignItems: "center",
            }}
          >
            <span>{comment.username}</span>
            <span>-</span>
            <span>
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <p>{comment.comment}</p>
          <div
            style={{
              display: "flex",
              gap: 10,
            }}
          >
            {comment.comments.length > 0 && (
              <Button
                size="small"
                startIcon={showReplies ? <VisibilityOff /> : <Visibility />}
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? "hide" : "show"} replies
              </Button>
            )}
            <Button
              size="small"
              startIcon={<Reply />}
              onClick={() => setShowAddReply(!showAddReply)}
            >
              reply
            </Button>
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
          <Box>
            {showReplies &&
              comment.comments.map((reply) => (
                <CComment comment={reply} onChange={onChange} />
              ))}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CComment;
