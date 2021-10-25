import { immerable } from "immer";
import Action, { ActionType } from "../Action";
import Player from "../Player";

export default class BenchAndPlay extends Action {
  constructor(
    playerIn: Player = Player.getNull(),
    playerOut: Player = Player.getNull()
  ) {
    super(ActionType.benchandplay);
    this.playerIn = playerIn;
    this.playerOut = playerOut;
  }
  [immerable] = true;
  playerIn: Player;
  playerOut: Player;
}
