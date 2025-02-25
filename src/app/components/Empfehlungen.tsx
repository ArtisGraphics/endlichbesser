"use client";

import { Flex, SegmentedControl, Text } from "@radix-ui/themes";
import { useSalary } from "@/contexts/GehaltProvider";
import { useEffect, useState } from "react";
import EmpfehlungsCard from "@/app/components/EmpfehlungsCard";
import { Abrechnungszeitraum } from "@/types/abrechnungszeitraum";
import { getZahlungsintervall } from "@/utils/zahlungsintervall";

export const Empfehlungen = () => {
  const {
    minijobVerdienstGrenzeImJahr,
    minijobVerdienst,
    gehaelter,
    kinder,
    kindergeldProKind,
    kinderlosZuschlag,
    sachsenZuschlag,
    pflegeversicherungProzentsatzAN,
    beitragsbemessungsgrenzePflegeversicherungImJahr,
    pflegeversicherung,
    bundesland,
    kirchensteuer,
    kvZusatzbeitrag,
    krankenversicherungsArt,
    bruttoImJahr,
    beitragsbemessungsgrenzeKrankenversicherungImJahr,
    basisKrankenversicherungProzentsatz,
    krankenversicherung,
    alter,
  } = useSalary();

  const [mode, setMode] = useState<Abrechnungszeitraum>("Monat");
  const guenstigsteKrankenkasseBeitrag = 1.84;

  const [kvZusatzbeitragErsparnis, setKvZusatzbeitragErsparnis] =
    useState<number>(0);
  useEffect(() => {
    if (krankenversicherungsArt !== "gesetzlich versichert") {
      setKvZusatzbeitragErsparnis(0);
      return;
    }

    const bkkFirmusBeitrag =
      (Math.min(
        bruttoImJahr,
        beitragsbemessungsgrenzeKrankenversicherungImJahr,
      ) *
        ((basisKrankenversicherungProzentsatz +
          guenstigsteKrankenkasseBeitrag) /
          100)) /
      2;
    const ersparnis = krankenversicherung - bkkFirmusBeitrag;
    setKvZusatzbeitragErsparnis(Math.max(ersparnis, 0));
  }, [
    basisKrankenversicherungProzentsatz,
    beitragsbemessungsgrenzeKrankenversicherungImJahr,
    bruttoImJahr,
    krankenversicherung,
    krankenversicherungsArt,
    kvZusatzbeitrag,
  ]);

  const [
    pflegeversicherungUmzugErsparnis,
    setPflegeversicherungUmzugErsparnis,
  ] = useState<number>(0);
  useEffect(() => {
    let pflegeversicherungAusserhalbSachsen = pflegeversicherung;
    if (bundesland === "Sachsen") {
      pflegeversicherungAusserhalbSachsen =
        (Math.min(
          beitragsbemessungsgrenzePflegeversicherungImJahr,
          bruttoImJahr,
        ) *
          (pflegeversicherungProzentsatzAN - sachsenZuschlag)) /
        100;
    }
    const ersparnis = pflegeversicherung - pflegeversicherungAusserhalbSachsen;

    console.log(
      pflegeversicherung,
      pflegeversicherungAusserhalbSachsen,
      ersparnis,
    );
    setPflegeversicherungUmzugErsparnis(Math.max(ersparnis, 0));
  }, [
    pflegeversicherung,
    bundesland,
    beitragsbemessungsgrenzePflegeversicherungImJahr,
    bruttoImJahr,
    pflegeversicherungProzentsatzAN,
    sachsenZuschlag,
  ]);

  const [
    pflegeversicherungKeinKinderlosErsparnis,
    setPflegeversicherungKeinKinderlosErsparnis,
  ] = useState<number>(0);
  useEffect(() => {
    let pflegeversicherungOhneKinderlos = pflegeversicherung;
    if (kinder === 0 && alter >= 23) {
      pflegeversicherungOhneKinderlos =
        (Math.min(
          beitragsbemessungsgrenzePflegeversicherungImJahr,
          bruttoImJahr,
        ) *
          (pflegeversicherungProzentsatzAN - kinderlosZuschlag)) /
        100;
    }
    const ersparnis = pflegeversicherung - pflegeversicherungOhneKinderlos;
    setPflegeversicherungKeinKinderlosErsparnis(Math.max(ersparnis, 0));
  }, [
    pflegeversicherung,
    beitragsbemessungsgrenzePflegeversicherungImJahr,
    bruttoImJahr,
    pflegeversicherungProzentsatzAN,
    kinderlosZuschlag,
    kinder,
    alter,
  ]);

  const [
    pflegeversicherungKindMehrErsparnis,
    setPflegeversicherungKindMehrErsparnis,
  ] = useState<number>(0);
  useEffect(() => {
    let pflegeversicherungKindMehr = pflegeversicherung;
    if (kinder < 5 && kinder >= 1) {
      pflegeversicherungKindMehr =
        (Math.min(
          beitragsbemessungsgrenzePflegeversicherungImJahr,
          bruttoImJahr,
        ) *
          (pflegeversicherungProzentsatzAN - 0.25 * Math.min(kinder, 4))) /
        100;
    }
    const ersparnis = pflegeversicherung - pflegeversicherungKindMehr;
    setPflegeversicherungKindMehrErsparnis(Math.max(ersparnis, 0));
  }, [
    pflegeversicherung,
    bundesland,
    beitragsbemessungsgrenzePflegeversicherungImJahr,
    bruttoImJahr,
    pflegeversicherungProzentsatzAN,
    sachsenZuschlag,
    kinder,
  ]);

  const [minijobVerdienstOffen, setMinijobVerdienstOffen] = useState<number>(0);
  useEffect(() => {
    setMinijobVerdienstOffen(
      minijobVerdienstGrenzeImJahr - minijobVerdienst * 12,
    );
  }, [minijobVerdienst, minijobVerdienstGrenzeImJahr]);
  const [moeglicheGesamtErsparnis, setMoeglicheGesamtErsparnis] =
    useState<number>(0);
  useEffect(() => {
    setMoeglicheGesamtErsparnis(
      kvZusatzbeitragErsparnis +
        pflegeversicherungUmzugErsparnis +
        pflegeversicherungKeinKinderlosErsparnis +
        kirchensteuer +
        kindergeldProKind * 12 +
        minijobVerdienstOffen,
    );
  }, [
    kindergeldProKind,
    kirchensteuer,
    kvZusatzbeitragErsparnis,
    pflegeversicherungKeinKinderlosErsparnis,
    pflegeversicherungUmzugErsparnis,
    minijobVerdienstOffen,
  ]);

  return (
    <Flex direction={"column"} gap={"4"}>
      <SegmentedControl.Root
        value={mode}
        onValueChange={(value) => setMode(value as Abrechnungszeitraum)}
      >
        <SegmentedControl.Item value="Monat">Monat</SegmentedControl.Item>
        <SegmentedControl.Item value="Jahr">Jahr</SegmentedControl.Item>
      </SegmentedControl.Root>
      <Flex wrap={"wrap"} gap={"4"}>
        {kirchensteuer > 0 && (
          <EmpfehlungsCard
            badgeColor={"purple"}
            badgeText={"Kirchensteuer"}
            description={"Trete aus der Kirche aus."}
            savingsPerYear={kirchensteuer}
            mode={mode}
            payments={gehaelter}
          />
        )}
        {kvZusatzbeitrag > guenstigsteKrankenkasseBeitrag &&
          krankenversicherungsArt === "gesetzlich versichert" &&
          kvZusatzbeitragErsparnis > 0 && (
            <EmpfehlungsCard
              badgeColor={"cyan"}
              badgeText={"KV-Zusatzbeitrag"}
              description={"Wechsle die Krankenkasse zur BKK firmus."}
              savingsPerYear={kvZusatzbeitragErsparnis}
              mode={mode}
              payments={gehaelter}
            />
          )}
        {bundesland === "Sachsen" &&
          pflegeversicherung > 0 &&
          pflegeversicherungUmzugErsparnis > 0 && (
            <EmpfehlungsCard
              badgeText={"Pflegeversicherung"}
              description={"Ziehe in ein anderes Bundesland außer Sachsen."}
              savingsPerYear={pflegeversicherungUmzugErsparnis}
              mode={mode}
              payments={gehaelter}
            />
          )}
        {kinder === 0 && pflegeversicherungKeinKinderlosErsparnis > 0 && (
          <EmpfehlungsCard
            badgeText={"Pflegeversicherung"}
            description={"Bekomm mindestens ein Kind."}
            savingsPerYear={pflegeversicherungKeinKinderlosErsparnis}
            mode={mode}
            payments={gehaelter}
          />
        )}
        {kinder < 5 && pflegeversicherungKindMehrErsparnis > 0 && (
          <EmpfehlungsCard
            badgeText={"Pflegeversicherung"}
            description={"Bekomm ein Kind."}
            savingsPerYear={pflegeversicherungKindMehrErsparnis}
            mode={mode}
            payments={gehaelter}
          />
        )}
        {minijobVerdienstOffen > 0 && (
          <EmpfehlungsCard
            badgeColor={"red"}
            badgeText={"Minijob"}
            description={
              minijobVerdienst === 0
                ? "Such dir einen Minijob."
                : "Reiz die Minijobverdienstgrenze aus."
            }
            savingsPerYear={minijobVerdienstOffen}
            mode={mode}
            payments={12}
          />
        )}
        <EmpfehlungsCard
          badgeColor={"teal"}
          badgeText={"Kindergeld"}
          description={"Bekomm ein Kind."}
          savingsPerYear={kindergeldProKind * 12}
          mode={mode}
          payments={12}
        />
      </Flex>
      <Flex direction={"column"} gap={"2"} pb={"2"}>
        <Text size={"4"}>
          Deine mögliche Gesamtverbesserung liegt bei durchschnittlich:
        </Text>
        <Text size={"6"}>
          <Text color={"green"}>
            +
            {(mode === "Monat"
              ? moeglicheGesamtErsparnis / gehaelter
              : moeglicheGesamtErsparnis
            ).toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
          </Text>{" "}
          {" pro "}
          {getZahlungsintervall(mode, gehaelter)}
        </Text>
      </Flex>
    </Flex>
  );
};
