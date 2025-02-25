export function berechneSolidaritaetszuschlag(
  einkommensteuer: number,
  istVerheiratet: boolean = false,
): number {
  const soliSatz = 5.5; // Soli-Satz in Prozent
  // Freibeträge und Grenzen für die Progressionszone
  const freibetragSingle = 19950; // Freibetrag für Singles
  const freibetragVerheiratet = freibetragSingle * 2; // Freibetrag für Verheiratete
  const progressionszoneEndeSingle = 62649; // Ende der Progressionszone für Singles
  const progressionszoneEndeVerheiratet = progressionszoneEndeSingle * 2; // Ende der Progressionszone für Verheiratete

  // Wähle die richtigen Grenzen basierend auf dem Familienstand
  const freibetrag = istVerheiratet ? freibetragVerheiratet : freibetragSingle;
  const progressionszoneEnde = istVerheiratet
    ? progressionszoneEndeVerheiratet
    : progressionszoneEndeSingle;

  // Wenn die Einkommensteuer unter dem Freibetrag liegt, wird kein Soli fällig
  if (einkommensteuer <= freibetrag) {
    return 0;
  }

  // Wenn die Einkommensteuer in der Progressionszone liegt, wird der Soli anteilig berechnet
  if (einkommensteuer <= progressionszoneEnde) {
    // Berechne den Anteil der Einkommensteuer, der über dem Freibetrag liegt
    const einkommensteuerUeberFreibetrag = einkommensteuer - freibetrag;
    // Berechne den Anteil der Progressionszone, der bereits genutzt wird
    const progressionszoneBreite = progressionszoneEnde - freibetrag;
    // Berechne den reduzierten Soli-Satz
    const soliSatz =
      (einkommensteuerUeberFreibetrag / progressionszoneBreite) * 5.5;
    // Berechne den Soli-Betrag
    const soli = (einkommensteuer * soliSatz) / 100;
    return soli;
  }

  // Wenn die Einkommensteuer über der Progressionszone liegt, wird der volle Soli fällig
  return (einkommensteuer * soliSatz) / 100;
}
