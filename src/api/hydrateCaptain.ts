import Captain from "../logic/Actions/Captain";
import { hydratePlayer } from "./hydratePlayer";

export function hydrateCaptain(captain: any) {
  return new Captain(hydratePlayer(captain.player));
}
