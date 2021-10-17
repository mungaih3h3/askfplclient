import Action from "../Action";
import Player from "../Player";

export default class Transfer extends Action {
  constructor(
    playerIn: Player = Player.getNull(),
    playerOut: Player = Player.getNull()
  ) {
    super("transfer");
    this.playerIn = playerIn;
    this.playerOut = playerOut;
  }
  playerIn: Player;
  playerOut: Player;
}
