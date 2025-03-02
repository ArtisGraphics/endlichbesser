"use client";

import { Flex, SegmentedControl, Separator, Text } from "@radix-ui/themes";
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
    kinderfreibetragAngewendet,
    steuerklasse,
    sachbezug,
  } = useSalary();

  const [mode, setMode] = useState<Abrechnungszeitraum>("Monat");
  const guenstigsteKrankenkasseBeitrag = 1.84;
  const durchschnittlicheSteuererstattung = 1063;

  const [erholungsbeihilfeMaximum, setErholungsbeihilfeMaximum] =
    useState<number>(156 + 104 + 52);

  useEffect(() => {
    let erholungsbeihilfeMaximum = 156;
    const fuerEhegatten =
      steuerklasse === "Klasse 3" || steuerklasse === "Klasse 4";
    if (fuerEhegatten) {
      erholungsbeihilfeMaximum += 104;
    }
    erholungsbeihilfeMaximum += kinder * 52;

    setErholungsbeihilfeMaximum(erholungsbeihilfeMaximum);
  }, [kinder, steuerklasse]);

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
        minijobVerdienstOffen +
        durchschnittlicheSteuererstattung,
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
      <Text size={"4"} align={"left"}>
        Empfehlungen die du allein umsetzen kannst:
      </Text>
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
        {!kinderfreibetragAngewendet && (
          <EmpfehlungsCard
            badgeColor={"teal"}
            badgeText={"Kindergeld"}
            description={"Bekomm ein Kind."}
            savingsPerYear={kindergeldProKind * 12}
            mode={mode}
            payments={12}
          />
        )}
        <EmpfehlungsCard
          badgeColor={"tomato"}
          badgeText={"Steuererklärung"}
          description={"Mach eine Steuererklärung."}
          savingsPerYear={durchschnittlicheSteuererstattung}
          mode={mode}
          payments={12}
          modeSuffix={" im Durchschnitt"}
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
      <Separator size={"4"} />
      <Flex direction={"column"} gap={"2"} pb={"2"}>
        <Text size={"4"} align={"left"}>
          Empfehlungen die du in Absprache mit deinem Arbeitgeber umsetzen
          kannst:
        </Text>
        <Flex wrap={"wrap"} gap={"4"}>
          <EmpfehlungsCard
            badgeText={"Fahrtkostenzuschuss"}
            badgeColor={"pink"}
            description={
              "Unternehmen dürfen Mitarbeitern für 15 Arbeitstage pro Monat 30 Cent pro gefahrenem Kilometer als Zuschuss steuer- und sozialabgabenfrei auf den Nettolohn aufschlagen."
            }
            savingsPerYear={12 * 0.3}
            mode={mode}
            payments={12}
            modeSuffix={" / gefahrenem Kilometer"}
          />
          {sachbezug < 50 && (
            <EmpfehlungsCard
              badgeText={"Sachbezug"}
              badgeColor={"pink"}
              description={
                "Ein Sachbezug wie ein Tankgutschein (oder Einkaufsgutschein für den Supermarkt) in Höhe von 50 Euro monatlich ist erlaubt."
              }
              savingsPerYear={12 * (50 - sachbezug)}
              mode={mode}
              payments={12}
            />
          )}
          <EmpfehlungsCard
            badgeText={"Fahrrad / E-Bike"}
            badgeColor={"pink"}
            description={
              "Fahrräder oder E-Bikes (keine S-Pedelecs oder andere Kraftfahrzeuge) können seit 2019 steuerfrei zusätzlich zum Lohn oder Gehalt überlassen werden. Diese Steuerbegünstigung ist bis 2030 gesichert."
            }
            mode={mode}
            payments={12}
          />
          <EmpfehlungsCard
            badgeText={"Sachbezug bei besonderen Anlässen"}
            badgeColor={"pink"}
            description={
              "Kleine Aufmerksamkeiten wie Blumen, Bücher oder Pralinen zu besonderen Anlässen (z. B. Jubiläum) und Arbeitsessen sind bis 60 Euro steuer- und sozialabgabenfrei"
            }
            mode={"Jahr"}
            payments={12}
            savingsPerYear={60}
          />
          <EmpfehlungsCard
            badgeText={"Gutscheine für eigene Produkte"}
            badgeColor={"pink"}
            description={
              "Für bis zu 1.080 Euro pro Jahr dürfen Arbeitgeber an Mitarbeiter Gutscheine für eigene Produkte verteilen, ohne dass Steuern oder Sozialabgaben anfallen."
            }
            mode={mode}
            payments={gehaelter}
            savingsPerYear={1080}
          />
          {kinder > 0 && (
            <EmpfehlungsCard
              badgeText={"Betreuung nicht schulpflichtiger Kinder"}
              badgeColor={"pink"}
              description={
                "Die tatsächlichen Kosten für die Betreuung nicht schulpflichtiger Kinder dürfen Arbeitgeber steuer- und sozialabgabenfrei in voller Höhe übernehmen (Kostennachweise erforderlich)."
              }
              mode={mode}
              payments={12}
            />
          )}
          <EmpfehlungsCard
            badgeText={"Prävention von Gesundheitsproblemen"}
            badgeColor={"pink"}
            description={
              "Bis zu 600 Euro pro Jahr und Mitarbeiter können für die Prävention von Gesundheitsproblemen für zertifizierte Maßnahmen eingesetzt werden. In diesem Bereich der Nettolohnoptimierung sind häufige Bausteine Rückenschule, Yogakurs oder Massagen."
            }
            mode={mode}
            payments={gehaelter}
            savingsPerYear={600}
          />
          <EmpfehlungsCard
            badgeText={"Erholungsbeihilfen"}
            badgeColor={"pink"}
            description={
              "Erholungsbeihilfen zur Kräftigung und Erhaltung der allgemeinen Gesundheit dürfen 156 Euro pro Jahr für den Arbeitnehmer, 104 Euro für den Ehegatten und 52 Euro pro Kind nicht überschreiten, um für den Arbeitnehmer steuerfrei zu bleiben. Der Arbeitgeber versteuert die Summe pauschal mit 25 %."
            }
            mode={mode}
            payments={gehaelter}
            savingsPerYear={erholungsbeihilfeMaximum}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
