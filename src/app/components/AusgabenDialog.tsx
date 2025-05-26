"use client";

import { Badge, Button, Dialog, Select, TextField, Checkbox } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import { Interval, intervalColorMap } from "@/types/interval";
import { FormEvent, useState } from "react";

interface AusgabenDialogProps {
  onAdd: (title: string, menge: number, interval: Interval, startDate?: Date, endDate?: Date, kuendigungsfrist?: number) => void;
}

const AusgabenDialog = ({ onAdd }: AusgabenDialogProps) => {
  const [menge, setMenge] = useState("");
  const [title, setTitle] = useState("");
  const [interval, setInterval] = useState<Interval>("monatlich");
  const [hasStartDate, setHasStartDate] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [hasEndDate, setHasEndDate] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [kuendigungsfrist, setKuendigungsfrist] = useState(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const parsedMenge = parseFloat(menge) || 0;
    const parsedStartDate = hasStartDate && startDate ? new Date(startDate) : undefined;
    const parsedEndDate = hasEndDate && endDate ? new Date(endDate) : undefined;
    const parsedKuendigungsfrist = hasEndDate && kuendigungsfrist > 0 ? kuendigungsfrist : undefined;
    
    // Make amount negative for expenses
    onAdd(title, -Math.abs(parsedMenge), interval, parsedStartDate, parsedEndDate, parsedKuendigungsfrist);
    
    // Reset form
    setTitle("");
    setMenge("");
    setInterval("monatlich");
    setHasStartDate(false);
    setStartDate("");
    setHasEndDate(false);
    setEndDate("");
    setKuendigungsfrist(0);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color="red" variant="soft">
          Ausgabe hinzufügen
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="max-w-md">
        <Dialog.Title>Ausgabe hinzufügen</Dialog.Title>
        <Dialog.Description>
          Fügen Sie eine neue Ausgabe zu Ihrem Budget hinzu.
        </Dialog.Description>
        <form className={"flex flex-col gap-4"} onSubmit={handleSubmit}>
            <Label>
              Titel:
              <TextField.Root
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="z.B. Miete, Strom, Versicherung"
                required
              />
            </Label>
            
            <Label>
              Betrag:
              <TextField.Root
                type="number"
                id="menge"
                name="menge"
                value={menge}
                onChange={(e) => setMenge(e.target.value)}
                step="0.01"
                min="0"
                placeholder="Betrag eingeben"
                required
              />
            </Label>
            
            <Label>Zahlungsintervall:</Label>
            <Select.Root
              value={interval}
              onValueChange={(value) => setInterval(value as Interval)}
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="monatlich">
                  <Badge color={intervalColorMap["monatlich"]}>Monatlich</Badge>
                </Select.Item>
                <Select.Item value="vierteljährlich">
                  <Badge color={intervalColorMap["vierteljährlich"]}>
                    Vierteljährlich
                  </Badge>
                </Select.Item>
                <Select.Item value="halbjährlich">
                  <Badge color={intervalColorMap["halbjährlich"]}>
                    Halbjährlich
                  </Badge>
                </Select.Item>
                <Select.Item value="jährlich">
                  <Badge color={intervalColorMap["jährlich"]}>Jährlich</Badge>
                </Select.Item>
              </Select.Content>
            </Select.Root>

            {/* Start Date Section */}
            <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Label className="flex items-center gap-2">
                <Checkbox
                  checked={hasStartDate}
                  onCheckedChange={(checked) => setHasStartDate(checked === true)}
                />
                <span className="text-sm font-medium">Startdatum festlegen</span>
              </Label>
              
              {hasStartDate && (
                <div className="space-y-3 ml-6">
                  <Label>
                    Startdatum:
                    <TextField.Root
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required={hasStartDate}
                    />
                  </Label>
                  
                  <div className="text-xs text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                    💡 <strong>Tipp:</strong> Ohne Startdatum beginnt die Ausgabe ab Januar des aktuellen Jahres.
                  </div>
                </div>
              )}
            </div>

            {/* End Date Section */}
            <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Label className="flex items-center gap-2">
                <Checkbox
                  checked={hasEndDate}
                  onCheckedChange={(checked) => setHasEndDate(checked === true)}
                />
                <span className="text-sm font-medium">Enddatum festlegen</span>
              </Label>
              
              {hasEndDate && (
                <div className="space-y-3 ml-6">
                  <Label>
                    Enddatum:
                    <TextField.Root
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required={hasEndDate}
                    />
                  </Label>
                  
                  <Label>
                    Kündigungsfrist (Monate):
                    <TextField.Root
                      type="number"
                      value={kuendigungsfrist}
                      onChange={(e) => setKuendigungsfrist(parseInt(e.target.value) || 0)}
                      min="0"
                      max="12"
                      placeholder="z.B. 3 für 3 Monate"
                    />
                  </Label>
                  
                  <div className="text-xs text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                    💡 <strong>Tipp:</strong> Bei einem Vertragsende im Dezember und einer Kündigungsfrist von 3 Monaten muss die Kündigung spätestens bis Ende September eingehen. 
                    Die Ausgabe läuft aber normal bis zum Enddatum weiter.
                  </div>
                </div>
              )}
            </div>

            <Dialog.Close>
              <Button type="submit" color="red">
                Ausgabe hinzufügen
              </Button>
            </Dialog.Close>
          </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AusgabenDialog; 