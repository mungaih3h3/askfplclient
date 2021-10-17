import Draft from "../../Draft";
import Chip, { ChipType } from "../Chip";

export default abstract class ChipWithDraft extends Chip {
  constructor(type: ChipType) {
    super(type);
    if (type === ChipType.triplecaptain)
      throw new Error("Triple captain chip does not include a draft");
  }
  draft: Draft = new Draft();
}
