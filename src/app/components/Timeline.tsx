"use client";

import { Badge, Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Finanzbewegung } from "@/types/finanzbewegung";
import { Interval, intervalColorMap } from "@/types/interval";
import { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@radix-ui/react-icons";

interface TimelineEvent {
  title: string;
  amount: number;
  month: number;
  type: "income" | "expense";
  interval: Interval;
  isEnding?: boolean;
  isFirstPayment?: boolean; // New: indicates if this is the first payment for this item
  originalStartDate?: Date; // New: to track the original start date
}

interface TimelineProps {
  finanzbewegungen: Finanzbewegung[];
}

const Timeline = ({ finanzbewegungen }: TimelineProps) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const timelineEvents = useMemo(() => {
    const events: TimelineEvent[] = [];
    
    finanzbewegungen.forEach((bewegung) => {
      const type = bewegung.menge > 0 ? "income" : "expense";
      
      // Calculate the effective start date - handle both Date objects and strings
      let effectiveStartDate: Date;
      if (bewegung.startDate) {
        effectiveStartDate = bewegung.startDate instanceof Date 
          ? bewegung.startDate 
          : new Date(bewegung.startDate);
        // Check if date is valid
        if (isNaN(effectiveStartDate.getTime())) {
          effectiveStartDate = new Date(selectedYear, 0, 1); // Default to January 1st
        }
      } else {
        effectiveStartDate = new Date(selectedYear, 0, 1); // Default to January 1st of selected year
      }
      
      // Calculate the effective end date (payments continue until this date)
      let effectiveEndDate: Date | null = null;
      if (bewegung.endDate) {
        effectiveEndDate = bewegung.endDate instanceof Date 
          ? new Date(bewegung.endDate) 
          : new Date(bewegung.endDate);
        // Check if date is valid
        if (isNaN(effectiveEndDate.getTime())) {
          effectiveEndDate = null;
        }
        // Note: Kündigungsfrist does NOT affect when payments end, only when cancellation must be submitted
      }
      
      // Calculate cancellation deadline for warnings (when cancellation must be submitted)
      let cancellationDeadline: Date | null = null;
      if (effectiveEndDate && bewegung.kuendigungsfrist) {
        cancellationDeadline = new Date(effectiveEndDate);
        cancellationDeadline.setMonth(cancellationDeadline.getMonth() - bewegung.kuendigungsfrist);
      }
      
      const isActiveInMonth = (month: number) => {
        const monthDate = new Date(selectedYear, month - 1, 1);
        const monthEndDate = new Date(selectedYear, month, 0); // Last day of the month
        
        // Check if the movement is active during this month
        const startsBeforeOrDuringMonth = effectiveStartDate <= monthEndDate;
        const endsAfterOrDuringMonth = !effectiveEndDate || effectiveEndDate >= monthDate;
        
        return startsBeforeOrDuringMonth && endsAfterOrDuringMonth;
      };
      
      const isLastOccurrence = (month: number) => {
        if (!effectiveEndDate) return false;
        const monthDate = new Date(selectedYear, month - 1, 1);
        const nextMonthDate = new Date(selectedYear, month, 1);
        return monthDate <= effectiveEndDate && nextMonthDate > effectiveEndDate;
      };

      const isInCancellationPeriod = (month: number) => {
        if (!cancellationDeadline) return false;
        const monthDate = new Date(selectedYear, month - 1, 1);
        const now = new Date();
        // Show warning if we're past the cancellation deadline or within the current month
        return monthDate >= cancellationDeadline && monthDate >= now;
      };

      // Helper function to check if this is the first payment for this item
      const isFirstPaymentForItem = (month: number) => {
        const originalStart = bewegung.startDate ? 
          (bewegung.startDate instanceof Date ? bewegung.startDate : new Date(bewegung.startDate)) :
          new Date(selectedYear, 0, 1);
        
        // For monthly: first payment is in the start month
        if (bewegung.interval === "monatlich") {
          return month === (originalStart.getMonth() + 1) && originalStart.getFullYear() === selectedYear;
        }
        
        // For other intervals: check if this is the first scheduled payment
        const startMonth = originalStart.getMonth() + 1;
        const startYear = originalStart.getFullYear();
        
        switch (bewegung.interval) {
          case "vierteljährlich":
            const firstQuarterlyPayment = startMonth + 3;
            return (month === firstQuarterlyPayment && startYear === selectedYear) ||
                   (firstQuarterlyPayment > 12 && month === (firstQuarterlyPayment - 12) && startYear === selectedYear - 1);
          case "halbjährlich":
            const firstHalfYearlyPayment = startMonth + 6;
            return (month === firstHalfYearlyPayment && startYear === selectedYear) ||
                   (firstHalfYearlyPayment > 12 && month === (firstHalfYearlyPayment - 12) && startYear === selectedYear - 1);
          case "jährlich":
            return month === startMonth && startYear === selectedYear;
          default:
            return false;
        }
      };
      
      switch (bewegung.interval) {
        case "monatlich":
          // Add event for each month where it's active
          for (let month = 1; month <= 12; month++) {
            if (isActiveInMonth(month)) {
              events.push({
                title: bewegung.title,
                amount: bewegung.menge,
                month,
                type,
                interval: bewegung.interval,
                isEnding: isLastOccurrence(month),
                isFirstPayment: isFirstPaymentForItem(month),
                originalStartDate: effectiveStartDate,
              });
            }
          }
          break;
        case "vierteljährlich":
          // Calculate payment months based on start date (every 3 months)
          const startMonthQuarterly = effectiveStartDate.getMonth() + 1; // Convert to 1-based month
          const quarterlyPaymentMonths = [];
          
          if (effectiveStartDate.getFullYear() === selectedYear) {
            // If start is in selected year, calculate payments every 3 months from start
            for (let i = 3; i <= 15; i += 3) { // Extended to 15 to catch next year payments
              let paymentMonth = startMonthQuarterly + i;
              if (paymentMonth <= 12) {
                quarterlyPaymentMonths.push(paymentMonth);
              }
            }
          } else if (effectiveStartDate.getFullYear() < selectedYear) {
            // If start was in previous year, calculate based on pattern
            const monthsSinceStart = (selectedYear - effectiveStartDate.getFullYear()) * 12 + (1 - startMonthQuarterly);
            for (let month = 1; month <= 12; month++) {
              const totalMonthsSinceStart = monthsSinceStart + month;
              if ((totalMonthsSinceStart - 3) % 3 === 0 && totalMonthsSinceStart >= 3) {
                quarterlyPaymentMonths.push(month);
              }
            }
          }
          
          quarterlyPaymentMonths.forEach((month) => {
            if (isActiveInMonth(month)) {
              events.push({
                title: bewegung.title,
                amount: bewegung.menge,
                month,
                type,
                interval: bewegung.interval,
                isEnding: isLastOccurrence(month),
                isFirstPayment: isFirstPaymentForItem(month),
                originalStartDate: effectiveStartDate,
              });
            }
          });
          break;
        case "halbjährlich":
          // Calculate payment months based on start date (every 6 months)
          const startMonth = effectiveStartDate.getMonth() + 1; // Convert to 1-based month
          const paymentMonths = [];
          
          if (effectiveStartDate.getFullYear() === selectedYear) {
            // If start is in selected year, add payments accordingly
            let firstPaymentMonth = startMonth + 6;
            let secondPaymentMonth = startMonth + 12;
            
            if (firstPaymentMonth <= 12) paymentMonths.push(firstPaymentMonth);
            if (secondPaymentMonth <= 12 && secondPaymentMonth !== firstPaymentMonth) {
              paymentMonths.push(secondPaymentMonth);
            }
          } else if (effectiveStartDate.getFullYear() < selectedYear) {
            // Calculate based on pattern from start date
            const monthsSinceStart = (selectedYear - effectiveStartDate.getFullYear()) * 12 + (1 - startMonth);
            for (let month = 1; month <= 12; month++) {
              const totalMonthsSinceStart = monthsSinceStart + month;
              if ((totalMonthsSinceStart - 6) % 6 === 0 && totalMonthsSinceStart >= 6) {
                paymentMonths.push(month);
              }
            }
          }
          
          paymentMonths.forEach((month) => {
            if (isActiveInMonth(month)) {
              events.push({
                title: bewegung.title,
                amount: bewegung.menge,
                month,
                type,
                interval: bewegung.interval,
                isEnding: isLastOccurrence(month),
                isFirstPayment: isFirstPaymentForItem(month),
                originalStartDate: effectiveStartDate,
              });
            }
          });
          break;
        case "jährlich":
          // For yearly payments, show in the month when they actually occur
          let paymentMonth = 12; // Default to December
          
          if (effectiveStartDate.getFullYear() === selectedYear) {
            paymentMonth = effectiveStartDate.getMonth() + 1; // Convert to 1-based month
          } else if (effectiveStartDate.getFullYear() < selectedYear) {
            // Use the original start month for subsequent years
            paymentMonth = effectiveStartDate.getMonth() + 1;
          }
          
          if (isActiveInMonth(paymentMonth)) {
            events.push({
              title: bewegung.title,
              amount: bewegung.menge,
              month: paymentMonth,
              type,
              interval: bewegung.interval,
              isEnding: isLastOccurrence(paymentMonth),
              isFirstPayment: isFirstPaymentForItem(paymentMonth),
              originalStartDate: effectiveStartDate,
            });
          }
          break;
      }
    });
    
    return events;
  }, [finanzbewegungen, selectedYear]);

  const monthNames = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
  ];

  const getEventsForMonth = (month: number) => {
    return timelineEvents.filter(event => event.month === month);
  };

  const getMonthTotal = (month: number) => {
    const events = getEventsForMonth(month);
    return events.reduce((sum, event) => sum + event.amount, 0);
  };

  const getIncomeTotal = (month: number) => {
    const events = getEventsForMonth(month);
    return events.filter(e => e.type === "income").reduce((sum, event) => sum + event.amount, 0);
  };

  const getExpenseTotal = (month: number) => {
    const events = getEventsForMonth(month);
    return Math.abs(events.filter(e => e.type === "expense").reduce((sum, event) => sum + event.amount, 0));
  };

  const navigateYear = (direction: "prev" | "next") => {
    setSelectedYear(prev => direction === "prev" ? prev - 1 : prev + 1);
  };

  const resetToCurrentYear = () => {
    setSelectedYear(new Date().getFullYear());
  };

  // Calculate cumulative balance for each month
  const getAccountBalance = useMemo(() => {
    const balances: { [month: number]: number } = {};
    let cumulativeBalance = 0;
    
    for (let month = 1; month <= 12; month++) {
      const monthlyTotal = getMonthTotal(month);
      cumulativeBalance += monthlyTotal;
      balances[month] = cumulativeBalance;
    }
    
    return balances;
  }, [timelineEvents]);

  return (
    <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header with year navigation */}
      <Flex direction="column" gap="4" mb="6">
        <Flex align="center" justify="between">
          <Heading size="5">📅 Finanz-Zeitstrahl</Heading>
          <Flex align="center" gap="3">
            <Button 
              variant="soft" 
              size="2" 
              onClick={() => navigateYear("prev")}
              className="hover:bg-blue-100 dark:hover:bg-blue-900"
            >
              <ChevronLeftIcon />
            </Button>
            <Button 
              variant={selectedYear === new Date().getFullYear() ? "solid" : "soft"}
              size="2"
              onClick={resetToCurrentYear}
              className="min-w-20"
            >
              {selectedYear}
            </Button>
            <Button 
              variant="soft" 
              size="2" 
              onClick={() => navigateYear("next")}
              className="hover:bg-blue-100 dark:hover:bg-blue-900"
            >
              <ChevronRightIcon />
            </Button>
          </Flex>
        </Flex>
        
        {/* Year summary - only net balance */}
        <div className="flex justify-center">
          <div className="flex flex-col bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 min-w-64 text-center">
            <Text size="2" className="text-blue-600 dark:text-blue-400 font-medium">Netto-Saldo {selectedYear}</Text>
            <Text size="4" weight="bold" className="text-blue-700 dark:text-blue-300">
              {timelineEvents
                .reduce((sum, e) => sum + e.amount, 0)
                .toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
            </Text>
          </div>
        </div>
        

      </Flex>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 dark:from-blue-800 dark:via-purple-800 dark:to-green-800"></div>
        
        {/* Month markers */}
        <div className="grid grid-cols-12 gap-1">
          {monthNames.map((month, index) => {
            const monthNumber = index + 1;
            const events = getEventsForMonth(monthNumber);
            const incomeTotal = getIncomeTotal(monthNumber);
            const expenseTotal = getExpenseTotal(monthNumber);
            const netTotal = incomeTotal - expenseTotal;
            const hasEvents = events.length > 0;
            const hasEndingEvents = events.some(event => event.isEnding);
            const hasFirstPayments = events.some(event => event.isFirstPayment);
            
            const accountBalance = getAccountBalance[monthNumber];
            
            return (
              <div key={month} className="flex flex-col items-center min-w-0">
                {/* Cumulative account balance */}
                <div className={`text-xs font-bold text-center px-1 py-1 rounded mb-1 border ${
                  accountBalance > 0 
                    ? 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-600' 
                    : accountBalance < 0
                    ? 'bg-orange-50 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-600'
                    : 'bg-gray-50 text-gray-700 border-gray-300 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-600'
                }`} title={`Kontostand nach ${month}: ${accountBalance.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}`}>
                  💰 {accountBalance.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </div>
                
                {/* Month marker dot */}
                <div className="relative mb-2">
                  <div 
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                      hasEvents 
                        ? netTotal > 0 
                          ? 'bg-green-500 border-green-600 shadow-lg shadow-green-200' 
                          : netTotal < 0
                          ? 'bg-red-500 border-red-600 shadow-lg shadow-red-200'
                          : 'bg-gray-500 border-gray-600 shadow-lg shadow-gray-200'
                        : 'bg-gray-300 border-gray-400 dark:bg-gray-600 dark:border-gray-500'
                    }`}
                  >
                    {/* First payment indicator */}
                    {hasFirstPayments && (
                      <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 border border-white rounded-full flex items-center justify-center" 
                           title="Erste Zahlung">
                        <StarIcon className="w-2 h-2 text-white" />
                      </div>
                    )}
                    
                    {/* Warning indicator for ending events */}
                    {hasEndingEvents && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 border-2 border-white rounded-full animate-pulse" 
                           title="Einnahme/Ausgabe endet in diesem Monat" />
                    )}
                  </div>
                </div>
                
                {/* Month name */}
                <Text size="1" className="font-medium mb-2 text-center">
                  {month.slice(0, 3)}
                </Text>
                
                {/* Events for this month */}
                {hasEvents && (
                  <div className="space-y-2 w-full">
                    {/* Separate totals for income and expenses */}
                    {incomeTotal > 0 && (
                      <div className="text-xs font-bold text-center px-1 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                        +{incomeTotal.toLocaleString("de-DE", {
                          style: "currency",
                          currency: "EUR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </div>
                    )}
                    
                    {expenseTotal > 0 && (
                      <div className="text-xs font-bold text-center px-1 py-1 rounded bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                        -{expenseTotal.toLocaleString("de-DE", {
                          style: "currency",
                          currency: "EUR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </div>
                    )}
                    
                    {/* Monthly net total */}
                    <div className={`text-xs font-bold text-center px-1 py-1 rounded border ${
                      netTotal > 0 
                        ? 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-600' 
                        : netTotal < 0
                        ? 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-600'
                        : 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-600'
                    }`}>
                      Saldo: {netTotal > 0 ? '+' : ''}{netTotal.toLocaleString("de-DE", {
                        style: "currency",
                        currency: "EUR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </div>
                    
                    {/* Individual events with full text */}
                    <div className="space-y-1">
                      {events.map((event, eventIndex) => (
                        <div
                          key={`${event.title}-${eventIndex}`}
                          className="group relative"
                        >
                          <div
                            className={`text-xs p-2 rounded border-l-4 cursor-help transition-all hover:shadow-md ${
                              event.type === "income"
                                ? "bg-green-50 border-green-400 text-green-800 dark:bg-green-900/20 dark:text-green-300 dark:border-green-600"
                                : "bg-red-50 border-red-400 text-red-800 dark:bg-red-900/20 dark:text-red-300 dark:border-red-600"
                            } ${event.isEnding ? 'animate-pulse' : ''}`}
                            title={`${event.title}: ${event.amount.toLocaleString("de-DE", {
                              style: "currency",
                              currency: "EUR",
                            })} (${event.interval})${event.isEnding ? ' - ENDET' : ''}${event.isFirstPayment ? ' - ERSTE ZAHLUNG' : ''}`}
                          >
                            <div className="flex items-center gap-1">
                              {event.isFirstPayment && (
                                <StarIcon className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                              )}
                              {event.isEnding && (
                                <span className="text-orange-500 flex-shrink-0">⚠️</span>
                              )}
                              <span className="font-medium truncate">
                                {event.title}
                              </span>
                            </div>
                            <div className="text-xs opacity-75 mt-1">
                              {event.amount.toLocaleString("de-DE", {
                                style: "currency",
                                currency: "EUR",
                              })}
                            </div>
                            <Badge 
                              size="1" 
                              color={intervalColorMap[event.interval]}
                              className="mt-1"
                            >
                              {event.interval}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <Flex gap="4" justify="center" mt="6" wrap="wrap">
        <Flex align="center" gap="2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <Text size="2">Einnahmen</Text>
        </Flex>
        <Flex align="center" gap="2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <Text size="2">Ausgaben</Text>
        </Flex>
        <Flex align="center" gap="2">
          <div className="text-xs px-1 py-0.5 rounded border bg-blue-50 text-blue-700 border-blue-300">💰</div>
          <Text size="2">Kontostand</Text>
        </Flex>
        <Flex align="center" gap="2">
          <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
          <Text size="2">Endet bald</Text>
        </Flex>
        <Flex align="center" gap="2">
          <StarIcon className="w-3 h-3 text-yellow-500" />
          <Text size="2">Erste Zahlung</Text>
        </Flex>
        <Flex align="center" gap="2">
          <Badge color="blue" size="1">Monatlich</Badge>
          <Badge color="yellow" size="1">Vierteljährlich</Badge>
          <Badge color="purple" size="1">Halbjährlich</Badge>
          <Badge color="red" size="1">Jährlich</Badge>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Timeline; 