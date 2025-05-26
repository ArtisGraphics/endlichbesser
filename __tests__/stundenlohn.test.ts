import { berechneStundenlohn } from '../src/utils/stundenlohn';

describe('berechneStundenlohn', () => {
  it('calculates hourly wage correctly', () => {
    // Test case 1: 160 hours per month, 3200€ salary
    expect(berechneStundenlohn(160, 3200)).toBe(20);
    
    // Test case 2: 40 hours per week (173.33 hours per month), 4000€ salary
    expect(berechneStundenlohn(173.33, 4000)).toBe(23.08);
    
    // Test case 3: Part-time 80 hours per month, 1600€ salary
    expect(berechneStundenlohn(80, 1600)).toBe(20);
  });
});
