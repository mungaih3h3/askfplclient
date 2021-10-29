import produce from "immer";
import Option from "../logic/Option";
import hydrateAction from "./hydrateAction";
import { hydrateResources } from "./hydrateResources";

export default function hydrateOption(option: any): Option {
  return produce(new Option([]), (draft) => {
    draft.id = option.id;
    draft.actions = option.actions.map((option: any) => hydrateAction(option));
    if (option.resources !== undefined) {
      draft.resources = hydrateResources(option.resources);
    }
  });
}
