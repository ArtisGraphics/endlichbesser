import { berechneRentenversicherung } from '../../src/utils/sozialabgaben/rentenversicherung';

describe('berechneRentenversicherung', () => {
  it('calculates pension insurance correctly when income is below the ceiling', () => {
    // Test case: 50,000€ annual income, 90,000€ ceiling, 18.6% rate
    // Expected: (50,000 * 0.186) / 2 = 4,650€
    expect(berechneRentenversicherung(50000, 90000, 18.6)).toBe(4650);
    
    // Test case: 30,000€ annual income, 90,000€ ceiling, 18.6% rate
    // Expected: (30,000 * 0.186) / 2 = 2,790€
    expect(berechneRentenversicherung(30000, 90000, 18.6)).toBe(2790);
  });
  
  it('calculates pension insurance correctly when income is above the ceiling', () => {
    // Test case: 100,000€ annual income, 90,000€ ceiling, 18.6% rate
    // Expected: (90,000 * 0.186) / 2 = 8,370€
    expect(berechneRentenversicherung(100000, 90000, 18.6)).toBeCloseTo(8370, 0);
    
    // Test case: 120,000€ annual income, 90,000€ ceiling, 18.6% rate
    // Expected: (90,000 * 0.186) / 2 = 8,370€
    expect(berechneRentenversicherung(120000, 90000, 18.6)).toBe(8370);
  });
  
  it('calculates pension insurance correctly with different rates', () => {
    // Test case: 50,000€ annual income, 90,000€ ceiling, 19.0% rate
    // Expected: (50,000 * 0.19) / 2 = 4,750€
    expect(berechneRentenversicherung(50000, 90000, 19.0)).toBe(4750);
    
    // Test case: 50,000€ annual income, 90,000€ ceiling, 18.0% rate
    // Expected: (50,000 * 0.18) / 2 = 4,500€
    expect(berechneRentenversicherung(50000, 90000, 18.0)).toBe(4500);
  });
  
  it('handles edge cases correctly', () => {
    // Test case: 0€ annual income
    expect(berechneRentenversicherung(0, 90000, 18.6)).toBe(0);
    
    // Test case: 0% rate
    expect(berechneRentenversicherung(50000, 90000, 0)).toBe(0);
    
    // Test case: 0€ ceiling (should not happen in practice)
    expect(berechneRentenversicherung(50000, 0, 18.6)).toBe(0);
  });
});
