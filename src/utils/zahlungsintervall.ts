import { Abrechnungszeitraum } from "@/types/abrechnungszeitraum";

export function getZahlungsintervall(
  abrechnungszeitraum: Abrechnungszeitraum,
  gehaelter: number,
): string {
  if (abrechnungszeitraum === "Monat" && gehaelter !== 12) {
    return "Gehalt (" + gehaelter + "x im Jahr)";
  }
  return abrechnungszeitraum;
}
