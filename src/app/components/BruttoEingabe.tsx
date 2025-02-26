"use client";

import {
  Button,
  Flex,
  Popover,
  Progress,
  SegmentedControl,
  Select,
  Separator,
  Spinner,
  Switch,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import { useEffect, useRef, useState } from "react";
import { berechneZuVersteuerndesEinkommen } from "@/utils/steuern/zuVersteuerndesEinkommen";
import { useSalary } from "@/contexts/GehaltProvider";
import {
  berechnePflegeversicherungArbeitgeberProzentsatz,
  berechnePflegeversicherungArbeitnehmerProzentsatz,
  berechnePflegeversicherungsAnteilArbeitnehmer,
} from "@/utils/sozialabgaben/pflegeversicherung";
import {
  berechneKirchensteuer,
  berechneKirchensteuerProzentsatz,
} from "@/utils/steuern/kirchensteuer";
import { berechneArbeitslosenversicherung } from "@/utils/sozialabgaben/arbeitslosenversicherung";
import { berechneSolidaritaetszuschlag } from "@/utils/steuern/solidaritätszuschlag";
import { berechneEinkommenssteuer } from "@/utils/steuern/einkommenssteuer";
import { berechneRentenversicherung } from "@/utils/sozialabgaben/rentenversicherung";
import { berechneKrankenversicherungGesetzlich } from "@/utils/sozialabgaben/krankenversicherung";
import { getZahlungsintervall } from "@/utils/zahlungsintervall";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Bundesland } from "@/types/bundesland";

export const BruttoEingabe = () => {
  const bruttoInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (bruttoInputRef.current) {
      bruttoInputRef.current.focus();
    }
  }, []);
  const {
    grundfreibetrag,
    brutto,
    setBrutto,
    bruttoImJahr,
    setBruttoImJahr,
    netto,
    setNetto,
    nettoEinkommen,
    setNettoEinkommen,
    steuerklasse,
    setSteuerklasse,
    gesamtAbgaben,
    setGesamtAbgaben,
    abrechnungszeitraum,
    setAbrechnungszeitraum,
    inDerKirche,
    setInDerKirche,
    bundesland,
    setBundesland,
    bundeslandWasManuallySet,
    setBundeslandWasManuallySet,
    alter,
    setAlter,
    kinder,
    setKinder,
    gehaelter,
    setGehaelter,
    urlaubstage,
    setUrlaubstage,
    wochenstunden,
    setWochenstunden,
    kirchensteuerProzent,
    setKirchensteuerProzent,
    kirchensteuer,
    setKirchensteuer,
    solidaritaetszuschlag,
    setSolidaritaetszuschlag,
    steuerfreibetragImJahr,
    setSteuerfreibetragImJahr,
    entlastungsbetragFuerAlleinerziehende,
    entlastungsbetragFuerAlleinerziehendeProKind,
    zuVersteuerndesEinkommen,
    setZuVersteuerndesEinkommen,
    einkommenssteuer,
    setEinkommenssteuer,
    gesamtKostenSteuern,
    setGesamtKostenSteuern,
    basisKrankenversicherungProzentsatz,
    beitragsbemessungsgrenzeKrankenversicherungImJahr,
    kvZusatzbeitrag,
    setKvZusatzbeitrag,
    krankenversicherungsArt,
    setKrankenversicherungsArt,
    krankenversicherung,
    setKrankenversicherung,
    privateKVMonatlich,
    setPrivateKVMonatlich,
    krankenversicherungProzentsatz,
    setKrankenversicherungProzentsatz,
    beitragsbemessungsgrenzePflegeversicherungImJahr,
    kinderlosZuschlag,
    sachsenZuschlag,
    basisPflegeversicherungProzentsatzAG,
    pflegeversicherungProzentsatzAG,
    setPflegeversicherungProzentsatzAG,
    basisPflegeversicherungProzentsatzAN,
    pflegeversicherungProzentsatzAN,
    setPflegeversicherungProzentsatzAN,
    pflegeversicherung,
    setPflegeversicherung,
    beitragsbemessungsgrenzeRentenversicherungImJahr,
    rentenversicherungProzentsatz,
    rentenversicherungsArt,
    setRentenversicherungsArt,
    rentenversicherung,
    setRentenversicherung,
    beitragsbemessungsgrenzeArbeitslosenversicherungImJahr,
    arbeitslosenversicherungProzentsatz,
    arbeitslosenversicherungsArt,
    setArbeitslosenversicherungsArt,
    arbeitslosenversicherung,
    setArbeitslosenversicherung,
    gesamtKostenSozialversicherung,
    setGesamtKostenSozialversicherung,
  } = useSalary();

  const [fetchingBundesland, setFetchingBundesland] = useState<boolean>(false);

  const [wochenstundenZeitraum, setWochenstundenZeitraum] =
    useState<string>("Woche");

  useEffect(() => {
    if (steuerklasse === "Klasse 2" && kinder === 0) {
      setKinder(1);
    }
  }, [setKinder, steuerklasse]);

  useEffect(() => {
    if (bundeslandWasManuallySet) {
      return;
    }
    setFetchingBundesland(true);
    // Fetch the user's IP address
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const ipAddress = data.ip;
        // Use the IP address to fetch the user's location
        fetch(`https://freeipapi.com/api/json/${ipAddress}`)
          .then((response) => response.json())
          .then((location) => {
            if (location.regionName) {
              const allowedRegionNames: Bundesland[] = [
                "Baden-Württemberg",
                "Bayern",
                "Berlin",
                "Brandenburg",
                "Bremen",
                "Hamburg",
                "Hessen",
                "Mecklenburg-Vorpommern",
                "Niedersachsen",
                "Nordrhein-Westfalen",
                "Rheinland-Pfalz",
                "Saarland",
                "Sachsen",
                "Sachsen-Anhalt",
                "Schleswig-Holstein",
                "Thüringen",
              ];
              if (allowedRegionNames.includes(location.regionName)) {
                setBundesland(location.regionName);
              }
            }
            setFetchingBundesland(false);
          })
          .catch((error) => {
            console.error("Error fetching location:", error);
            setFetchingBundesland(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching IP address:", error);
        setFetchingBundesland(false);
      });
  }, [bundeslandWasManuallySet, setBundesland]);

  //Brutto
  useEffect(() => {
    setBruttoImJahr(
      abrechnungszeitraum === "Jahr" ? brutto : brutto * gehaelter,
    );
  }, [brutto, abrechnungszeitraum, gehaelter, setBruttoImJahr]);

  //Krankenversicherung
  useEffect(() => {
    setKrankenversicherungProzentsatz(
      basisKrankenversicherungProzentsatz + kvZusatzbeitrag,
    );
  }, [
    basisKrankenversicherungProzentsatz,
    kvZusatzbeitrag,
    setKrankenversicherungProzentsatz,
  ]);

  useEffect(() => {
    if (krankenversicherungsArt === "gesetzlich versichert") {
      setKrankenversicherung(
        berechneKrankenversicherungGesetzlich(
          bruttoImJahr,
          beitragsbemessungsgrenzeKrankenversicherungImJahr,
          krankenversicherungProzentsatz,
        ),
      );
    } else {
      // Privatversicherte zahlen oft einen festen Betrag
      setKrankenversicherung(privateKVMonatlich * gehaelter); // Jahresbetrag
    }
  }, [
    bruttoImJahr,
    krankenversicherungsArt,
    kvZusatzbeitrag,
    basisKrankenversicherungProzentsatz,
    gehaelter,
    privateKVMonatlich,
    setKrankenversicherung,
    beitragsbemessungsgrenzeKrankenversicherungImJahr,
    krankenversicherungProzentsatz,
  ]);

  //Rentenversicherung
  useEffect(() => {
    let rentenversicherung = 0;
    if (rentenversicherungsArt === "gesetzlich versichert") {
      rentenversicherung = berechneRentenversicherung(
        bruttoImJahr,
        beitragsbemessungsgrenzeRentenversicherungImJahr,
        rentenversicherungProzentsatz,
      );
    }

    setRentenversicherung(rentenversicherung);
  }, [
    rentenversicherungsArt,
    bruttoImJahr,
    beitragsbemessungsgrenzeRentenversicherungImJahr,
    setRentenversicherung,
    rentenversicherungProzentsatz,
  ]);

  //Arbeitslosenversicherung
  useEffect(() => {
    let arbeitslosenversicherung = 0;
    if (arbeitslosenversicherungsArt === "gesetzlich versichert") {
      arbeitslosenversicherung = berechneArbeitslosenversicherung(
        bruttoImJahr,
        beitragsbemessungsgrenzeArbeitslosenversicherungImJahr,
        arbeitslosenversicherungProzentsatz,
      );
    }
    setArbeitslosenversicherung(arbeitslosenversicherung);
  }, [
    arbeitslosenversicherungsArt,
    bruttoImJahr,
    beitragsbemessungsgrenzeArbeitslosenversicherungImJahr,
    setArbeitslosenversicherung,
    arbeitslosenversicherungProzentsatz,
  ]);

  //Pflegeversicherung
  useEffect(() => {
    setPflegeversicherungProzentsatzAG(
      berechnePflegeversicherungArbeitgeberProzentsatz(
        bundesland,
        sachsenZuschlag,
        basisPflegeversicherungProzentsatzAG,
      ),
    );

    setPflegeversicherungProzentsatzAN(
      berechnePflegeversicherungArbeitnehmerProzentsatz(
        bundesland,
        kinder,
        alter,
        sachsenZuschlag,
        kinderlosZuschlag,
        basisPflegeversicherungProzentsatzAN,
      ),
    );
  }, [
    kinder,
    basisPflegeversicherungProzentsatzAN,
    basisPflegeversicherungProzentsatzAG,
    kinderlosZuschlag,
    bundesland,
    sachsenZuschlag,
    setPflegeversicherungProzentsatzAG,
    setPflegeversicherungProzentsatzAN,
    alter,
  ]);

  useEffect(() => {
    setPflegeversicherung(
      berechnePflegeversicherungsAnteilArbeitnehmer(
        bruttoImJahr,
        beitragsbemessungsgrenzePflegeversicherungImJahr,
        pflegeversicherungProzentsatzAN,
      ),
    );
  }, [
    bruttoImJahr,
    pflegeversicherungProzentsatzAN,
    beitragsbemessungsgrenzePflegeversicherungImJahr,
    setPflegeversicherung,
  ]);

  useEffect(() => {
    setGesamtKostenSozialversicherung(
      krankenversicherung +
        rentenversicherung +
        arbeitslosenversicherung +
        pflegeversicherung,
    );
  }, [
    krankenversicherung,
    rentenversicherung,
    arbeitslosenversicherung,
    pflegeversicherung,
    setGesamtKostenSozialversicherung,
  ]);

  /* ------- Steuern ------- */
  //Zu versteuerndes Einkommen
  useEffect(() => {
    const zuVersteuerndesEinkommen = berechneZuVersteuerndesEinkommen(
      steuerklasse,
      bruttoImJahr,
      steuerfreibetragImJahr,
      grundfreibetrag,
      kinder,
      entlastungsbetragFuerAlleinerziehendeProKind,
      entlastungsbetragFuerAlleinerziehende,
    );
    setZuVersteuerndesEinkommen(zuVersteuerndesEinkommen);
  }, [
    steuerklasse,
    bruttoImJahr,
    steuerfreibetragImJahr,
    grundfreibetrag,
    setZuVersteuerndesEinkommen,
    entlastungsbetragFuerAlleinerziehende,
    kinder,
    entlastungsbetragFuerAlleinerziehendeProKind,
  ]);

  //Einkommenssteuer
  useEffect(() => {
    setEinkommenssteuer(
      berechneEinkommenssteuer(zuVersteuerndesEinkommen, grundfreibetrag),
    );
  }, [zuVersteuerndesEinkommen, grundfreibetrag, setEinkommenssteuer]);

  useEffect(() => {
    setGesamtKostenSteuern(
      einkommenssteuer + kirchensteuer + solidaritaetszuschlag,
    );
  }, [
    einkommenssteuer,
    kirchensteuer,
    setGesamtKostenSteuern,
    solidaritaetszuschlag,
  ]);

  //Kirchensteuer
  useEffect(() => {
    setKirchensteuerProzent(berechneKirchensteuerProzentsatz(bundesland));
  }, [bundesland, setKirchensteuerProzent]);

  useEffect(() => {
    let kirchensteuer = 0;
    if (inDerKirche === "ja") {
      kirchensteuer = berechneKirchensteuer(
        einkommenssteuer,
        kirchensteuerProzent,
      );
    }
    setKirchensteuer(kirchensteuer);
  }, [inDerKirche, einkommenssteuer, setKirchensteuer, kirchensteuerProzent]);

  //Solidaritätszuschlag
  useEffect(() => {
    setSolidaritaetszuschlag(
      berechneSolidaritaetszuschlag(
        einkommenssteuer,
        steuerklasse === "Klasse 2",
      ),
    );
  }, [steuerklasse, einkommenssteuer, setSolidaritaetszuschlag]);

  //Gesamtabgaben
  useEffect(() => {
    setGesamtAbgaben(
      einkommenssteuer +
        kirchensteuer +
        krankenversicherung +
        rentenversicherung +
        arbeitslosenversicherung +
        pflegeversicherung +
        solidaritaetszuschlag,
    );
  }, [
    einkommenssteuer,
    kirchensteuer,
    krankenversicherung,
    rentenversicherung,
    arbeitslosenversicherung,
    pflegeversicherung,
    solidaritaetszuschlag,
    setGesamtAbgaben,
  ]);

  //Netto im Jahr
  useEffect(() => {
    setNettoEinkommen(bruttoImJahr - gesamtAbgaben);
  }, [bruttoImJahr, gesamtAbgaben, setNettoEinkommen]);

  useEffect(() => {
    setNetto(
      abrechnungszeitraum === "Jahr"
        ? nettoEinkommen
        : nettoEinkommen / gehaelter,
    );
  }, [nettoEinkommen, abrechnungszeitraum, gehaelter, setNetto]);

  return (
    <Flex position={"relative"} direction="column" gap="2" align={"start"}>
      <Text weight={"bold"}>Bruttoeinkommen</Text>
      <Text className={"absolute left-full translate-x-6 text-nowrap"}>
        pro Jahr:
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
              console.log(e.target.value);
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
      <Separator size={"4"} />
      <Text weight={"bold"}>Persönliche Daten</Text>
      <Flex
        wrap={"wrap"}
        gap="2"
        align="center"
        justify="between"
        width={"100%"}
      >
        <Label htmlFor="bundesland">Bundesland</Label>
        <Flex gap={"2"} align={"center"}>
          {fetchingBundesland && <Spinner />}
          <Select.Root
            value={bundesland}
            onValueChange={(value: Bundesland) => {
              setBundeslandWasManuallySet(true);
              setBundesland(value);
            }}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="Baden-Württemberg">
                <Flex gap={"2"} align={"center"}>
                  <Image
                    src={"/bundeslaender/Baden-Württemberg.webp"}
                    width={16}
                    height={16}
                    alt={"Wappen von Baden-Württemberg"}
                  />
                  Baden-Württemberg
                </Flex>
              </Select.Item>
              <Select.Item value="Bayern">
                <Flex gap={"2"} align={"center"}>
                  <Image
                    src={"/bundeslaender/Bayern.webp"}
                    width={16}
                    height={16}
                    alt={"Wappen von Bayern"}
                  />
                  Bayern
                </Flex>
              </Select.Item>
              <Select.Item value="Berlin">
                <Flex gap={"2"} align={"center"}>
                  <Image
                    src={"/bundeslaender/Berlin.webp"}
                    width={16}
                    height={16}
                    alt={"Wappen von Berlin"}
                  />
                  Berlin
                </Flex>
              </Select.Item>
              <Select.Item value="Brandenburg">
                <Flex gap={"2"} align={"center"}>
                  <Image
                    src={"/bundeslaender/Brandenburg.webp"}
                    width={16}
                    height={16}
                    alt={"Wappen von Brandenburg"}
                  />
                  Brandenburg
                </Flex>
              </Select.Item>
              <Select.Item value="Bremen">
                <Flex gap={"2"} align={"center"}>
                  <Image
                    src={"/bundeslaender/Bremen.webp"}
                    width={16}
                    height={16}
                    alt={"Wappen von Bremen"}
                  />
                  Bremen
                </Flex>
              </Select.Item>
              <Select.Item value="Hamburg">
                <Flex gap={"2"} align={"center"}>
                  <Image
                    src={"/bundeslaender/Hamburg.webp"}
                    width={16}
                    height={16}
                    alt={"Wappen von Hamburg"}
                  />
                  Hamburg
                </Flex>
              </Select.Item>
              <Select.Item value="Hessen">
                <Flex gap={"2"} align={"center"}>
                  <Image
                    src={"/bundeslaender/Hessen.webp"}
                    width={16}
                    height={16}
                    alt={"Wappen von Hessen"}
                  />
                  Hessen
                </Flex>
              </Select.Item>
              <Select.Item value="Mecklenburg-Vorpommern">
                <Flex gap={"2"} align={"center"}>
                  <Image
                    src={"/bundeslaender/Mecklenburg-Vorpommern.webp"}
                    width={16}
                    height={16}
                    alt={"Wappen von Mecklenburg-Vorpommern"}
                  />
                  Mecklenburg-Vorpommern
                </Flex>
              </Select.Item>
              <Select.Item value="Niedersachsen">
                <Flex gap={"2"} align={"center"}>
                  <Image
                    src={"/bundeslaender/Niedersachsen.webp"}
                    width={16}
                    height={16}
                    alt={"Wappen von Niedersachsen"}
                  />
                  Niedersachsen
                </Flex>
              </Select.Item>
              <Select.Item value="Nordrhein-Westfalen">
                <Flex gap={"2"} align={"center"}>
                  <Image
                    src={"/bundeslaender/Nordrhein-Westfalen.webp"}
                    width={16}
                    height={16}
                    alt={"Wappen von Nordrhein-Westfalen"}
                  />
                  Nordrhein-Westfalen
                </Flex>
              </Select.Item>
              <Select.Item value="Rheinland-Pfalz">
                <Flex gap={"2"} align={"center"}>
                  <Image
                    src={"/bundeslaender/Rheinland-Pfalz.webp"}
                    width={16}
                    height={16}
                    alt={"Wappen von Rheinland-Pfalz"}
                  />
                  Rheinland-Pfalz
                </Flex>
              </Select.Item>
              <Select.Item value="Saarland">
                <Flex gap={"2"} align={"center"}>
                  <Image
                    src={"/bundeslaender/Saarland.webp"}
                    width={16}
                    height={16}
                    alt={"Wappen von Saarland"}
                  />
                  Saarland
                </Flex>
              </Select.Item>
              <Select.Item value="Sachsen">
                <Flex gap={"2"} align={"center"}>
                  <Image
                    src={"/bundeslaender/Sachsen.webp"}
                    width={16}
                    height={16}
                    alt={"Wappen von Sachsen"}
                  />
                  Sachsen
                </Flex>
              </Select.Item>
              <Select.Item value="Sachsen-Anhalt">
                <Flex gap={"2"} align={"center"}>
                  <Image
                    src={"/bundeslaender/Sachsen-Anhalt.webp"}
                    width={16}
                    height={16}
                    alt={"Wappen von Sachsen-Anhalt"}
                  />
                  Sachsen-Anhalt
                </Flex>
              </Select.Item>
              <Select.Item value="Schleswig-Holstein">
                <Flex gap={"2"} align={"center"}>
                  <Image
                    src={"/bundeslaender/Schleswig-Holstein.webp"}
                    width={16}
                    height={16}
                    alt={"Wappen von Schleswig-Holstein"}
                  />
                  Schleswig-Holstein
                </Flex>
              </Select.Item>
              <Select.Item value="Thüringen">
                <Flex gap={"2"} align={"center"}>
                  <Image
                    src={"/bundeslaender/Thüringen.webp"}
                    width={16}
                    height={16}
                    alt={"Wappen von Thüringen"}
                  />
                  Thüringen
                </Flex>
              </Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>
      </Flex>
      <Flex
        wrap={"wrap"}
        gap="2"
        align="center"
        justify="between"
        width={"100%"}
      >
        <Flex gap={"2"} align={"center"} direction={"row"} justify={"center"}>
          {!alter && (
            <Label className={"text-xs text-red-400"}>
              <Tooltip content={"Dein Alter fehlt"}>
                <ExclamationTriangleIcon />
              </Tooltip>
            </Label>
          )}
          <Label htmlFor="alter">Dein Alter</Label>
        </Flex>
        <TextField.Root
          type="number"
          id="alter"
          name="alter"
          value={alter ? alter : ""}
          color={alter ? "green" : "red"}
          variant={alter ? "surface" : "soft"}
          min={0}
          max={130}
          onChange={(e) => setAlter(Number(e.target.value))}
        >
          <TextField.Slot side={"right"}>Jahre</TextField.Slot>
        </TextField.Root>
      </Flex>

      <Flex
        wrap={"wrap"}
        gap="2"
        align="center"
        justify="between"
        width={"100%"}
      >
        <Flex gap="2" align="center">
          <Flex gap={"2"} align={"center"} direction={"row"} justify={"center"}>
            {steuerklasse === "Klasse 2" && kinder === 0 && (
              <Label className={"text-xs text-red-400"}>
                <Tooltip
                  content={
                    "Du musst mindestens ein Kind haben, um in Steuerklasse 2 zu sein. Wechsle deine Steuerklasse oder gib die Anzahl deiner Kinder an."
                  }
                >
                  <ExclamationTriangleIcon />
                </Tooltip>
              </Label>
            )}
            <Label htmlFor="kinder">Wie viele Kinder hast du?</Label>
          </Flex>
          <Popover.Root>
            <Popover.Trigger>
              <Button variant="surface">?</Button>
            </Popover.Trigger>
            <Popover.Content>
              <Text size={"1"}>
                Bitte nur Kinder angeben für die du Kindergeld berechtigt bist
              </Text>
            </Popover.Content>
          </Popover.Root>
        </Flex>
        <TextField.Root
          type="number"
          id="kinder"
          name="kinder"
          max={69}
          min={0}
          placeholder={"-"}
          color={steuerklasse === "Klasse 2" && kinder === 0 ? "red" : "green"}
          variant={
            steuerklasse === "Klasse 2" && kinder === 0 ? "soft" : "surface"
          }
          value={kinder ? kinder : ""}
          onChange={(e) => setKinder(Number(e.target.value))}
        >
          <TextField.Slot side={"right"}>Kinder</TextField.Slot>
        </TextField.Root>
      </Flex>
      <Separator size={"4"} />
      <Flex
        wrap={"wrap"}
        position={"relative"}
        gap="2"
        align="center"
        justify="between"
        width={"100%"}
      >
        <Text weight={"bold"}>
          Sozialversicherung
          <Text className={"absolute left-full translate-x-6"} color={"red"}>
            {gesamtKostenSozialversicherung.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
          </Text>
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
        <Flex gap="2" align="center">
          <Label htmlFor="krankenversicherung">Krankenversicherung</Label>
          <Popover.Root>
            <Popover.Trigger>
              <Button variant="surface">?</Button>
            </Popover.Trigger>
            <Popover.Content>
              <Text color={"red"}>-{krankenversicherungProzentsatz / 2}%</Text>{" "}
              vom Bruttogehalt
              <br />
              <Text size={"1"}>
                {basisKrankenversicherungProzentsatz}% + {kvZusatzbeitrag}%
                (Zusatzbeitrag) = {krankenversicherungProzentsatz}% Gesamt
                <br />
                {krankenversicherungProzentsatz / 2}% Arbeitnehmer /{" "}
                {krankenversicherungProzentsatz / 2}% Arbeitgeber
                <Progress
                  title={"Arbeitgeber"}
                  value={Math.round(
                    (krankenversicherungProzentsatz /
                      2 /
                      krankenversicherungProzentsatz) *
                      100,
                  )}
                />
                <Flex gap={"2"} justify={"between"}>
                  <span>
                    {Math.round(
                      (krankenversicherungProzentsatz /
                        2 /
                        krankenversicherungProzentsatz) *
                        100,
                    )}
                    %
                  </span>
                  <span>
                    {Math.round(
                      (krankenversicherungProzentsatz /
                        2 /
                        krankenversicherungProzentsatz) *
                        100,
                    )}
                    %
                  </span>
                </Flex>
              </Text>
            </Popover.Content>
          </Popover.Root>
        </Flex>
        <Select.Root
          value={krankenversicherungsArt}
          onValueChange={setKrankenversicherungsArt}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="gesetzlich versichert">
              gesetzlich versichert
            </Select.Item>
            <Select.Item value="privat versichert">
              privat versichert
            </Select.Item>
          </Select.Content>
        </Select.Root>
        <Text className={"absolute left-full translate-x-6"} color={"red"}>
          {krankenversicherung.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </Text>
      </Flex>

      {krankenversicherungsArt === "gesetzlich versichert" ? (
        <Flex
          wrap={"wrap"}
          gap="2"
          align="center"
          justify="between"
          width={"100%"}
        >
          <Flex gap={"2"} align={"center"} direction={"row"} justify={"center"}>
            {!kvZusatzbeitrag && (
              <Label className={"text-xs text-red-400"}>
                <Tooltip content={"Zusatzbeitrag deiner Krankenkasse fehlt"}>
                  <ExclamationTriangleIcon />
                </Tooltip>
              </Label>
            )}
            <Label htmlFor="kvZusatzbeitrag">KV-Zusatzbeitrag</Label>
          </Flex>
          <TextField.Root
            type="number"
            id="kvZusatzbeitrag"
            name="kvZusatzbeitrag"
            placeholder="dein Zusatzbeitrag"
            step={0.01}
            min={0}
            max={4.4}
            value={kvZusatzbeitrag ? kvZusatzbeitrag : ""}
            color={kvZusatzbeitrag ? "green" : "red"}
            variant={kvZusatzbeitrag ? "surface" : "soft"}
            onChange={(e) => setKvZusatzbeitrag(Number(e.target.value))}
          >
            <TextField.Slot side={"right"}>%</TextField.Slot>
          </TextField.Root>
        </Flex>
      ) : (
        <Flex
          wrap={"wrap"}
          gap="2"
          align="center"
          justify="between"
          width={"100%"}
        >
          <Flex gap="2" align="center">
            <Label htmlFor="privateKVMonatlich">
              Beitrag für private Krankenversicherung
            </Label>
          </Flex>
          <TextField.Root
            type="number"
            id="privateKVMonatlich"
            name="privateKVMonatlich"
            placeholder="Monatsbeitrag für private Krankenversicherung"
            value={privateKVMonatlich}
            onChange={(e) => setPrivateKVMonatlich(Number(e.target.value))}
          >
            <TextField.Slot side={"right"}>€ / Monat</TextField.Slot>
          </TextField.Root>
        </Flex>
      )}

      <Flex
        wrap={"wrap"}
        position={"relative"}
        gap="2"
        align="center"
        justify="between"
        width={"100%"}
      >
        <Flex gap="2" align="center">
          <Label htmlFor="rentenversicherung">Rentenversicherung</Label>
          <Popover.Root>
            <Popover.Trigger>
              <Button variant="surface">?</Button>
            </Popover.Trigger>
            <Popover.Content>
              <Text color={"red"}>-{rentenversicherungProzentsatz / 2}%</Text>{" "}
              vom Bruttogehalt
              <br />
              <Text size={"1"}>
                {rentenversicherungProzentsatz}% Gesamt
                <br />
                {rentenversicherungProzentsatz / 2}% Arbeitnehmer /{" "}
                {rentenversicherungProzentsatz / 2}% Arbeitgeber
                <Progress
                  title={"Arbeitgeber"}
                  value={Math.round(
                    (rentenversicherungProzentsatz /
                      2 /
                      rentenversicherungProzentsatz) *
                      100,
                  )}
                />
                <Flex gap={"2"} justify={"between"}>
                  <span>
                    {Math.round(
                      (rentenversicherungProzentsatz /
                        2 /
                        rentenversicherungProzentsatz) *
                        100,
                    )}
                    %
                  </span>
                  <span>
                    {Math.round(
                      (rentenversicherungProzentsatz /
                        2 /
                        rentenversicherungProzentsatz) *
                        100,
                    )}
                    %
                  </span>
                </Flex>
              </Text>
            </Popover.Content>
          </Popover.Root>
        </Flex>
        <Select.Root
          value={rentenversicherungsArt}
          onValueChange={setRentenversicherungsArt}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="gesetzlich versichert">
              gesetzlich versichert
            </Select.Item>
            <Select.Item value="nicht gesetzlich versichert">
              nicht gesetzlich versichert
            </Select.Item>
          </Select.Content>
        </Select.Root>
        <Text className={"absolute left-full translate-x-6"} color={"red"}>
          {rentenversicherung.toLocaleString("de-DE", {
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
        <Flex gap="2" align="center">
          <Label htmlFor="arbeitslosenversicherung">
            Arbeitslosenversicherung
          </Label>
          <Popover.Root>
            <Popover.Trigger>
              <Button variant="surface">?</Button>
            </Popover.Trigger>
            <Popover.Content>
              <Text color={"red"}>
                -{arbeitslosenversicherungProzentsatz / 2}%
              </Text>{" "}
              vom Bruttogehalt
              <br />
              <Text size={"1"}>
                {arbeitslosenversicherungProzentsatz}% Gesamt
                <br />
                {arbeitslosenversicherungProzentsatz / 2}% Arbeitnehmer /{" "}
                {arbeitslosenversicherungProzentsatz / 2}% Arbeitgeber
                <Progress
                  title={"Arbeitgeber"}
                  value={Math.round(
                    (arbeitslosenversicherungProzentsatz /
                      2 /
                      arbeitslosenversicherungProzentsatz) *
                      100,
                  )}
                />
                <Flex gap={"2"} justify={"between"}>
                  <span>
                    {Math.round(
                      (arbeitslosenversicherungProzentsatz /
                        2 /
                        arbeitslosenversicherungProzentsatz) *
                        100,
                    )}
                    %
                  </span>
                  <span>
                    {Math.round(
                      (arbeitslosenversicherungProzentsatz /
                        2 /
                        arbeitslosenversicherungProzentsatz) *
                        100,
                    )}
                    %
                  </span>
                </Flex>
              </Text>
            </Popover.Content>
          </Popover.Root>
        </Flex>
        <Select.Root
          value={arbeitslosenversicherungsArt}
          onValueChange={setArbeitslosenversicherungsArt}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="gesetzlich versichert">
              gesetzlich versichert
            </Select.Item>
            <Select.Item value="nicht gesetzlich versichert">
              nicht gesetzlich versichert
            </Select.Item>
          </Select.Content>
        </Select.Root>
        <Text className={"absolute left-full translate-x-6"} color={"red"}>
          {arbeitslosenversicherung.toLocaleString("de-DE", {
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
        <Flex gap="2" align="center">
          <Label htmlFor="arbeitslosenversicherung">Pflegeversicherung</Label>
          <Popover.Root>
            <Popover.Trigger>
              <Button variant="surface">?</Button>
            </Popover.Trigger>
            <Popover.Content>
              <Text color={"red"}>-{pflegeversicherungProzentsatzAN}%</Text> vom
              Bruttogehalt
              <br />
              <Text size={"1"}>
                {(
                  pflegeversicherungProzentsatzAN +
                  pflegeversicherungProzentsatzAG
                ).toFixed(2)}
                % Gesamt
                <br />
                {pflegeversicherungProzentsatzAN}% Arbeitnehmer /{" "}
                {pflegeversicherungProzentsatzAG}% Arbeitgeber
                <Progress
                  title={"Arbeitgeber"}
                  value={Math.round(
                    (pflegeversicherungProzentsatzAN /
                      (pflegeversicherungProzentsatzAG +
                        pflegeversicherungProzentsatzAN)) *
                      100,
                  )}
                />
                <Flex gap={"2"} justify={"between"}>
                  <span>
                    {Math.round(
                      (pflegeversicherungProzentsatzAN /
                        (pflegeversicherungProzentsatzAG +
                          pflegeversicherungProzentsatzAN)) *
                        100,
                    )}
                    %
                  </span>
                  <span>
                    {Math.round(
                      (pflegeversicherungProzentsatzAG /
                        (pflegeversicherungProzentsatzAG +
                          pflegeversicherungProzentsatzAN)) *
                        100,
                    )}
                    %
                  </span>
                </Flex>
              </Text>
            </Popover.Content>
          </Popover.Root>
        </Flex>

        <Text className={"absolute left-full translate-x-6"} color={"red"}>
          {pflegeversicherung.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </Text>
      </Flex>
      <Separator size={"4"} />
      <Flex
        wrap={"wrap"}
        position={"relative"}
        gap="2"
        align="center"
        justify="between"
        width={"100%"}
      >
        <Text weight={"bold"}>
          Steuer
          <Text className={"absolute left-full translate-x-6"} color={"red"}>
            {gesamtKostenSteuern.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
          </Text>
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
        <Flex gap={"2"} align={"center"}>
          <Label htmlFor="steuerklasse">Steuerklasse</Label>
          <Popover.Root>
            <Popover.Trigger>
              <Button variant="surface">?</Button>
            </Popover.Trigger>
            <Popover.Content>
              <Text color={"red"}>
                -{((einkommenssteuer / bruttoImJahr) * 100).toFixed(2)}%
              </Text>{" "}
              vom Bruttogehalt
              <br />
              <Text size={"1"}>
                <Text>
                  {bruttoImJahr.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>{" "}
                Brutto
                <br />
                <Text color={"green"}>
                  -
                  {grundfreibetrag.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>{" "}
                Grundfreibetrag
                <br />
                {steuerfreibetragImJahr > 0 ? (
                  <Text color={"green"}>
                    -
                    {steuerfreibetragImJahr.toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}{" "}
                    zusätzlicher Steuerfreibetrag
                    <br />
                  </Text>
                ) : (
                  ""
                )}
                <Text weight={"bold"}>
                  {zuVersteuerndesEinkommen.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>{" "}
                zu versteuerndes Einkommen
                <br />
              </Text>
            </Popover.Content>
          </Popover.Root>
        </Flex>
        <SegmentedControl.Root
          value={steuerklasse}
          onValueChange={setSteuerklasse}
        >
          <SegmentedControl.Item value="Klasse 1">1</SegmentedControl.Item>
          <SegmentedControl.Item value="Klasse 2">2</SegmentedControl.Item>
          <SegmentedControl.Item value="Klasse 3">3</SegmentedControl.Item>
          <SegmentedControl.Item value="Klasse 4">4</SegmentedControl.Item>
          <SegmentedControl.Item value="Klasse 5">5</SegmentedControl.Item>
          <SegmentedControl.Item value="Klasse 6">6</SegmentedControl.Item>
        </SegmentedControl.Root>

        <Text className={"absolute left-full translate-x-6"} color={"red"}>
          {einkommenssteuer.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </Text>
      </Flex>
      <Flex
        wrap={"wrap"}
        gap="2"
        align="center"
        justify="between"
        width={"100%"}
      >
        <Label htmlFor="steuerfreibetrag">zusätzl. Steuerfreibetrag</Label>
        <TextField.Root
          type="number"
          id="steuerfreibetrag"
          name="steuerfreibetrag"
          placeholder="dein Steuerfreibetrag"
          value={steuerfreibetragImJahr ? steuerfreibetragImJahr : ""}
          onChange={(e) => setSteuerfreibetragImJahr(Number(e.target.value))}
        >
          <TextField.Slot side={"right"}>€</TextField.Slot>
        </TextField.Root>
      </Flex>
      <Flex
        wrap={"wrap"}
        position={"relative"}
        gap="2"
        align="center"
        justify="between"
        width={"100%"}
      >
        <Label htmlFor="inDerKirche">Bist du in der Kirche?</Label>
        <Switch
          checked={inDerKirche === "ja"}
          onCheckedChange={(e) => setInDerKirche(e ? "ja" : "nein")}
        />
        <Text className={"absolute left-full translate-x-6"} color={"red"}>
          {kirchensteuer.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </Text>
      </Flex>
      {solidaritaetszuschlag > 0 && (
        <Flex
          position={"relative"}
          gap="2"
          align="center"
          justify="between"
          width={"100%"}
        >
          <Flex gap={"2"} align={"center"}>
            <Label htmlFor="steuerklasse">Solidaritätszuschlag</Label>
            <Popover.Root>
              <Popover.Trigger>
                <Button variant="surface">?</Button>
              </Popover.Trigger>
              <Popover.Content>
                <Text color={"red"}>
                  -{((einkommenssteuer / bruttoImJahr) * 100).toFixed(2)}%
                </Text>{" "}
                vom Bruttogehalt
                <br />
                <Text size={"1"}>
                  <Text>
                    {bruttoImJahr.toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </Text>{" "}
                  Brutto
                  <br />
                  <Text color={"green"}>
                    -
                    {grundfreibetrag.toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </Text>{" "}
                  Grundfreibetrag
                  <br />
                  {steuerfreibetragImJahr > 0 ? (
                    <Text color={"green"}>
                      -
                      {steuerfreibetragImJahr.toLocaleString("de-DE", {
                        style: "currency",
                        currency: "EUR",
                      })}{" "}
                      zusätzlicher Steuerfreibetrag
                      <br />
                    </Text>
                  ) : (
                    ""
                  )}
                  <Text weight={"bold"}>
                    {zuVersteuerndesEinkommen.toLocaleString("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </Text>{" "}
                  zu versteuerndes Einkommen
                  <br />
                </Text>
              </Popover.Content>
            </Popover.Root>
          </Flex>

          <Text className={"absolute left-full translate-x-6"} color={"red"}>
            {solidaritaetszuschlag.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
          </Text>
        </Flex>
      )}
      <Separator size={"4"} />
      <Flex
        wrap={"wrap"}
        position={"relative"}
        gap={"2"}
        align={"center"}
        justify={"between"}
        width={"100%"}
      >
        <Text>Dein Nettoeinkommen</Text>
        <Text weight={"bold"}>
          <Text color={netto < 0 ? "red" : "green"}>
            {netto.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
          </Text>
          {" pro "} {getZahlungsintervall(abrechnungszeitraum, gehaelter)}
        </Text>
        <Text
          weight={"bold"}
          className={"absolute left-full translate-x-6"}
          color={netto < 0 ? "red" : "green"}
        >
          {(abrechnungszeitraum === "Monat"
            ? netto * gehaelter
            : netto
          ).toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
        </Text>
      </Flex>
    </Flex>
  );
};
