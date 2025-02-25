export function berechneKrankenversicherungGesetzlich(
  bruttoImJahr: number,
  beitragsbemessungsgrenzeKrankenversicherungImJahr: number,
  krankenversicherungProzentsatz: number,
): number {
  // Stelle sicher, dass nur Einkommen bis zur BBG berücksichtigt wird
  const beitragspflichtigesEinkommen = Math.min(
    beitragsbemessungsgrenzeKrankenversicherungImJahr,
    bruttoImJahr,
  );
  const krankenversicherungsKosten =
    beitragspflichtigesEinkommen * (krankenversicherungProzentsatz / 100);
  const krankenversicherungsAnteil = krankenversicherungsKosten / 2;
  return krankenversicherungsAnteil;
}
