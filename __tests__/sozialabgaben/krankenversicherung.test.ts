import { berechneKrankenversicherungGesetzlich } from '../../src/utils/sozialabgaben/krankenversicherung';

describe('berechneKrankenversicherungGesetzlich', () => {
  it('calculates health insurance correctly when income is below the ceiling', () => {
    // Test case: 50,000€ annual income, 60,000€ ceiling, 14.6% rate
    // Expected: (50,000 * 0.146) / 2 = 3,650€
    expect(berechneKrankenversicherungGesetzlich(50000, 60000, 14.6)).toBeCloseTo(3650, 0);

    // Test case: 30,000€ annual income, 60,000€ ceiling, 14.6% rate
    // Expected: (30,000 * 0.146) / 2 = 2,190€
    expect(berechneKrankenversicherungGesetzlich(30000, 60000, 14.6)).toBeCloseTo(2190, 0);
  });

  it('calculates health insurance correctly when income is above the ceiling', () => {
    // Test case: 70,000€ annual income, 60,000€ ceiling, 14.6% rate
    // Expected: (60,000 * 0.146) / 2 = 4,380€
    expect(berechneKrankenversicherungGesetzlich(70000, 60000, 14.6)).toBeCloseTo(4380, 0);

    // Test case: 100,000€ annual income, 60,000€ ceiling, 14.6% rate
    // Expected: (60,000 * 0.146) / 2 = 4,380€
    expect(berechneKrankenversicherungGesetzlich(100000, 60000, 14.6)).toBeCloseTo(4380, 0);
  });

  it('calculates health insurance correctly with different rates', () => {
    // Test case: 50,000€ annual income, 60,000€ ceiling, 15.6% rate (including additional contribution)
    // Expected: (50,000 * 0.156) / 2 = 3,900€
    expect(berechneKrankenversicherungGesetzlich(50000, 60000, 15.6)).toBe(3900);

    // Test case: 50,000€ annual income, 60,000€ ceiling, 16.2% rate (including additional contribution)
    // Expected: (50,000 * 0.162) / 2 = 4,050€
    expect(berechneKrankenversicherungGesetzlich(50000, 60000, 16.2)).toBe(4050);
  });

  it('handles edge cases correctly', () => {
    // Test case: 0€ annual income
    expect(berechneKrankenversicherungGesetzlich(0, 60000, 14.6)).toBe(0);

    // Test case: 0% rate (should not happen in practice)
    expect(berechneKrankenversicherungGesetzlich(50000, 60000, 0)).toBe(0);

    // Test case: 0€ ceiling (should not happen in practice)
    expect(berechneKrankenversicherungGesetzlich(50000, 0, 14.6)).toBe(0);
  });
});
