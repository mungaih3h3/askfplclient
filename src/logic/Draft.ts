import { immerable } from "immer";
import Player, { PlayerRole } from "./Player";

export default class Draft {
  constructor() {}
  [immerable] = true;
  goalkeepers: Player[] = new Array<Player>(2)
    .fill(Player.getNull(PlayerRole.goalkeeper))
    .map(() => Player.getNull(PlayerRole.goalkeeper));
  defenders: Player[] = new Array<Player>(5)
    .fill(Player.getNull(PlayerRole.defender))
    .map(() => Player.getNull(PlayerRole.defender));
  midfielders: Player[] = new Array<Player>(5)
    .fill(Player.getNull(PlayerRole.midfielder))
    .map(() => Player.getNull(PlayerRole.midfielder));
  forwards: Player[] = new Array<Player>(3)
    .fill(Player.getNull(PlayerRole.forward))
    .map(() => Player.getNull(PlayerRole.forward));
}
