import Action from "../Action";

export default class Transfer extends Action {
  constructor(playerIn: string, playerOut: string) {
    super("transfer");
    this.playerIn = playerIn;
    this.playerOut = playerOut;
  }
  playerIn: string;
  playerOut: string;
}
