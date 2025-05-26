import { berechneArbeitslosenversicherung } from '../../src/utils/sozialabgaben/arbeitslosenversicherung';

describe('berechneArbeitslosenversicherung', () => {
  it('calculates unemployment insurance correctly when income is below the ceiling', () => {
    // Test case: 50,000€ annual income, 90,000€ ceiling, 2.6% rate
    // Expected: (50,000 * 0.026) / 2 = 650€
    expect(berechneArbeitslosenversicherung(50000, 90000, 2.6)).toBe(650);
    
    // Test case: 30,000€ annual income, 90,000€ ceiling, 2.6% rate
    // Expected: (30,000 * 0.026) / 2 = 390€
    expect(berechneArbeitslosenversicherung(30000, 90000, 2.6)).toBe(390);
  });
  
  it('calculates unemployment insurance correctly when income is above the ceiling', () => {
    // Test case: 100,000€ annual income, 90,000€ ceiling, 2.6% rate
    // Expected: (90,000 * 0.026) / 2 = 1,170€
    expect(berechneArbeitslosenversicherung(100000, 90000, 2.6)).toBe(1170);
    
    // Test case: 120,000€ annual income, 90,000€ ceiling, 2.6% rate
    // Expected: (90,000 * 0.026) / 2 = 1,170€
    expect(berechneArbeitslosenversicherung(120000, 90000, 2.6)).toBe(1170);
  });
  
  it('calculates unemployment insurance correctly with different rates', () => {
    // Test case: 50,000€ annual income, 90,000€ ceiling, 3.0% rate
    // Expected: (50,000 * 0.03) / 2 = 750€
    expect(berechneArbeitslosenversicherung(50000, 90000, 3.0)).toBe(750);
    
    // Test case: 50,000€ annual income, 90,000€ ceiling, 2.5% rate
    // Expected: (50,000 * 0.025) / 2 = 625€
    expect(berechneArbeitslosenversicherung(50000, 90000, 2.5)).toBe(625);
  });
  
  it('handles edge cases correctly', () => {
    // Test case: 0€ annual income
    expect(berechneArbeitslosenversicherung(0, 90000, 2.6)).toBe(0);
    
    // Test case: 0% rate
    expect(berechneArbeitslosenversicherung(50000, 90000, 0)).toBe(0);
    
    // Test case: 0€ ceiling (should not happen in practice)
    expect(berechneArbeitslosenversicherung(50000, 0, 2.6)).toBe(0);
  });
});
