import Draft from "../../Draft";
import { ChipType } from "../Chip";
import ChipWithDraft from "./ChipWithDraft";

export default class FreeHit extends ChipWithDraft {
  constructor() {
    super(ChipType.freehit);
  }
}
