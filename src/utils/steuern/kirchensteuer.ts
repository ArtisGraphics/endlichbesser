import { Bundesland } from "@/types/bundesland";

export function berechneKirchensteuerProzentsatz(
  bundesland: Bundesland,
): number {
  return bundesland === "Bayern" || bundesland === "Baden-Württemberg" ? 8 : 9;
}

export function berechneKirchensteuer(
  einkommenssteuer: number,
  kirchensteuerProzent: number,
): number {
  return einkommenssteuer * (kirchensteuerProzent / 100);
}
