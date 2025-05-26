import { getArbeitstageImJahr } from '../src/utils/arbeitstageImJahr';
import { Bundesland } from '@/types/bundesland';

describe('getArbeitstageImJahr', () => {
  it('returns correct working days for 2025', () => {
    // Test for Baden-Württemberg
    expect(getArbeitstageImJahr('Baden-Württemberg', 2025)).toBe(250);
    
    // Test for Bayern
    expect(getArbeitstageImJahr('Bayern', 2025)).toBe(250);
    
    // Test for Berlin
    expect(getArbeitstageImJahr('Berlin', 2025)).toBe(251);
    
    // Test for Sachsen
    expect(getArbeitstageImJahr('Sachsen', 2025)).toBe(250);
    
    // Test for Thüringen
    expect(getArbeitstageImJahr('Thüringen', 2025)).toBe(251);
  });
  
  it('returns 0 for years other than 2025', () => {
    expect(getArbeitstageImJahr('Berlin', 2024)).toBe(0);
    expect(getArbeitstageImJahr('Bayern', 2026)).toBe(0);
  });
  
  it('returns 0 for invalid Bundesland', () => {
    // @ts-ignore - Testing with invalid input
    expect(getArbeitstageImJahr('InvalidBundesland', 2025)).toBe(0);
  });
});
