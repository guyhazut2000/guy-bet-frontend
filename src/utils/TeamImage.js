import {
  Milan,
  Bayern,
  RealMadrid,
  Benfica,
  Chelsea,
  ClubBrugge,
  Dortmund,
  Paris,
  Tottenham,
  EintrachtFrankfurt,
  Leipzig,
  Inter,
  Liverpool,
  Napoli,
  ManchesterCity,
  Porto,
} from "../images/index";

export const getTeamImage = (name) => {
  switch (name) {
    case "milan":
      return Milan;
    case "bayern":
      return Bayern;
    case "real madrid":
      return RealMadrid;
    case "benfica":
      return Benfica;
    case "chelsea":
      return Chelsea;
    case "club brugge":
      return ClubBrugge;
    case "dortmund":
      return Dortmund;
    case "paris":
      return Paris;
    case "tottenham":
      return Tottenham;
    case "eintracht frankfurt":
      return EintrachtFrankfurt;
    case "leipzig":
      return Leipzig;
    case "inter":
      return Inter;
    case "liverpool":
      return Liverpool;
    case "napoli":
      return Napoli;
    case "manchester city":
      return ManchesterCity;
    case "porto":
      return Porto;

    default:
      return null;
  }
};
