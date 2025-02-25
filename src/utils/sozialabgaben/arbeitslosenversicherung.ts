export function berechneArbeitslosenversicherung(
  bruttoImJahr: number,
  beitragsbemessungsgrenzeArbeitslosenversicherungImJahr: number,
  arbeitslosenversicherungProzentsatz: number,
): number {
  // Stelle sicher, dass nur Einkommen bis zur BBG berücksichtigt wird
  const beitragspflichtigesEinkommen = Math.min(
    beitragsbemessungsgrenzeArbeitslosenversicherungImJahr,
    bruttoImJahr,
  );
  const arbeitslosenversicherungsKosten =
    beitragspflichtigesEinkommen * (arbeitslosenversicherungProzentsatz / 100);
  const arbeitslosenversicherungsAnteil = arbeitslosenversicherungsKosten / 2;
  return arbeitslosenversicherungsAnteil;
}
