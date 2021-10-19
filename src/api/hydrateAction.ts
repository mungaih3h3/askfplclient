import Player from "../logic/Player";
import Transfer from "../logic/Actions/Transfer";
import { hydratePlayer } from "./hydratePlayer";
import BenchAndPlay from "../logic/Actions/BenchAndPlay";
import { hydrateChip } from "./hydrateChip";
export default function hydrateAction(action: any) {
  switch (action.type) {
    case "transfer": {
      return new Transfer(
        hydratePlayer(action.playerIn),
        hydratePlayer(action.playerOut)
      );
    }
    case "benchandplay":
      return new BenchAndPlay(
        hydratePlayer(action.playerIn),
        hydratePlayer(action.playerOut)
      );
    case "chip":
      return hydrateChip(action);
    default:
      throw new Error("Cannot hydrate action: " + action);
  }
}
