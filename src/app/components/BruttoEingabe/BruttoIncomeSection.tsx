"use client";

import {
  Flex,
  SegmentedControl,
  Select,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import { RefObject } from "react";
import { useSalary } from "@/contexts/GehaltProvider";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface BruttoIncomeSectionProps {
  bruttoInputRef: RefObject<HTMLInputElement | null>;
}

export const BruttoIncomeSection = ({ bruttoInputRef }: BruttoIncomeSectionProps) => {
  const {
    brutto,
    setBrutto,
    bruttoImJahr,
    abrechnungszeitraum,
    setAbrechnungszeitraum,
    gehaelter,
    setGehaelter,
    wochenstunden,
    setWochenstunden,
    urlaubstage,
    setUrlaubstage,
  } = useSalary();

  const [wochenstundenZeitraum, setWochenstundenZeitraum] = useState<string>("Woche");

  return (
    <>
      <Text weight={"bold"}>Bruttoeinkommen</Text>
      <Text className={"absolute left-full translate-x-6 text-nowrap"}>
        pro Jahr:
      </Text>
      <Text className={"absolute left-full translate-x-48 text-nowrap"}>
        pro Gehalt:
      </Text>
      
      <Flex
        wrap={"wrap"}
        position={"relative"}
        gap="2"
        align="center"
        justify="between"
        width={"100%"}
      >
        <Flex gap={"2"} align={"center"} direction={"row"} justify={"center"}>
          {!brutto && (
            <Label className={"text-xs text-red-400"}>
              <Tooltip content={"Bruttogehalt fehlt"}>
                <ExclamationTriangleIcon />
              </Tooltip>
            </Label>
          )}
          <Label htmlFor="brutto">Dein Bruttogehalt</Label>
        </Flex>
        <Flex gap={"2"} align={"center"}>
          <TextField.Root
            ref={bruttoInputRef}
            type="number"
            id="brutto"
            name="brutto"
            placeholder="Bruttogehalt eingeben"
            min={0}
            max={99999999}
            value={brutto ? brutto : ""}
            color={brutto ? "green" : "red"}
            variant={brutto ? "surface" : "soft"}
            onChange={(e) => setBrutto(Number(e.target.value))}
          >
            <TextField.Slot side={"right"}>€</TextField.Slot>
          </TextField.Root>
          <Select.Root
            value={abrechnungszeitraum}
            onValueChange={setAbrechnungszeitraum}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="Jahr">jährlich</Select.Item>
              <Select.Item value="Monat">monatlich</Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>
        <Text className={"absolute left-full translate-x-6"} color={"green"}>
          {bruttoImJahr.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </Text>
        <Text className={"absolute left-full translate-x-48"} color={"green"}>
          {(bruttoImJahr / gehaelter).toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </Text>
      </Flex>

      <Flex
        wrap={"wrap"}
        position={"relative"}
        gap="2"
        align="center"
        justify="between"
        width={"100%"}
      >
        <Label htmlFor="brutto">Monatsgehälter</Label>
        <SegmentedControl.Root
          value={gehaelter.toLocaleString()}
          onValueChange={(e) => setGehaelter(parseInt(e))}
        >
          <SegmentedControl.Item value="12">12</SegmentedControl.Item>
          <SegmentedControl.Item value="13">13</SegmentedControl.Item>
          <SegmentedControl.Item value="14">14</SegmentedControl.Item>
        </SegmentedControl.Root>
      </Flex>

      <Flex
        wrap={"wrap"}
        position={"relative"}
        gap="2"
        align="center"
        justify="between"
        width={"100%"}
      >
        <Flex gap={"2"} align={"center"} direction={"row"} justify={"center"}>
          {!wochenstunden && (
            <Label className={"text-xs text-red-400"}>
              <Tooltip content={"Wochenstunden fehlen"}>
                <ExclamationTriangleIcon />
              </Tooltip>
            </Label>
          )}
          {wochenstunden > 48 && (
            <Label className={"text-xs text-yellow-400"}>
              <Tooltip
                content={
                  "Die gesetzliche Höchstgrenze liegt bei durchschnittlich 48 Wochenstunden. (Arbeitszeitgesetz §7 Artikel 8)."
                }
              >
                <ExclamationTriangleIcon />
              </Tooltip>
            </Label>
          )}
          <Label htmlFor="wochenstunden">Arbeitszeit</Label>
        </Flex>
        <Flex gap={"2"} align={"center"}>
          <TextField.Root
            type="number"
            id="wochenstunden"
            name="wochenstunden"
            max={240}
            min={0}
            color={!wochenstunden ? "ruby" : "green"}
            variant={!wochenstunden ? "soft" : "surface"}
            value={
              wochenstunden
                ? wochenstundenZeitraum === "Monat"
                  ? wochenstunden * 4
                  : wochenstunden
                : ""
            }
            onChange={(e) => {
              return wochenstundenZeitraum === "Monat"
                ? setWochenstunden(Number(e.target.value) / 4)
                : setWochenstunden(Number(e.target.value));
            }}
          >
            <TextField.Slot side={"right"}>h</TextField.Slot>
          </TextField.Root>
          <Select.Root
            value={wochenstundenZeitraum}
            onValueChange={setWochenstundenZeitraum}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="Woche">pro Woche</Select.Item>
              <Select.Item value="Monat">pro Monat</Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>
      </Flex>

      <Flex
        wrap={"wrap"}
        position={"relative"}
        gap="2"
        align="center"
        justify="between"
        width={"100%"}
      >
        <Flex gap={"2"} align={"center"} direction={"row"} justify={"center"}>
          {!urlaubstage && (
            <Label className={"text-xs text-red-400"}>
              <Tooltip content={"Urlaubstage fehlen"}>
                <ExclamationTriangleIcon />
              </Tooltip>
            </Label>
          )}
          {urlaubstage < 20 && (
            <Label className={"text-xs text-yellow-400"}>
              <Tooltip
                content={
                  "Die gesetzliche Mindestgrenze liegt bei einer 5-Tage-Woche bei 20 Urlaubstagen. (Bundesurlaubsgesetz §3, Artikel 1)"
                }
              >
                <ExclamationTriangleIcon />
              </Tooltip>
            </Label>
          )}
          <Label htmlFor="urlaubstage">Urlaubstage</Label>
        </Flex>
        <Flex gap={"2"} align={"center"}>
          <TextField.Root
            type="number"
            id="urlaubstage"
            name="urlaubstage"
            max={365}
            min={0}
            value={urlaubstage ? urlaubstage : ""}
            color={urlaubstage ? "green" : "red"}
            variant={urlaubstage ? "surface" : "soft"}
            onChange={(e) => setUrlaubstage(Number(e.target.value))}
          >
            <TextField.Slot side={"right"}>Tage</TextField.Slot>
          </TextField.Root>
        </Flex>
      </Flex>
    </>
  );
}; 