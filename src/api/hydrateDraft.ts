import produce from "immer";
import Draft from "../logic/Draft";
import { hydratePlayer } from "./hydratePlayer";

export function hydrateDraft(d: any) {
  return produce(new Draft(), (draft) => {
    draft.goalkeepers = d.goalkeepers.map(hydratePlayer);
    draft.defenders = d.defenders.map(hydratePlayer);
    draft.midfielders = d.midfielders.map(hydratePlayer);
    draft.forwards = d.forwards.map(hydratePlayer);
  });
}
