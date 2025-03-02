"use client";

import { Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import { useSalary } from "@/contexts/GehaltProvider";
import { useEffect } from "react";

export const WeitereEinkommen = () => {
  const {
    kinder,
    gehaelter,
    minijobVerdienst,
    setMinijobVerdienst,
    kindergeld,
    setKindergeld,
    kinderfreibetragAngewendet,
    sachbezug,
    setSachbezug,
  } = useSalary();

  const minijobVerdienstGrenzeImJahr = 556 * 12;
  const kindergeldProKind = 255;

  useEffect(() => {
    if (minijobVerdienst * 12 > minijobVerdienstGrenzeImJahr) {
      setMinijobVerdienst(
        Math.round((minijobVerdienstGrenzeImJahr / 12) * 100) / 100,
      );
    }
  }, [
    gehaelter,
    minijobVerdienst,
    minijobVerdienstGrenzeImJahr,
    setMinijobVerdienst,
  ]);

  useEffect(() => {
    setKindergeld(kinder * kindergeldProKind);
  }, [kinder, kindergeldProKind, setKindergeld]);

  return (
    <Flex position={"relative"} direction="column" gap="2" align={"start"}>
      <Heading>Weitere Einkünfte</Heading>
      <Flex
        position={"relative"}
        gap="2"
        align="center"
        justify="between"
        width={"100%"}
      >
        <Label htmlFor="minijobVerdienst">Minijob-Verdienst</Label>
        <Flex gap={"2"} align={"center"}>
          <TextField.Root
            type="number"
            id="minijobVerdienst"
            name="minijobVerdienst"
            placeholder="dein Minijob-Verdienst"
            value={minijobVerdienst ? minijobVerdienst : ""}
            max={minijobVerdienstGrenzeImJahr / 12}
            min={0}
            onChange={(e) => setMinijobVerdienst(Number(e.target.value))}
          >
            <TextField.Slot side={"right"}>€</TextField.Slot>
          </TextField.Root>
        </Flex>
        <Text className={"absolute left-full translate-x-6"} color={"green"}>
          {(minijobVerdienst * 12).toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </Text>
      </Flex>

      {kinder > 0 && !kinderfreibetragAngewendet && (
        <Flex
          position={"relative"}
          gap="2"
          align="center"
          justify="between"
          width={"100%"}
        >
          <Label htmlFor="kindergeld">Kindergeld</Label>
          <Flex gap={"2"} align={"center"}>
            <TextField.Root
              type="number"
              id="kindergeld"
              name="kindergeld"
              disabled={true}
              placeholder="Du hast kein Kindergeld"
              value={kindergeld}
              onChange={(e) => setKindergeld(Number(e.target.value))}
            >
              <TextField.Slot side={"right"}>€</TextField.Slot>
            </TextField.Root>
          </Flex>
          <Text className={"absolute left-full translate-x-6"} color={"green"}>
            {(kindergeld * 12).toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
          </Text>
        </Flex>
      )}
      <Flex
        position={"relative"}
        gap="2"
        align="center"
        justify="between"
        width={"100%"}
      >
        <Label htmlFor="sachbezug">Sachbezüge</Label>
        <Flex gap={"2"} align={"center"}>
          <TextField.Root
            type="number"
            id="sachbezug"
            name="sachbezug"
            placeholder="deine Sachbezüge"
            value={sachbezug ? sachbezug : ""}
            min={0}
            max={999}
            onChange={(e) => setSachbezug(Number(e.target.value))}
          >
            <TextField.Slot side={"right"}>€</TextField.Slot>
          </TextField.Root>
        </Flex>
        <Text className={"absolute left-full translate-x-6"} color={"green"}>
          {(sachbezug * 12).toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </Text>
      </Flex>
    </Flex>
  );
};
