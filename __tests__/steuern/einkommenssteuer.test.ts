import { berechneEinkommenssteuer, berechneKinderfreibetrag } from '../../src/utils/steuern/einkommenssteuer';

describe('Einkommenssteuer calculations', () => {
  describe('berechneEinkommenssteuer', () => {
    it('returns 0 when income is below or equal to the basic tax-free allowance', () => {
      const grundfreibetrag = 11604;
      
      // Test case: Income equal to Grundfreibetrag
      expect(berechneEinkommenssteuer(grundfreibetrag, grundfreibetrag)).toBe(0);
      
      // Test case: Income below Grundfreibetrag
      expect(berechneEinkommenssteuer(10000, grundfreibetrag)).toBe(0);
    });
    
    it('calculates tax correctly for the first progressive zone (up to 17,443€)', () => {
      const grundfreibetrag = 11604;
      
      // Test case: 15,000€ taxable income
      // Formula: (932.3 * y + 1400) * y, where y = (income - grundfreibetrag) / 10000
      const y = (15000 - grundfreibetrag) / 10000; // = 0.3396
      const expectedTax = Math.floor((932.3 * y + 1400) * y); // ≈ 599
      expect(berechneEinkommenssteuer(15000, grundfreibetrag)).toBe(expectedTax);
      
      // Test case: 17,443€ taxable income (upper limit of first zone)
      const y2 = (17443 - grundfreibetrag) / 10000; // = 0.5839
      const expectedTax2 = Math.floor((932.3 * y2 + 1400) * y2); // ≈ 1015
      expect(berechneEinkommenssteuer(17443, grundfreibetrag)).toBe(expectedTax2);
    });
    
    it('calculates tax correctly for the second progressive zone (17,444€ to 68,480€)', () => {
      const grundfreibetrag = 11604;
      
      // Test case: 30,000€ taxable income
      // Formula: (176.64 * z + 2397) * z + 1015.13, where z = (income - 17443) / 10000
      const z = (30000 - 17443) / 10000; // = 1.2557
      const expectedTax = Math.floor((176.64 * z + 2397) * z + 1015.13); // ≈ 4,881
      expect(berechneEinkommenssteuer(30000, grundfreibetrag)).toBe(expectedTax);
      
      // Test case: 68,480€ taxable income (upper limit of second zone)
      const z2 = (68480 - 17443) / 10000; // = 5.1037
      const expectedTax2 = Math.floor((176.64 * z2 + 2397) * z2 + 1015.13); // ≈ 17,671
      expect(berechneEinkommenssteuer(68480, grundfreibetrag)).toBe(expectedTax2);
    });
    
    it('calculates tax correctly for the third zone (68,481€ to 277,825€)', () => {
      const grundfreibetrag = 11604;
      
      // Test case: 100,000€ taxable income
      // Formula: 0.42 * income - 10911.92
      const expectedTax = Math.floor(0.42 * 100000 - 10911.92); // = 31,088
      expect(berechneEinkommenssteuer(100000, grundfreibetrag)).toBe(expectedTax);
      
      // Test case: 277,825€ taxable income (upper limit of third zone)
      const expectedTax2 = Math.floor(0.42 * 277825 - 10911.92); // = 105,775
      expect(berechneEinkommenssteuer(277825, grundfreibetrag)).toBe(expectedTax2);
    });
    
    it('calculates tax correctly for the highest zone (above 277,825€)', () => {
      const grundfreibetrag = 11604;
      
      // Test case: 300,000€ taxable income
      // Formula: 0.45 * income - 19246.67
      const expectedTax = Math.floor(0.45 * 300000 - 19246.67); // = 115,753
      expect(berechneEinkommenssteuer(300000, grundfreibetrag)).toBe(expectedTax);
      
      // Test case: 500,000€ taxable income
      const expectedTax2 = Math.floor(0.45 * 500000 - 19246.67); // = 205,753
      expect(berechneEinkommenssteuer(500000, grundfreibetrag)).toBe(expectedTax2);
    });
  });
  
  describe('berechneKinderfreibetrag', () => {
    it('calculates child tax allowance correctly', () => {
      // Test case: 1 child
      // Expected: 1 * (6672 + 2928) = 9,600€
      expect(berechneKinderfreibetrag(1)).toBe(9600);
      
      // Test case: 2 children
      // Expected: 2 * (6672 + 2928) = 19,200€
      expect(berechneKinderfreibetrag(2)).toBe(19200);
      
      // Test case: 3 children
      // Expected: 3 * (6672 + 2928) = 28,800€
      expect(berechneKinderfreibetrag(3)).toBe(28800);
      
      // Test case: 0 children
      // Expected: 0 * (6672 + 2928) = 0€
      expect(berechneKinderfreibetrag(0)).toBe(0);
    });
    
    // Note: This function has console.log statements that should be tested or removed
    // We're not testing the side effect (console.log) here, but it should be addressed
  });
});
