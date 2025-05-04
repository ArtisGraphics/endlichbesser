"use client";

import { Badge, Button, Dialog, Select, TextField } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import { Interval, intervalColorMap } from "@/types/interval";
import { FormEvent, useState } from "react";

interface FinanzbewegungDialogProps {
  onAdd: (title: string, menge: number, interval: Interval) => void;
}

const FinanzbewegungDialog = ({ onAdd }: FinanzbewegungDialogProps) => {
  const [menge, setMenge] = useState(0);
  const [title, setTitle] = useState("");
  const [interval, setInterval] = useState<Interval>("monatlich");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(title, menge, interval);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Hinzufügen</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Einnahme hinzufügen</Dialog.Title>
        <Dialog.Description>
          <form className={"flex flex-col gap-2"} onSubmit={handleSubmit}>
            <Label>
              Titel:
              <TextField.Root
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Bezeichnung eingeben"
              />
            </Label>
            <Label>
              Menge:
              <TextField.Root
                type="number"
                id="menge"
                name="menge"
                value={menge}
                onChange={(e) => setMenge(parseFloat(e.target.value))}
                step="0.01"
                placeholder="Menge eingeben"
              />
            </Label>
            <Label>Interval:</Label>

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
            <Dialog.Close>
              <Button type="submit">Einnahme hinzufügen</Button>
            </Dialog.Close>
          </form>
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default FinanzbewegungDialog;
