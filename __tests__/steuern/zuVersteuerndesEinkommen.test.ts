import { berechneZuVersteuerndesEinkommen } from '../../src/utils/steuern/zuVersteuerndesEinkommen';
import { Steuerklasse } from '@/types/steuerklasse';

describe('berechneZuVersteuerndesEinkommen', () => {
  // Common test parameters
  const bruttoImJahr = 60000;
  const steuerfreibetragImJahr = 1000;
  const grundfreibetrag = 11604;
  const kinderfreibetrag = 9600; // Equivalent to 1 child
  const kinder = 1;
  const entlastungsbetragFuerAlleinerziehendeProKind = 240;
  const entlastungsbetragFuerAlleinerziehende = 4260;
  
  describe('Steuerklasse 1', () => {
    it('calculates taxable income correctly', () => {
      const steuerklasse: Steuerklasse = 'Klasse 1';
      
      // Expected: bruttoImJahr - steuerfreibetragImJahr - kinderfreibetrag - grundfreibetrag
      // = 60000 - 1000 - 9600 - 11604 = 37796
      const expected = 37796;
      
      expect(berechneZuVersteuerndesEinkommen(
        steuerklasse,
        bruttoImJahr,
        steuerfreibetragImJahr,
        grundfreibetrag,
        kinderfreibetrag,
        kinder,
        entlastungsbetragFuerAlleinerziehendeProKind,
        entlastungsbetragFuerAlleinerziehende
      )).toBe(expected);
    });
    
    it('returns 0 when deductions exceed income', () => {
      const steuerklasse: Steuerklasse = 'Klasse 1';
      const lowBrutto = 10000;
      
      // Deductions exceed income: 10000 - 1000 - 9600 - 11604 = -12204 (should be 0)
      expect(berechneZuVersteuerndesEinkommen(
        steuerklasse,
        lowBrutto,
        steuerfreibetragImJahr,
        grundfreibetrag,
        kinderfreibetrag,
        kinder,
        entlastungsbetragFuerAlleinerziehendeProKind,
        entlastungsbetragFuerAlleinerziehende
      )).toBe(0);
    });
  });
  
  describe('Steuerklasse 2', () => {
    it('calculates taxable income correctly with single parent relief', () => {
      const steuerklasse: Steuerklasse = 'Klasse 2';
      
      // Expected: bruttoImJahr - steuerfreibetragImJahr - kinderfreibetrag - entlastungsbetragFuerAlleinerziehende - kinder * entlastungsbetragFuerAlleinerziehendeProKind - grundfreibetrag
      // = 60000 - 1000 - 9600 - 4260 - 1*240 - 11604 = 33296
      const expected = 33296;
      
      expect(berechneZuVersteuerndesEinkommen(
        steuerklasse,
        bruttoImJahr,
        steuerfreibetragImJahr,
        grundfreibetrag,
        kinderfreibetrag,
        kinder,
        entlastungsbetragFuerAlleinerziehendeProKind,
        entlastungsbetragFuerAlleinerziehende
      )).toBe(expected);
    });
    
    it('calculates taxable income correctly with multiple children', () => {
      const steuerklasse: Steuerklasse = 'Klasse 2';
      const multipleKinder = 3;
      const multipleKinderfreibetrag = 28800; // 3 * 9600
      
      // Expected: bruttoImJahr - steuerfreibetragImJahr - multipleKinderfreibetrag - entlastungsbetragFuerAlleinerziehende - multipleKinder * entlastungsbetragFuerAlleinerziehendeProKind - grundfreibetrag
      // = 60000 - 1000 - 28800 - 4260 - 3*240 - 11604 = 13616
      const expected = 13616;
      
      expect(berechneZuVersteuerndesEinkommen(
        steuerklasse,
        bruttoImJahr,
        steuerfreibetragImJahr,
        grundfreibetrag,
        multipleKinderfreibetrag,
        multipleKinder,
        entlastungsbetragFuerAlleinerziehendeProKind,
        entlastungsbetragFuerAlleinerziehende
      )).toBe(expected);
    });
  });
  
  describe('Steuerklasse 3', () => {
    it('calculates taxable income correctly with double basic allowance', () => {
      const steuerklasse: Steuerklasse = 'Klasse 3';
      
      // Expected: bruttoImJahr - steuerfreibetragImJahr - kinderfreibetrag - grundfreibetrag * 2
      // = 60000 - 1000 - 9600 - 11604 * 2 = 26192
      const expected = 26192;
      
      expect(berechneZuVersteuerndesEinkommen(
        steuerklasse,
        bruttoImJahr,
        steuerfreibetragImJahr,
        grundfreibetrag,
        kinderfreibetrag,
        kinder,
        entlastungsbetragFuerAlleinerziehendeProKind,
        entlastungsbetragFuerAlleinerziehende
      )).toBe(expected);
    });
  });
  
  describe('Steuerklasse 4', () => {
    it('calculates taxable income correctly (same as Klasse 1)', () => {
      const steuerklasse: Steuerklasse = 'Klasse 4';
      
      // Expected: bruttoImJahr - steuerfreibetragImJahr - kinderfreibetrag - grundfreibetrag
      // = 60000 - 1000 - 9600 - 11604 = 37796
      const expected = 37796;
      
      expect(berechneZuVersteuerndesEinkommen(
        steuerklasse,
        bruttoImJahr,
        steuerfreibetragImJahr,
        grundfreibetrag,
        kinderfreibetrag,
        kinder,
        entlastungsbetragFuerAlleinerziehendeProKind,
        entlastungsbetragFuerAlleinerziehende
      )).toBe(expected);
    });
  });
  
  describe('Steuerklasse 5 and 6', () => {
    it('calculates taxable income correctly without basic allowance', () => {
      const steuerklasse5: Steuerklasse = 'Klasse 5';
      const steuerklasse6: Steuerklasse = 'Klasse 6';
      
      // Expected: bruttoImJahr - steuerfreibetragImJahr - kinderfreibetrag
      // = 60000 - 1000 - 9600 = 49400
      const expected = 49400;
      
      expect(berechneZuVersteuerndesEinkommen(
        steuerklasse5,
        bruttoImJahr,
        steuerfreibetragImJahr,
        grundfreibetrag,
        kinderfreibetrag,
        kinder,
        entlastungsbetragFuerAlleinerziehendeProKind,
        entlastungsbetragFuerAlleinerziehende
      )).toBe(expected);
      
      expect(berechneZuVersteuerndesEinkommen(
        steuerklasse6,
        bruttoImJahr,
        steuerfreibetragImJahr,
        grundfreibetrag,
        kinderfreibetrag,
        kinder,
        entlastungsbetragFuerAlleinerziehendeProKind,
        entlastungsbetragFuerAlleinerziehende
      )).toBe(expected);
    });
  });
});
