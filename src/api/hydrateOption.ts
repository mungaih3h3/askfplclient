import produce from "immer";
import Option from "../logic/Option";
import hydrateAction from "./hydrateAction";

export default function hydrateOption(option: any): Option {
  return produce(new Option([]), (draft) => {
    draft.id = option.id;
    draft.actions = option.actions.map((option: any) => hydrateAction(option));
  });
}
