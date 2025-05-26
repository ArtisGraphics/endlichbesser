import { berechneKirchensteuerProzentsatz, berechneKirchensteuer } from '../../src/utils/steuern/kirchensteuer';
import { Bundesland } from '@/types/bundesland';

describe('Kirchensteuer calculations', () => {
  describe('berechneKirchensteuerProzentsatz', () => {
    it('returns 8% for Bayern and Baden-Württemberg', () => {
      expect(berechneKirchensteuerProzentsatz('Bayern')).toBe(8);
      expect(berechneKirchensteuerProzentsatz('Baden-Württemberg')).toBe(8);
    });
    
    it('returns 9% for all other federal states', () => {
      const otherBundeslaender: Bundesland[] = [
        'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hessen',
        'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen',
        'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt',
        'Schleswig-Holstein', 'Thüringen'
      ];
      
      otherBundeslaender.forEach(bundesland => {
        expect(berechneKirchensteuerProzentsatz(bundesland)).toBe(9);
      });
    });
  });
  
  describe('berechneKirchensteuer', () => {
    it('calculates church tax correctly for 8% rate', () => {
      // Test case: 10,000€ income tax, 8% church tax rate
      // Expected: 10,000 * 0.08 = 800€
      expect(berechneKirchensteuer(10000, 8)).toBe(800);
      
      // Test case: 5,000€ income tax, 8% church tax rate
      // Expected: 5,000 * 0.08 = 400€
      expect(berechneKirchensteuer(5000, 8)).toBe(400);
    });
    
    it('calculates church tax correctly for 9% rate', () => {
      // Test case: 10,000€ income tax, 9% church tax rate
      // Expected: 10,000 * 0.09 = 900€
      expect(berechneKirchensteuer(10000, 9)).toBe(900);
      
      // Test case: 5,000€ income tax, 9% church tax rate
      // Expected: 5,000 * 0.09 = 450€
      expect(berechneKirchensteuer(5000, 9)).toBe(450);
    });
    
    it('handles edge cases correctly', () => {
      // Test case: 0€ income tax
      expect(berechneKirchensteuer(0, 9)).toBe(0);
      
      // Test case: 0% church tax rate (should not happen in practice)
      expect(berechneKirchensteuer(10000, 0)).toBe(0);
      
      // Test case: Decimal values
      expect(berechneKirchensteuer(1234.56, 9)).toBe(111.1104);
    });
  });
});
