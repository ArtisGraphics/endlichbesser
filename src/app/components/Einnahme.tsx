import { Badge, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { ReactElement } from "react";
import { Interval, intervalColorMap } from "@/types/interval";
import { CrossCircledIcon, CalendarIcon, ClockIcon, Pencil1Icon, CopyIcon } from "@radix-ui/react-icons";
import { convertToMonthlyAmount } from "@/utils/intervalCalculations";

const Einnahme = ({
  title,
  menge,
  interval,
  icon,
  onDelete,
  onEdit,
  onDuplicate,
  startDate,
  endDate,
  kuendigungsfrist,
}: {
  title: string;
  menge: number;
  interval: Interval;
  icon?: ReactElement;
  onDelete: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  startDate?: Date;
  endDate?: Date;
  kuendigungsfrist?: number;
}) => {
  const formatDate = (date: Date | string) => {
    // Ensure we have a valid Date object
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return "Ungültiges Datum";
    }
    
    return dateObj.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isEndingSoon = () => {
    if (!endDate) return false;
    
    // Ensure we have a valid Date object
    const endDateObj = endDate instanceof Date ? endDate : new Date(endDate);
    
    // Check if the date is valid
    if (isNaN(endDateObj.getTime())) {
      return false;
    }
    
    const now = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(now.getMonth() + 3);
    return endDateObj <= threeMonthsFromNow;
  };

  const getCancellationWarning = () => {
    if (!endDate || !kuendigungsfrist || kuendigungsfrist === 0) return null;
    
    // Ensure we have a valid Date object
    const endDateObj = endDate instanceof Date ? endDate : new Date(endDate);
    
    // Check if the date is valid
    if (isNaN(endDateObj.getTime())) {
      return null;
    }
    
    // Calculate cancellation deadline
    const cancellationDeadline = new Date(endDateObj);
    cancellationDeadline.setMonth(cancellationDeadline.getMonth() - kuendigungsfrist);
    
    const now = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(now.getMonth() + 1);
    
    // Show warning if cancellation deadline is within the next month
    if (cancellationDeadline <= oneMonthFromNow && cancellationDeadline >= now) {
      return {
        type: 'urgent' as const,
        message: `Kündigung muss bis ${cancellationDeadline.toLocaleDateString("de-DE")} eingehen!`
      };
    }
    
    // Show info if cancellation deadline is within the next 3 months
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(now.getMonth() + 3);
    
    if (cancellationDeadline <= threeMonthsFromNow && cancellationDeadline >= now) {
      return {
        type: 'info' as const,
        message: `Kündigung bis ${cancellationDeadline.toLocaleDateString("de-DE")} möglich`
      };
    }
    
    return null;
  };

  const handleDelete = () => {
    const itemType = menge > 0 ? "Einnahme" : "Ausgabe";
    if (confirm(`Möchten Sie die ${itemType} "${title}" wirklich löschen?`)) {
      onDelete();
    }
  };

  const handleDuplicate = () => {
    const itemType = menge > 0 ? "Einnahme" : "Ausgabe";
    if (confirm(`Möchten Sie die ${itemType} "${title}" duplizieren?`)) {
      onDuplicate();
    }
  };

  return (
    <div
      className={`flex-1 backdrop-blur-2xl drop-shadow-xs min-w-64 ${
        menge > 0 ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"
      } border p-4 rounded relative`}
    >
      {/* Warning indicator for ending soon */}
      {isEndingSoon() && (
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-orange-500 border border-white rounded-full flex items-center justify-center animate-pulse">
          <span className="text-white text-center text-xs font-bold">!</span>
        </div>
      )}
      
      <Flex direction="column" gap="3" height="100%" width="100%">
        {/* Header with title and action buttons */}
        <Flex justify="between" align="center" width="100%">
          <Flex gap="2" align="center">
            {icon ? icon : ""}
            <Heading size="4">{title}</Heading>
          </Flex>
          <Flex gap="1">
            <Button onClick={onEdit} variant="surface" color="blue" size="1" title="Bearbeiten">
              <Pencil1Icon />
            </Button>
            <Button onClick={handleDuplicate} variant="surface" color="green" size="1" title="Duplizieren">
              <CopyIcon />
            </Button>
            <Button onClick={handleDelete} variant="surface" color="red" size="1" title="Löschen">
              <CrossCircledIcon />
            </Button>
          </Flex>
        </Flex>

        {/* Amount and interval */}
        <Flex direction="column" gap="2" width="100%">
          <Flex justify="between" align="center" width="100%">
            <Text color={menge > 0 ? "green" : "red"} size="4" weight="bold">
              {menge.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </Text>
            <Badge color={intervalColorMap[interval]}>{interval}</Badge>
          </Flex>
          
          {/* Monthly average if not already monthly */}
          {interval !== "monatlich" && (
            <Flex justify="between" align="center" width="100%">
              <Text color={menge > 0 ? "green" : "red"} size="2" className="opacity-75">
                ≈ {convertToMonthlyAmount(menge, interval).toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })} / Monat
              </Text>
            </Flex>
          )}
        </Flex>

        {/* Date information */}
        {(startDate || endDate) && (
          <div className="space-y-1 pt-2 border-t border-gray-200 dark:border-gray-700">
            {startDate && (
              <Flex align="center" gap="1">
                <CalendarIcon className="w-3 h-3 text-gray-500" />
                <Text size="1" className="text-gray-600 dark:text-gray-400">
                  Startet: {formatDate(startDate)}
                </Text>
              </Flex>
            )}
            
            {endDate && (
              <Flex align="center" gap="1">
                <CalendarIcon className="w-3 h-3 text-gray-500" />
                <Text size="1" className="text-gray-600 dark:text-gray-400">
                  Endet: {formatDate(endDate)}
                </Text>
              </Flex>
            )}
            
            {kuendigungsfrist && kuendigungsfrist > 0 && (
              <Flex align="center" gap="1">
                <ClockIcon className="w-3 h-3 text-gray-500" />
                <Text size="1" className="text-gray-600 dark:text-gray-400">
                  Kündigungsfrist: {kuendigungsfrist} Monat{kuendigungsfrist !== 1 ? 'e' : ''}
                </Text>
              </Flex>
            )}
            
            {isEndingSoon() && (
              <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-xs p-2 rounded">
                ⚠️ Endet in den nächsten 3 Monaten
              </div>
            )}
            
            {(() => {
              const warning = getCancellationWarning();
              if (!warning) return null;
              
              return (
                <div className={`text-xs p-2 rounded ${
                  warning.type === 'urgent' 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' 
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                }`}>
                  {warning.type === 'urgent' ? '🚨' : 'ℹ️'} {warning.message}
                </div>
              );
            })()}
          </div>
        )}
      </Flex>
    </div>
  );
};

export default Einnahme;
