import { Steuerklasse } from "@/types/steuerklasse";

export function berechneZuVersteuerndesEinkommen(
  steuerklasse: Steuerklasse,
  bruttoImJahr: number,
  steuerfreibetragImJahr: number,
  grundfreibetrag: number,
  kinderfreibetrag: number,
  kinder: number,
  entlastungsbetragFuerAlleinerziehendeProKind: number,
  entlastungsbetragFuerAlleinerziehende: number,
) {
  let zuVersteuerndesEinkommen = bruttoImJahr;
  switch (steuerklasse) {
    case "Klasse 1":
    case "Klasse 4":
      zuVersteuerndesEinkommen = Math.max(
        bruttoImJahr -
          steuerfreibetragImJahr -
          kinderfreibetrag -
          grundfreibetrag,
        0,
      );
      break;
    case "Klasse 2":
      zuVersteuerndesEinkommen = Math.max(
        bruttoImJahr -
          steuerfreibetragImJahr -
          kinderfreibetrag -
          entlastungsbetragFuerAlleinerziehende -
          kinder * entlastungsbetragFuerAlleinerziehendeProKind -
          grundfreibetrag,
        0,
      );
      break;
    case "Klasse 3":
      zuVersteuerndesEinkommen = Math.max(
        bruttoImJahr -
          steuerfreibetragImJahr -
          kinderfreibetrag -
          grundfreibetrag * 2,
        0,
      );
      break;
    case "Klasse 5":
    case "Klasse 6":
      zuVersteuerndesEinkommen = Math.max(
        bruttoImJahr - steuerfreibetragImJahr - kinderfreibetrag,
        0,
      );
      break;
  }
  return zuVersteuerndesEinkommen;
}
