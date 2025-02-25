export function berechneRentenversicherung(
  bruttoImJahr: number,
  beitragsbemessungsgrenzeRentenversicherungImJahr: number,
  rentenversicherungProzentsatz: number,
): number {
  // Stelle sicher, dass nur Einkommen bis zur BBG berücksichtigt wird
  const beitragspflichtigesEinkommen = Math.min(
    beitragsbemessungsgrenzeRentenversicherungImJahr,
    bruttoImJahr,
  );
  const rentenversicherungsKosten =
    beitragspflichtigesEinkommen * (rentenversicherungProzentsatz / 100);
  const rentenversicherungsAnteil = rentenversicherungsKosten / 2;
  return rentenversicherungsAnteil;
}
