import { berechneSolidaritaetszuschlag } from '../../src/utils/steuern/solidaritätszuschlag';

describe('berechneSolidaritaetszuschlag', () => {
  describe('for single taxpayers', () => {
    it('returns 0 when income tax is below or equal to the exemption limit', () => {
      // Test case: Income tax below exemption limit (19,950€)
      expect(berechneSolidaritaetszuschlag(19000, false)).toBe(0);
      
      // Test case: Income tax equal to exemption limit (19,950€)
      expect(berechneSolidaritaetszuschlag(19950, false)).toBe(0);
    });
    
    it('calculates solidarity surcharge correctly in the progressive zone', () => {
      // Test case: Income tax in the middle of the progressive zone
      // 30,000€ income tax is between 19,950€ and 62,649€
      const einkommensteuer = 30000;
      const freibetrag = 19950;
      const progressionszoneEnde = 62649;
      
      // Calculate the expected solidarity surcharge
      const einkommensteuerUeberFreibetrag = einkommensteuer - freibetrag;
      const progressionszoneBreite = progressionszoneEnde - freibetrag;
      const soliSatz = (einkommensteuerUeberFreibetrag / progressionszoneBreite) * 5.5;
      const expectedSoli = (einkommensteuer * soliSatz) / 100;
      
      expect(berechneSolidaritaetszuschlag(einkommensteuer, false)).toBeCloseTo(expectedSoli, 2);
      
      // Test case: Income tax at the upper limit of the progressive zone (62,649€)
      expect(berechneSolidaritaetszuschlag(62649, false)).toBeCloseTo((62649 * 5.5) / 100, 2);
    });
    
    it('calculates solidarity surcharge at full rate above the progressive zone', () => {
      // Test case: Income tax above the progressive zone
      // 70,000€ income tax is above 62,649€
      const einkommensteuer = 70000;
      const expectedSoli = (einkommensteuer * 5.5) / 100; // = 3,850€
      
      expect(berechneSolidaritaetszuschlag(einkommensteuer, false)).toBeCloseTo(expectedSoli, 2);
      
      // Test case: Very high income tax
      const highEinkommensteuer = 150000;
      const expectedHighSoli = (highEinkommensteuer * 5.5) / 100; // = 8,250€
      
      expect(berechneSolidaritaetszuschlag(highEinkommensteuer, false)).toBeCloseTo(expectedHighSoli, 2);
    });
  });
  
  describe('for married taxpayers', () => {
    it('returns 0 when income tax is below or equal to the exemption limit', () => {
      // Test case: Income tax below exemption limit (39,900€)
      expect(berechneSolidaritaetszuschlag(39000, true)).toBe(0);
      
      // Test case: Income tax equal to exemption limit (39,900€)
      expect(berechneSolidaritaetszuschlag(39900, true)).toBe(0);
    });
    
    it('calculates solidarity surcharge correctly in the progressive zone', () => {
      // Test case: Income tax in the middle of the progressive zone
      // 80,000€ income tax is between 39,900€ and 125,298€
      const einkommensteuer = 80000;
      const freibetrag = 39900;
      const progressionszoneEnde = 125298;
      
      // Calculate the expected solidarity surcharge
      const einkommensteuerUeberFreibetrag = einkommensteuer - freibetrag;
      const progressionszoneBreite = progressionszoneEnde - freibetrag;
      const soliSatz = (einkommensteuerUeberFreibetrag / progressionszoneBreite) * 5.5;
      const expectedSoli = (einkommensteuer * soliSatz) / 100;
      
      expect(berechneSolidaritaetszuschlag(einkommensteuer, true)).toBeCloseTo(expectedSoli, 2);
      
      // Test case: Income tax at the upper limit of the progressive zone (125,298€)
      expect(berechneSolidaritaetszuschlag(125298, true)).toBeCloseTo((125298 * 5.5) / 100, 2);
    });
    
    it('calculates solidarity surcharge at full rate above the progressive zone', () => {
      // Test case: Income tax above the progressive zone
      // 130,000€ income tax is above 125,298€
      const einkommensteuer = 130000;
      const expectedSoli = (einkommensteuer * 5.5) / 100; // = 7,150€
      
      expect(berechneSolidaritaetszuschlag(einkommensteuer, true)).toBeCloseTo(expectedSoli, 2);
      
      // Test case: Very high income tax
      const highEinkommensteuer = 250000;
      const expectedHighSoli = (highEinkommensteuer * 5.5) / 100; // = 13,750€
      
      expect(berechneSolidaritaetszuschlag(highEinkommensteuer, true)).toBeCloseTo(expectedHighSoli, 2);
    });
  });
  
  describe('edge cases', () => {
    it('handles 0 income tax correctly', () => {
      expect(berechneSolidaritaetszuschlag(0, false)).toBe(0);
      expect(berechneSolidaritaetszuschlag(0, true)).toBe(0);
    });
    
    it('handles negative income tax correctly (should not happen in practice)', () => {
      expect(berechneSolidaritaetszuschlag(-1000, false)).toBe(0);
      expect(berechneSolidaritaetszuschlag(-1000, true)).toBe(0);
    });
  });
});
