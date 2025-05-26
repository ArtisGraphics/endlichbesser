import { isMissingInput } from '../src/utils/input-validation';

describe('isMissingInput', () => {
  it('returns true for falsy values', () => {
    // Test case 1: undefined
    expect(isMissingInput(undefined)).toBe(true);
    
    // Test case 2: null
    expect(isMissingInput(null)).toBe(true);
    
    // Test case 3: empty string
    expect(isMissingInput('')).toBe(true);
    
    // Test case 4: 0
    expect(isMissingInput(0)).toBe(true);
    
    // Test case 5: false
    expect(isMissingInput(false)).toBe(true);
    
    // Test case 6: NaN
    expect(isMissingInput(NaN)).toBe(true);
  });
  
  it('returns false for truthy values', () => {
    // Test case 1: non-empty string
    expect(isMissingInput('test')).toBe(false);
    
    // Test case 2: number > 0
    expect(isMissingInput(42)).toBe(false);
    
    // Test case 3: true
    expect(isMissingInput(true)).toBe(false);
    
    // Test case 4: object
    expect(isMissingInput({})).toBe(false);
    
    // Test case 5: array
    expect(isMissingInput([])).toBe(false);
  });
});
