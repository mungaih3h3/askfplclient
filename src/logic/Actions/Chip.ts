import Action from "../Action";
export enum ChipType {
  wildcard = "wc",
  freehit = "fh",
  benchboost = "bb",
  triplecaptain = "tc",
}

export default abstract class Chip extends Action {
  constructor(chipType: ChipType) {
    super("chip");
    this.chipType = chipType;
  }
  chipType: ChipType;
}
