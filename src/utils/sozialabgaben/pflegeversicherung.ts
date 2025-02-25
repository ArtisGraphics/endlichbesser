import { Bundesland } from "@/types/bundesland";

export function berechnePflegeversicherungArbeitgeberProzentsatz(
  bundesland: Bundesland,
  sachsenZuschlag: number,
  basisPflegeversicherungProzentsatzAG: number,
): number {
  let pflegeversicherungAG = basisPflegeversicherungProzentsatzAG;
  if (bundesland === "Sachsen") {
    pflegeversicherungAG -= sachsenZuschlag;
  }
  return pflegeversicherungAG;
}

export function berechnePflegeversicherungArbeitnehmerProzentsatz(
  bundesland: Bundesland,
  kinder: number,
  alter: number,
  sachsenZuschlag: number,
  kinderlosZuschlag: number,
  basisPflegeversicherungProzentsatzAN: number,
): number {
  let pflegeversicherungProzentsatzAN = basisPflegeversicherungProzentsatzAN;
  const reduzierungProKind = 0.25;

  if (bundesland === "Sachsen") {
    pflegeversicherungProzentsatzAN += sachsenZuschlag;
  }
  if (kinder === 0 && alter >= 23) {
    pflegeversicherungProzentsatzAN += kinderlosZuschlag;
  }
  if (kinder >= 2) {
    pflegeversicherungProzentsatzAN -=
      reduzierungProKind * Math.min(kinder - 1, 4);
  }
  return pflegeversicherungProzentsatzAN;
}

export function berechnePflegeversicherungsAnteilArbeitnehmer(
  bruttoImJahr: number,
  beitragsbemessungsgrenzePflegeversicherungImJahr: number,
  pflegeversicherungProzentsatzAN: number,
): number {
  const beitragspflichtigesEinkommen = Math.min(
    beitragsbemessungsgrenzePflegeversicherungImJahr,
    bruttoImJahr,
  );
  const pflegeversicherungsAnteil =
    beitragspflichtigesEinkommen * (pflegeversicherungProzentsatzAN / 100);
  return pflegeversicherungsAnteil;
}
