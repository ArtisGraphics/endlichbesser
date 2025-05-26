export function berechneEinkommenssteuer(
  zuVersteuerndesEinkommen: number,
  grundfreibetrag: number,
): number {
  let steuer;

  const abgerundetesEinkommen = Math.floor(zuVersteuerndesEinkommen);

  if (abgerundetesEinkommen <= grundfreibetrag) {
    steuer = 0;
  } else if (abgerundetesEinkommen <= 17443) {
    const y = (abgerundetesEinkommen - grundfreibetrag) / 10000;
    steuer = (932.3 * y + 1400) * y;
  } else if (abgerundetesEinkommen <= 68480) {
    const z = (abgerundetesEinkommen - 17443) / 10000;
    steuer = (176.64 * z + 2397) * z + 1015.13;
  } else if (abgerundetesEinkommen <= 277825) {
    steuer = 0.42 * abgerundetesEinkommen - 10911.92;
  } else {
    steuer = 0.45 * abgerundetesEinkommen - 19246.67;
  }
  return Math.floor(steuer);
}

export function berechneKinderfreibetrag(kinderfreibetrag: number): number {
  const kinderfreibetragProKind = 6672 + 2928;
  return kinderfreibetrag * kinderfreibetragProKind;
}
