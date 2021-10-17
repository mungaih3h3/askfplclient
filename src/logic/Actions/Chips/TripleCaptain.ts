import Player from "../../Player";
import Chip, { ChipType } from "../Chip";

export default class TripleCaptain extends Chip {
  constructor(player: Player) {
    super(ChipType.triplecaptain);
    this.player = player;
  }
  player: Player;
}
