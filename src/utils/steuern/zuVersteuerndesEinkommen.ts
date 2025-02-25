import { Steuerklasse } from "@/types/steuerklasse";

export function berechneZuVersteuerndesEinkommen(
  steuerklasse: Steuerklasse,
  bruttoImJahr: number,
  steuerfreibetragImJahr: number,
  grundfreibetrag: number,
  kinder: number,
  entlastungsbetragFuerAlleinerziehendeProKind: number,
  entlastungsbetragFuerAlleinerziehende: number,
) {
  let zuVersteuerndesEinkommen = bruttoImJahr;
  switch (steuerklasse) {
    case "Klasse 1":
    case "Klasse 4":
      zuVersteuerndesEinkommen = Math.max(
        bruttoImJahr - steuerfreibetragImJahr - grundfreibetrag,
        0,
      );
      break;
    case "Klasse 2":
      zuVersteuerndesEinkommen = Math.max(
        bruttoImJahr -
          steuerfreibetragImJahr -
          entlastungsbetragFuerAlleinerziehende -
          kinder * entlastungsbetragFuerAlleinerziehendeProKind -
          grundfreibetrag,
        0,
      );
      break;
    case "Klasse 3":
      zuVersteuerndesEinkommen = Math.max(
        bruttoImJahr - steuerfreibetragImJahr - grundfreibetrag * 2,
        0,
      );
      break;
    case "Klasse 5":
    case "Klasse 6":
      zuVersteuerndesEinkommen = Math.max(
        bruttoImJahr - steuerfreibetragImJahr,
        0,
      );
      break;
  }
  return zuVersteuerndesEinkommen;
}
