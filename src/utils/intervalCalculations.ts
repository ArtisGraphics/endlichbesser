import { Interval } from "@/types/interval";

/**
 * Konvertiert einen Betrag basierend auf dem Intervall zu einem monatlichen Betrag
 */
export function convertToMonthlyAmount(amount: number, interval: Interval): number {
  switch (interval) {
    case "monatlich":
      return amount;
    case "vierteljährlich":
      return amount / 3; // Alle 3 Monate
    case "halbjährlich":
      return amount / 6; // Alle 6 Monate
    case "jährlich":
      return amount / 12; // Alle 12 Monate
    default:
      return amount;
  }
}

/**
 * Bestimmt, in welchen Monaten eine Zahlung mit dem gegebenen Intervall stattfindet
 * Hinweis: Diese Funktion gibt Standard-Zahlungsmonate zurück. 
 * Für präzise Berechnungen basierend auf Startdatum verwenden Sie isPaymentInMonth.
 */
export function getPaymentMonths(interval: Interval): number[] {
  switch (interval) {
    case "monatlich":
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    case "vierteljährlich":
      return [3, 6, 9, 12]; // Standard-Quartalsende
    case "halbjährlich":
      return [6, 12]; // Standard-Halbjahresende
    case "jährlich":
      return [12]; // Standard-Jahresende
    default:
      return [];
  }
}

/**
 * Berechnet die tatsächlichen Zahlungsmonate basierend auf Startdatum und Intervall
 */
export function getActualPaymentMonths(
  interval: Interval,
  startDate?: Date,
  currentYear: number = new Date().getFullYear()
): number[] {
  if (!startDate) {
    return getPaymentMonths(interval);
  }

  const startMonth = startDate.getMonth() + 1; // Convert to 1-based month
  const paymentMonths: number[] = [];

  switch (interval) {
    case "monatlich":
      // Every month from start month
      for (let month = startMonth; month <= 12; month++) {
        paymentMonths.push(month);
      }
      break;
    case "vierteljährlich":
      // Every 3 months from start
      for (let i = 3; i <= 12; i += 3) {
        const paymentMonth = startMonth + i;
        if (paymentMonth <= 12) {
          paymentMonths.push(paymentMonth);
        }
      }
      break;
    case "halbjährlich":
      // Every 6 months from start
      const firstPayment = startMonth + 6;
      const secondPayment = startMonth + 12;
      
      if (firstPayment <= 12) paymentMonths.push(firstPayment);
      if (secondPayment <= 12 && secondPayment !== firstPayment) {
        paymentMonths.push(secondPayment);
      }
      break;
    case "jährlich":
      // 12 months from start, or in the start month if start is in current year
      if (startDate.getFullYear() === currentYear) {
        paymentMonths.push(startMonth);
      } else {
        const yearlyPayment = startMonth + 12;
        if (yearlyPayment <= 12) {
          paymentMonths.push(yearlyPayment);
        }
      }
      break;
  }

  return paymentMonths;
}

/**
 * Prüft, ob eine Zahlung in einem bestimmten Monat stattfindet,
 * basierend auf Startdatum und Intervall
 */
export function isPaymentInMonth(
  month: number,
  interval: Interval,
  startDate?: Date,
  currentYear: number = new Date().getFullYear()
): boolean {
  const actualPaymentMonths = getActualPaymentMonths(interval, startDate, currentYear);
  return actualPaymentMonths.includes(month);
} 