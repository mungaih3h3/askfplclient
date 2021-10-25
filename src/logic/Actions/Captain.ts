import Action, { ActionType } from "../Action";
import Player from "./../Player";
export default class Captain extends Action {
  constructor(player: Player = Player.getNull(), times: number = 2) {
    super(ActionType.captain);
    this.player = player;
    this.times = times;
  }
  player: Player;
  times: number = 2;
}
