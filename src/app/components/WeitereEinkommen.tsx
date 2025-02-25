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
  } = useSalary();

  const minijobVerdienstGrenzeImJahr = 556 * 12;
  const kindergeldProKind = 255;

  useEffect(() => {
    if (minijobVerdienst * gehaelter > minijobVerdienstGrenzeImJahr) {
      setMinijobVerdienst(
        Math.round((minijobVerdienstGrenzeImJahr / gehaelter) * 100) / 100,
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
            max={minijobVerdienstGrenzeImJahr / gehaelter}
            onChange={(e) => setMinijobVerdienst(Number(e.target.value))}
          >
            <TextField.Slot side={"right"}>€</TextField.Slot>
          </TextField.Root>
        </Flex>
        <Text className={"absolute left-full translate-x-6"} color={"green"}>
          {(minijobVerdienst * gehaelter).toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </Text>
      </Flex>

      {kinder > 0 && (
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
    </Flex>
  );
};
