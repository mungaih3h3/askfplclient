import { ChipType } from "../logic/Actions/Chip";
import FreeHit from "../logic/Actions/Chips/FreeHit";
import TripleCaptain from "../logic/Actions/Chips/TripleCaptain";
import WildCard from "../logic/Actions/Chips/WildCard";
import { hydrateDraft } from "./hydrateDraft";
import { hydratePlayer } from "./hydratePlayer";

export function hydrateChip(chip: any) {
  switch (chip.chipType) {
    case ChipType.triplecaptain:
      return new TripleCaptain(hydratePlayer(chip.player));
    case ChipType.wildcard: {
      const wc = new WildCard();
      wc.draft = hydrateDraft(chip.draft);
      return wc;
    }
    case ChipType.freehit: {
      const fh = new FreeHit();
      fh.draft = hydrateDraft(chip.draft);
      return fh;
    }
    case ChipType.benchboost: {
      const bb = new WildCard();
      bb.draft = hydrateDraft(chip.draft);
      return bb;
    }
    default:
      throw new Error("cannot hydrate chip: " + chip.chipType);
  }
}
