import { berechneUrlaubsstunden } from '../src/utils/urlaub';

describe('berechneUrlaubsstunden', () => {
  it('calculates vacation hours correctly for full-time employees', () => {
    // Test case 1: 20 vacation days, 40 hours per week
    expect(berechneUrlaubsstunden(20, 40)).toBe(160);
    
    // Test case 2: 30 vacation days, 40 hours per week
    expect(berechneUrlaubsstunden(30, 40)).toBe(240);
    
    // Test case 3: 25 vacation days, 40 hours per week
    expect(berechneUrlaubsstunden(25, 40)).toBe(200);
  });
  
  it('calculates vacation hours correctly for part-time employees', () => {
    // Test case 1: 20 vacation days, 20 hours per week
    expect(berechneUrlaubsstunden(20, 20)).toBe(80);
    
    // Test case 2: 30 vacation days, 30 hours per week
    expect(berechneUrlaubsstunden(30, 30)).toBe(180);
    
    // Test case 3: 25 vacation days, 25 hours per week
    expect(berechneUrlaubsstunden(25, 25)).toBe(125);
  });
  
  it('handles edge cases correctly', () => {
    // Test case 1: 0 vacation days
    expect(berechneUrlaubsstunden(0, 40)).toBe(0);
    
    // Test case 2: 0 hours per week
    expect(berechneUrlaubsstunden(20, 0)).toBe(0);
    
    // Test case 3: Decimal values
    expect(berechneUrlaubsstunden(20.5, 39.5)).toBe(162.35);
  });
});
