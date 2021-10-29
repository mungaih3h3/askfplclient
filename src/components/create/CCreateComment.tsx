import { Add } from "@mui/icons-material";
import { Button, Stack, TextField } from "@mui/material";
import produce from "immer";
import { FC, useState, useContext } from "react";
import Comment from "../../logic/Comment";
import Option from "../../logic/Option";
import CCreateOption from "./CCreateOption";
import { ActionFactoryContext } from "../../contexts/ActionFactoryProvider";

interface CCreateCommentProps {
  initialComment: Comment;
  onCreate: (comment: Comment) => any;
}

const CCreateComment: FC<CCreateCommentProps> = ({
  initialComment,
  onCreate,
}) => {
  const [comment, setComment] = useState(initialComment);
  const { openActionFactoryDialog } = useContext(ActionFactoryContext);

  return (
    <Stack spacing={2}>
      {comment.suggestion !== undefined ? (
        <CCreateOption
          onChange={(suggestion) => {
            const newComment = produce(comment, (draft) => {
              draft.suggestion = suggestion;
            });
            setComment(newComment);
          }}
          onDelete={() => {
            setComment(
              produce((draft) => {
                draft.suggestion = undefined;
              })
            );
          }}
          initialOption={comment.suggestion}
          onOpenFactory={(filter) => {
            openActionFactoryDialog(filter, (newAction) => {
              const newComment = produce(comment, (draft) => {
                draft.suggestion?.actions.push(newAction);
              });
              setComment(newComment);
            });
          }}
        />
      ) : (
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => {
            setComment(
              produce((draft) => {
                draft.suggestion = new Option([]);
              })
            );
          }}
        >
          Suggestion
        </Button>
      )}
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
        size="small"
        variant="contained"
        onClick={() => {
          onCreate(comment);
        }}
      >
        Reply
      </Button>
    </Stack>
  );
};

export default CCreateComment;
