import produce from "immer";
import Comment from "../logic/Comment";
import hydrateOption from "./hydrateOption";
export function hydrateComment(comment: any): Comment {
  return produce(new Comment("", "", []), (draft) => {
    draft.username = comment.owner;
    draft.comment = comment.comment;
    draft.id = comment.id;
    draft.createdAt = comment.createdAt;
    draft.ancestors = comment.ancestors;
    draft.votes = comment.votes;
    if (Boolean(comment.suggestion)) {
      draft.suggestion = hydrateOption(comment.suggestion);
    }
  });
}
