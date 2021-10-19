import produce from "immer";
import Poll from "../logic/Poll";
import hydrateOption from "./hydrateOption";
import { pollServer } from "./Polls";

export default function hydratePoll({
  title,
  id,
  options,
  createdAt,
  owner,
}: pollServer & { owner: string }): Poll {
  return produce(new Poll("", [], ""), (draft) => {
    draft.title = title;
    draft.id = id;
    draft.options = options.map((option) => hydrateOption(option));
    draft.createdAt = createdAt;
    draft.comments = [];
    draft.username = owner;
  });
}
