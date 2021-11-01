import produce from "immer";
import Poll from "../logic/Poll";
import hydrateOption from "./hydrateOption";
import { pollServer } from "./Polls";

export default function hydratePoll(poll: any): Poll {
  return produce(new Poll("", [], ""), (draft) => {
    draft.title = poll.title;
    draft.id = poll.id;
    draft.options = poll.options.map((option: any) => hydrateOption(option));
    draft.createdAt = poll.createdAt;
    draft.username = poll.owner;
    draft.gw = poll.gw || 0;
  });
}
