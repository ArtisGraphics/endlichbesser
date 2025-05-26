"use client";

import { Badge, Button, Dialog, Select, TextField, Checkbox } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import { Interval, intervalColorMap } from "@/types/interval";
import { FormEvent, useState, useEffect } from "react";
import { Finanzbewegung } from "@/types/finanzbewegung";

interface EditFinanzbewegungDialogProps {
  finanzbewegung: Finanzbewegung;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedFinanzbewegung: Finanzbewegung) => void;
}

const EditFinanzbewegungDialog = ({ 
  finanzbewegung, 
  isOpen, 
  onClose, 
  onSave 
}: EditFinanzbewegungDialogProps) => {
  const [menge, setMenge] = useState(Math.abs(finanzbewegung.menge).toString());
  const [title, setTitle] = useState(finanzbewegung.title);
  const [interval, setInterval] = useState<Interval>(finanzbewegung.interval);
  const [hasStartDate, setHasStartDate] = useState(!!finanzbewegung.startDate);
  const [startDate, setStartDate] = useState(
    finanzbewegung.startDate ? finanzbewegung.startDate.toISOString().split('T')[0] : ""
  );
  const [hasEndDate, setHasEndDate] = useState(!!finanzbewegung.endDate);
  const [endDate, setEndDate] = useState(
    finanzbewegung.endDate ? finanzbewegung.endDate.toISOString().split('T')[0] : ""
  );
  const [kuendigungsfrist, setKuendigungsfrist] = useState(finanzbewegung.kuendigungsfrist || 0);

  const isExpense = finanzbewegung.menge < 0;

  // Reset form when finanzbewegung changes
  useEffect(() => {
    setMenge(Math.abs(finanzbewegung.menge).toString());
    setTitle(finanzbewegung.title);
    setInterval(finanzbewegung.interval);
    setHasStartDate(!!finanzbewegung.startDate);
    setStartDate(finanzbewegung.startDate ? finanzbewegung.startDate.toISOString().split('T')[0] : "");
    setHasEndDate(!!finanzbewegung.endDate);
    setEndDate(finanzbewegung.endDate ? finanzbewegung.endDate.toISOString().split('T')[0] : "");
    setKuendigungsfrist(finanzbewegung.kuendigungsfrist || 0);
  }, [finanzbewegung]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const parsedMenge = parseFloat(menge) || 0;
    const parsedStartDate = hasStartDate && startDate ? new Date(startDate) : undefined;
    const parsedEndDate = hasEndDate && endDate ? new Date(endDate) : undefined;
    const parsedKuendigungsfrist = hasEndDate && kuendigungsfrist > 0 ? kuendigungsfrist : undefined;
    
    const updatedFinanzbewegung: Finanzbewegung = {
      title,
      menge: isExpense ? -Math.abs(parsedMenge) : parsedMenge,
      interval,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      kuendigungsfrist: parsedKuendigungsfrist,
    };
    
    onSave(updatedFinanzbewegung);
    onClose();
  };

  const handleCancel = () => {
    // Reset form to original values
    setMenge(Math.abs(finanzbewegung.menge).toString());
    setTitle(finanzbewegung.title);
    setInterval(finanzbewegung.interval);
    setHasStartDate(!!finanzbewegung.startDate);
    setStartDate(finanzbewegung.startDate ? finanzbewegung.startDate.toISOString().split('T')[0] : "");
    setHasEndDate(!!finanzbewegung.endDate);
    setEndDate(finanzbewegung.endDate ? finanzbewegung.endDate.toISOString().split('T')[0] : "");
    setKuendigungsfrist(finanzbewegung.kuendigungsfrist || 0);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Content className="max-w-md">
        <Dialog.Title>
          {isExpense ? "Ausgabe bearbeiten" : "Einnahme bearbeiten"}
        </Dialog.Title>
        <Dialog.Description>
          Bearbeiten Sie die Details der {isExpense ? "Ausgabe" : "Einnahme"}.
        </Dialog.Description>
        <form className={"flex flex-col gap-4"} onSubmit={handleSubmit}>
            <Label>
              Titel:
              <TextField.Root
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isExpense ? "z.B. Miete, Strom, Versicherung" : "z.B. Gehalt, Nebenjob, Kindergeld"}
                required
              />
            </Label>
            
            <Label>
              Betrag:
              <TextField.Root
                type="number"
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
                 <span className="text-sm font-medium">
                   Startdatum festlegen
                 </span>
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
                       💡 <strong>Tipp:</strong> Ohne Startdatum beginnt die {isExpense ? "Ausgabe" : "Einnahme"} ab Januar des aktuellen Jahres.
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
                <span className="text-sm font-medium">
                  Enddatum festlegen
                </span>
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
                    Die {isExpense ? "Ausgabe" : "Einnahme"} läuft aber normal bis zum Enddatum weiter.
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="button" variant="soft" color="gray" onClick={handleCancel} className="flex-1">
                Abbrechen
              </Button>
              <Button type="submit" color={isExpense ? "red" : "green"} className="flex-1">
                Speichern
              </Button>
            </div>
          </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditFinanzbewegungDialog; 