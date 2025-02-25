export function berechneStundenlohn(stundenImMonat: number, lohn: number) {
  return Math.round((lohn / stundenImMonat) * 100) / 100;
}
