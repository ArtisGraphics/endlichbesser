import {
  berechnePflegeversicherungArbeitgeberProzentsatz,
  berechnePflegeversicherungArbeitnehmerProzentsatz,
  berechnePflegeversicherungsAnteilArbeitnehmer
} from '../../src/utils/sozialabgaben/pflegeversicherung';
import { Bundesland } from '@/types/bundesland';

describe('Pflegeversicherung calculations', () => {
  describe('berechnePflegeversicherungArbeitgeberProzentsatz', () => {
    it('calculates employer percentage correctly for Sachsen', () => {
      const bundesland: Bundesland = 'Sachsen';
      const sachsenZuschlag = 0.5;
      const basisProzentsatz = 1.525;

      // Expected: 1.525 - 0.5 = 1.025%
      expect(berechnePflegeversicherungArbeitgeberProzentsatz(
        bundesland, sachsenZuschlag, basisProzentsatz
      )).toBe(1.025);
    });

    it('calculates employer percentage correctly for other federal states', () => {
      const bundesland: Bundesland = 'Berlin';
      const sachsenZuschlag = 0.5;
      const basisProzentsatz = 1.525;

      // Expected: No change to base percentage
      expect(berechnePflegeversicherungArbeitgeberProzentsatz(
        bundesland, sachsenZuschlag, basisProzentsatz
      )).toBe(1.525);
    });
  });

  describe('berechnePflegeversicherungArbeitnehmerProzentsatz', () => {
    it('calculates employee percentage correctly for Sachsen', () => {
      const bundesland: Bundesland = 'Sachsen';
      const kinder = 0;
      const alter = 30;
      const sachsenZuschlag = 0.5;
      const kinderlosZuschlag = 0.35;
      const basisProzentsatz = 1.525;

      // Expected: 1.525 + 0.5 + 0.35 = 2.375%
      expect(berechnePflegeversicherungArbeitnehmerProzentsatz(
        bundesland, kinder, alter, sachsenZuschlag, kinderlosZuschlag, basisProzentsatz
      )).toBe(2.375);
    });

    it('calculates employee percentage correctly for other federal states with no children', () => {
      const bundesland: Bundesland = 'Berlin';
      const kinder = 0;
      const alter = 30;
      const sachsenZuschlag = 0.5;
      const kinderlosZuschlag = 0.35;
      const basisProzentsatz = 1.525;

      // Expected: 1.525 + 0.35 = 1.875%
      expect(berechnePflegeversicherungArbeitnehmerProzentsatz(
        bundesland, kinder, alter, sachsenZuschlag, kinderlosZuschlag, basisProzentsatz
      )).toBe(1.875);
    });

    it('does not apply childless surcharge for people under 23', () => {
      const bundesland: Bundesland = 'Berlin';
      const kinder = 0;
      const alter = 22;
      const sachsenZuschlag = 0.5;
      const kinderlosZuschlag = 0.35;
      const basisProzentsatz = 1.525;

      // Expected: No childless surcharge
      expect(berechnePflegeversicherungArbeitnehmerProzentsatz(
        bundesland, kinder, alter, sachsenZuschlag, kinderlosZuschlag, basisProzentsatz
      )).toBe(1.525);
    });

    it('applies reduction for multiple children', () => {
      const bundesland: Bundesland = 'Berlin';
      const kinder = 3;
      const alter = 30;
      const sachsenZuschlag = 0.5;
      const kinderlosZuschlag = 0.35;
      const basisProzentsatz = 1.525;

      // Expected: 1.525 - (0.25 * 2) = 1.025%
      expect(berechnePflegeversicherungArbeitnehmerProzentsatz(
        bundesland, kinder, alter, sachsenZuschlag, kinderlosZuschlag, basisProzentsatz
      )).toBe(1.025);
    });

    it('caps reduction at 4 children', () => {
      const bundesland: Bundesland = 'Berlin';
      const kinder = 6;
      const alter = 30;
      const sachsenZuschlag = 0.5;
      const kinderlosZuschlag = 0.35;
      const basisProzentsatz = 1.525;

      // Expected: 1.525 - (0.25 * 4) = 0.525%
      expect(berechnePflegeversicherungArbeitnehmerProzentsatz(
        bundesland, kinder, alter, sachsenZuschlag, kinderlosZuschlag, basisProzentsatz
      )).toBeCloseTo(0.525, 4);
    });
  });

  describe('berechnePflegeversicherungsAnteilArbeitnehmer', () => {
    it('calculates employee contribution correctly when income is below the ceiling', () => {
      const bruttoImJahr = 50000;
      const beitragsbemessungsgrenze = 60000;
      const prozentsatz = 1.875;

      // Expected: 50,000 * 0.01875 = 937.5€
      expect(berechnePflegeversicherungsAnteilArbeitnehmer(
        bruttoImJahr, beitragsbemessungsgrenze, prozentsatz
      )).toBe(937.5);
    });

    it('calculates employee contribution correctly when income is above the ceiling', () => {
      const bruttoImJahr = 70000;
      const beitragsbemessungsgrenze = 60000;
      const prozentsatz = 1.875;

      // Expected: 60,000 * 0.01875 = 1,125€
      expect(berechnePflegeversicherungsAnteilArbeitnehmer(
        bruttoImJahr, beitragsbemessungsgrenze, prozentsatz
      )).toBe(1125);
    });

    it('handles edge cases correctly', () => {
      // Test case: 0€ annual income
      expect(berechnePflegeversicherungsAnteilArbeitnehmer(0, 60000, 1.875)).toBe(0);

      // Test case: 0% rate
      expect(berechnePflegeversicherungsAnteilArbeitnehmer(50000, 60000, 0)).toBe(0);

      // Test case: 0€ ceiling
      expect(berechnePflegeversicherungsAnteilArbeitnehmer(50000, 0, 1.875)).toBe(0);
    });
  });
});
