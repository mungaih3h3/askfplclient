import Action from "../Action";
export enum ChipType {
  wildcard = "wildcard",
  freehit = "freehit",
  benchboost = "benchboost",
  triplecaptain = "triplecaptain",
}

export default abstract class Chip extends Action {
  constructor(chipType: ChipType) {
    super("chip");
    this.chipType = chipType;
  }
  chipType: ChipType;
}
