import { Button, Stack, TextField } from "@mui/material";
import produce from "immer";
import { FC, useState } from "react";
import Comment from "../../logic/Comment";
interface CCreateCommentProps {
  initialComment: Comment;
  onCreate: (comment: Comment) => any;
}

const CCreateComment: FC<CCreateCommentProps> = ({
  initialComment,
  onCreate,
}) => {
  const [comment, setComment] = useState(initialComment);
  return (
    <Stack spacing={2}>
      <TextField
        placeholder="Enter comment..."
        value={comment.comment}
        onChange={({ target: { value } }) => {
          setComment(
            produce((draft) => {
              draft.comment = value;
            })
          );
        }}
      />
      <Button
        onClick={() => {
          onCreate(comment);
        }}
      >
        Create
      </Button>
    </Stack>
  );
};

export default CCreateComment;
