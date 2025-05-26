import { Badge, Box, Button, Card, Flex, Grid, Heading, Separator, Text } from "@radix-ui/themes";
import Einnahme from "@/app/components/Einnahme";
import { useSalary } from "@/contexts/GehaltProvider";
import { useEffect, useState, useMemo } from "react";
import { Interval } from "@/types/interval";
import { Finanzbewegung } from "@/types/finanzbewegung";
import FinanzbewegungDialog from "@/app/components/FinanzbewegungDialog";
import AusgabenDialog from "@/app/components/AusgabenDialog";
import EditFinanzbewegungDialog from "@/app/components/EditFinanzbewegungDialog";
import Timeline from "@/app/components/Timeline";
import { PlusIcon, ArrowUpIcon, ArrowDownIcon, CalendarIcon } from "@radix-ui/react-icons";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { convertToMonthlyAmount } from "@/utils/intervalCalculations";

interface UebersichtProps {
  profileFinanzbewegungen?: Finanzbewegung[];
  onFinanzbewegungChange?: (finanzbewegungen: Finanzbewegung[]) => void;
  onCurrentFinanzbewegungUpdate?: (finanzbewegungen: Finanzbewegung[]) => void;
}

export const Uebersicht = ({ profileFinanzbewegungen = [], onFinanzbewegungChange, onCurrentFinanzbewegungUpdate }: UebersichtProps) => {
  const { nettoEinkommen, minijobVerdienst, kindergeld } = useSalary();

  const [finanzbewegung, setFinanzbewegung] = useLocalStorage<
    { title: string; menge: number; interval: Interval; startDate?: Date; endDate?: Date; kuendigungsfrist?: number }[]
  >("finanzbewegungen", []);

  const [positiveFinanzbewegung, setPositiveFinanzbewegung] = useState<
    Finanzbewegung[]
  >([]);
  const [negativeFinanzbewegung, setNegativeFinanzbewegung] = useState<
    Finanzbewegung[]
  >([]);
  const [totalPositive, setTotalPositive] = useState(0);
  const [totalNegative, setTotalNegative] = useState(0);
  
  // Edit dialog state
  const [editingItem, setEditingItem] = useState<{ item: Finanzbewegung; index: number } | null>(null);

  // Convert localStorage data to proper Date objects
  const convertedFinanzbewegung = useMemo(() => 
    finanzbewegung.map(item => ({
      ...item,
      startDate: item.startDate ? (item.startDate instanceof Date ? item.startDate : new Date(item.startDate)) : undefined,
      endDate: item.endDate ? (item.endDate instanceof Date ? item.endDate : new Date(item.endDate)) : undefined,
    })), [finanzbewegung]
  );

  // Use profile financial movements if provided, otherwise use localStorage
  const currentFinanzbewegungen = profileFinanzbewegungen.length > 0 ? profileFinanzbewegungen : convertedFinanzbewegung;

  // Notify parent about current financial movements
  useEffect(() => {
    if (onCurrentFinanzbewegungUpdate) {
      onCurrentFinanzbewegungUpdate(currentFinanzbewegungen);
    }
  }, [currentFinanzbewegungen, onCurrentFinanzbewegungUpdate]);

  useEffect(() => {
    const positiveFinanzbewegung = currentFinanzbewegungen.filter((f: Finanzbewegung) => f.menge > 0);
    const negativeFinanzbewegung = currentFinanzbewegungen.filter((f: Finanzbewegung) => f.menge < 0);

    setPositiveFinanzbewegung(positiveFinanzbewegung);
    setNegativeFinanzbewegung(negativeFinanzbewegung);

    const totalPositive = positiveFinanzbewegung.reduce(
      (sum: number, f: Finanzbewegung) => sum + convertToMonthlyAmount(f.menge, f.interval),
      0,
    );
    const totalNegative = negativeFinanzbewegung.reduce(
      (sum: number, f: Finanzbewegung) => sum + convertToMonthlyAmount(f.menge, f.interval),
      0,
    );

    setTotalPositive(totalPositive);
    setTotalNegative(totalNegative);
  }, [currentFinanzbewegungen]);

  const addFinanzbewegung = (
    title: string,
    menge: number,
    interval: Interval,
    startDate?: Date,
    endDate?: Date,
    kuendigungsfrist?: number,
  ) => {
    const newMovement = { title, menge, interval, startDate, endDate, kuendigungsfrist };
    
    if (profileFinanzbewegungen.length > 0 && onFinanzbewegungChange) {
      // Update profile movements
      onFinanzbewegungChange([...profileFinanzbewegungen, newMovement]);
    } else {
      // Update localStorage movements
      setFinanzbewegung([...finanzbewegung, newMovement]);
    }
  };
  
  function deleteFinanzbewegung(index: number) {
    if (index < 0 || index >= currentFinanzbewegungen.length) return;
    
    if (profileFinanzbewegungen.length > 0 && onFinanzbewegungChange) {
      // Update profile movements
      const newFinanzbewegung = [...profileFinanzbewegungen];
      newFinanzbewegung.splice(index, 1);
      onFinanzbewegungChange(newFinanzbewegung);
    } else {
      // Update localStorage movements
      const newFinanzbewegung = [...finanzbewegung];
      newFinanzbewegung.splice(index, 1);
      setFinanzbewegung(newFinanzbewegung);
    }
  }

  function editFinanzbewegung(index: number) {
    const item = currentFinanzbewegungen[index];
    if (item) {
      setEditingItem({ item, index });
    }
  }

  function duplicateFinanzbewegung(index: number) {
    const itemToDuplicate = currentFinanzbewegungen[index];
    if (!itemToDuplicate) return;
    
    const duplicatedItem = {
      ...itemToDuplicate,
      title: `${itemToDuplicate.title} (Kopie)`,
    };
    
    if (profileFinanzbewegungen.length > 0 && onFinanzbewegungChange) {
      // Update profile movements
      onFinanzbewegungChange([...profileFinanzbewegungen, duplicatedItem]);
    } else {
      // Update localStorage movements
      setFinanzbewegung([...finanzbewegung, duplicatedItem]);
    }
  }

  function saveEditedFinanzbewegung(updatedItem: Finanzbewegung) {
    if (editingItem) {
      if (profileFinanzbewegungen.length > 0 && onFinanzbewegungChange) {
        // Update profile movements
        const newFinanzbewegung = [...profileFinanzbewegungen];
        newFinanzbewegung[editingItem.index] = updatedItem;
        onFinanzbewegungChange(newFinanzbewegung);
      } else {
        // Update localStorage movements
        const newFinanzbewegung = [...finanzbewegung];
        newFinanzbewegung[editingItem.index] = updatedItem;
        setFinanzbewegung(newFinanzbewegung);
      }
      setEditingItem(null);
    }
  }

  const netBalance = totalPositive + totalNegative;

  return (
    <div className="space-y-8 p-6 min-h-screen">

      {/* Timeline */}
      <Timeline finanzbewegungen={currentFinanzbewegungen} />

      {/* Income Section */}
      <Card className="p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
        <Flex direction="column" gap="2">
          <Flex align="center" justify="between">
            <Flex align="center" gap="2">
              <ArrowUpIcon className="w-6 h-6 text-green-600" />
              <Heading size="5" className="text-green-800 dark:text-green-200">
                💰 Einnahmen verwalten
              </Heading>
            </Flex>
            <FinanzbewegungDialog onAdd={addFinanzbewegung} />
          </Flex>
          
          {positiveFinanzbewegung.length > 0 ? (
            <Grid columns={{ initial: "1", sm: "2", lg: "3", xl: "4" }} gap="4">
              {positiveFinanzbewegung.map((einnahme, index) => {
                const originalIndex = currentFinanzbewegungen.findIndex((f: Finanzbewegung) => f === einnahme);
                if (originalIndex === -1) return null; // Skip if not found
                return (
                  <Einnahme
                    onDelete={() => deleteFinanzbewegung(originalIndex)}
                    onEdit={() => editFinanzbewegung(originalIndex)}
                    onDuplicate={() => duplicateFinanzbewegung(originalIndex)}
                    key={index}
                    menge={einnahme.menge}
                    title={einnahme.title}
                    interval={einnahme.interval}
                    startDate={einnahme.startDate}
                    endDate={einnahme.endDate}
                    kuendigungsfrist={einnahme.kuendigungsfrist}
                  />
                );
              })}
            </Grid>
          ) : (
            <Box className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Text>Noch keine Einnahmen hinzugefügt</Text>
            </Box>
          )}
        </Flex>
      </Card>

      {/* Expenses Section */}
      <Card className="p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
        <Flex direction="column" gap="2">
          <Flex align="center" justify="between">
            <Flex align="center" gap="2">
              <ArrowDownIcon className="w-6 h-6 text-red-600" />
              <Heading size="5" className="text-red-800 dark:text-red-200">
                💸 Ausgaben verwalten
              </Heading>
            </Flex>
            <AusgabenDialog onAdd={addFinanzbewegung} />
          </Flex>
          
          {negativeFinanzbewegung.length > 0 ? (
            <Grid columns={{ initial: "1", sm: "2", lg: "3", xl: "4" }} gap="4">
              {negativeFinanzbewegung.map((ausgabe, index) => {
                const originalIndex = currentFinanzbewegungen.findIndex((f: Finanzbewegung) => f === ausgabe);
                if (originalIndex === -1) return null; // Skip if not found
                return (
                  <Einnahme
                    onDelete={() => deleteFinanzbewegung(originalIndex)}
                    onEdit={() => editFinanzbewegung(originalIndex)}
                    onDuplicate={() => duplicateFinanzbewegung(originalIndex)}
                    key={index}
                    menge={ausgabe.menge}
                    title={ausgabe.title}
                    interval={ausgabe.interval}
                    startDate={ausgabe.startDate}
                    endDate={ausgabe.endDate}
                    kuendigungsfrist={ausgabe.kuendigungsfrist}
                  />
                );
              })}
            </Grid>
          ) : (
            <Box className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Text>Noch keine Ausgaben hinzugefügt</Text>
            </Box>
          )}
        </Flex>
      </Card>

      {/* Edit Dialog */}
      {editingItem && (
        <EditFinanzbewegungDialog
          finanzbewegung={editingItem.item}
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          onSave={saveEditedFinanzbewegung}
        />
      )}
    </div>
  );
};
