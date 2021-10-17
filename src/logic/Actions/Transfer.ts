import Action from "../Action";
import Player from "../Player";

export default class Transfer extends Action {
  constructor(playerIn?: Player, playerOut?: Player) {
    super("transfer");
    this.playerIn = playerIn;
    this.playerOut = playerOut;
  }
  playerIn: Player | undefined;
  playerOut: Player | undefined;
}
