import { FC } from "react";
import Team from "../../logic/Team";
import arsenal from "../../jerseys/arsenal.webp";
import astonvilla from "../../jerseys/aston villa.webp";
import brentford from "../../jerseys/brentford.webp";
import brighton from "../../jerseys/brighton.webp";
import burnley from "../../jerseys/burnley.webp";
import chelsea from "../../jerseys/chelsea.webp";
import crystalpalace from "../../jerseys/crystal palace.webp";
import everton from "../../jerseys/everton.webp";
import leeds from "../../jerseys/leeds.webp";
import leicester from "../../jerseys/leicester.webp";
import liverpool from "../../jerseys/liverpool.webp";
import mancity from "../../jerseys/man city.webp";
import manutd from "../../jerseys/man utd.webp";
import newcastle from "../../jerseys/newcastle.webp";
import norwich from "../../jerseys/norwich.webp";
import southampton from "../../jerseys/southampton.webp";
import spurs from "../../jerseys/spurs.webp";
import watford from "../../jerseys/watford.webp";
import westham from "../../jerseys/west ham.webp";
import wolves from "../../jerseys/wolves.webp";
import empty from "../../jerseys/null.webp";

interface CTeamProps {
  team: Team;
}

function getShirt(teamname: string) {
  switch (teamname) {
    case "wolves":
      return wolves;
    case "west ham":
      return westham;
    case "watford":
      return watford;
    case "spurs":
      return spurs;
    case "southampton":
      return southampton;
    case "norwich":
      return norwich;
    case "newcastle":
      return newcastle;
    case "man utd":
      return manutd;
    case "man city":
      return mancity;
    case "liverpool":
      return liverpool;
    case "leeds":
      return leeds;
    case "leicester":
      return leicester;
    case "everton":
      return everton;
    case "crystal palace":
      return crystalpalace;
    case "chelsea":
      return chelsea;
    case "burnley":
      return burnley;
    case "brighton":
      return brighton;
    case "brentford":
      return brentford;
    case "aston villa":
      return astonvilla;
    case "arsenal":
      return arsenal;
    default:
      return empty;
  }
}

const CTeam: FC<CTeamProps> = ({ team }) => {
  return (
    <img
      src={getShirt(team.name.toLowerCase())}
      style={{
        height: 32,
      }}
      // type="image/webp"
    />
  );
};

export default CTeam;
