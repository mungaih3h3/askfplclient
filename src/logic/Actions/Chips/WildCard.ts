import { ChipType } from "../Chip";
import ChipWithDraft from "./ChipWithDraft";

export default class WildCard extends ChipWithDraft {
  constructor() {
    super(ChipType.wildcard);
  }
}
