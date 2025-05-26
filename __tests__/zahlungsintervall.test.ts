import { getZahlungsintervall } from '../src/utils/zahlungsintervall';
import { Abrechnungszeitraum } from '@/types/abrechnungszeitraum';

describe('getZahlungsintervall', () => {
  it('returns formatted string for monthly payments with different payment counts', () => {
    // Test case 1: Monthly payment, 12 payments per year
    expect(getZahlungsintervall('Monat', 12)).toBe('Monat');
    
    // Test case 2: Monthly payment, 13 payments per year
    expect(getZahlungsintervall('Monat', 13)).toBe('Gehalt (13x im Jahr)');
    
    // Test case 3: Monthly payment, 14 payments per year
    expect(getZahlungsintervall('Monat', 14)).toBe('Gehalt (14x im Jahr)');
  });
  
  it('returns the abrechnungszeitraum unchanged for non-monthly periods', () => {
    // Test case 1: Yearly payment
    expect(getZahlungsintervall('Jahr', 1)).toBe('Jahr');
    
    // Test case 2: Weekly payment
    expect(getZahlungsintervall('Woche', 52)).toBe('Woche');
    
    // Test case 3: Daily payment
    expect(getZahlungsintervall('Tag', 365)).toBe('Tag');
  });
});
