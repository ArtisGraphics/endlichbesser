export function berechneUrlaubsstunden(
  urlaubstage: number,
  wochenstunden: number,
) {
  return (urlaubstage * wochenstunden) / 5;
}
