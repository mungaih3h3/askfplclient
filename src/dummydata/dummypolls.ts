import BenchAndPlay from "../logic/Actions/BenchAndPlay";
import Transfer from "../logic/Actions/Transfer";
import Option from "../logic/Option";
import Player, { PlayerRole } from "../logic/Player";
import Poll from "../logic/Poll";

export const dummypolls = [
  new Poll(
    "What do i do?",
    [
      new Option(),
      new Option([
        new Transfer(
          new Player("Romelu", PlayerRole.forward),
          new Player("Ronaldo", PlayerRole.forward)
        ),
        new BenchAndPlay(
          new Player("Trent", PlayerRole.defender),
          new Player("Van Dijk", PlayerRole.defender)
        ),
      ]),
    ],
    "flaming flamingo"
  ),
];
