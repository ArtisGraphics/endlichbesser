import { Bundesland } from "@/types/bundesland";

const arbeitstageFuer2025: Map<Bundesland, number> = new Map<
  Bundesland,
  number
>([
  ["Baden-Württemberg", 250],
  ["Bayern", 250],
  ["Berlin", 251],
  ["Brandenburg", 251],
  ["Bremen", 251],
  ["Hamburg", 251],
  ["Hessen", 251],
  ["Mecklenburg-Vorpommern", 251],
  ["Niedersachsen", 251],
  ["Nordrhein-Westfalen", 251],
  ["Rheinland-Pfalz", 251],
  ["Saarland", 250],
  ["Sachsen", 250],
  ["Sachsen-Anhalt", 250],
  ["Schleswig-Holstein", 251],
  ["Thüringen", 251],
]);

export function getArbeitstageImJahr(bundesland: Bundesland, jahr: number) {
  switch (jahr) {
    case 2025:
      return arbeitstageFuer2025.get(bundesland) || 0;
    default:
      return 0;
  }
}
