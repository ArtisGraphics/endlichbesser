"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Bundesland } from "@/types/bundesland";
import { Steuerklasse } from "@/types/steuerklasse";
import { Abrechnungszeitraum } from "@/types/abrechnungszeitraum";
import { ArbeitslosenversicherungsArt } from "@/types/arbeitslosenversicherungsArt";
import { RentenversicherungsArt } from "@/types/rentenversicherungsArt";
import { KrankenversicherungsArt } from "@/types/krankenversicherungsArt";

interface SalaryContextProps {
  grundfreibetrag: number;
  setGrundfreibetrag: (value: number) => void;
  brutto: number;
  setBrutto: (value: number) => void;
  bruttoImJahr: number;
  setBruttoImJahr: (value: number) => void;
  netto: number;
  setNetto: (value: number) => void;
  abrechnungszeitraum: Abrechnungszeitraum;
  setAbrechnungszeitraum: (value: Abrechnungszeitraum) => void;
  abrechnungsjahr: number;
  setAbrechnungsjahr: (value: number) => void;
  inDerKirche: string;
  setInDerKirche: (value: string) => void;
  bundesland: Bundesland;
  setBundesland: (value: Bundesland) => void;
  bundeslandWasManuallySet: boolean;
  setBundeslandWasManuallySet: (value: boolean) => void;
  alter: number;
  setAlter: (value: number) => void;
  kinder: number;
  setKinder: (value: number) => void;
  gehaelter: number;
  setGehaelter: (value: number) => void;
  wochenstunden: number;
  setWochenstunden: (value: number) => void;
  urlaubstage: number;
  setUrlaubstage: (value: number) => void;
  steuerklasse: Steuerklasse;
  setSteuerklasse: (value: Steuerklasse) => void;

  // Steuerwerte
  kirchensteuerProzent: number;
  setKirchensteuerProzent: (value: number) => void;
  kirchensteuer: number;
  setKirchensteuer: (value: number) => void;
  solidaritaetszuschlag: number;
  setSolidaritaetszuschlag: (value: number) => void;
  steuerfreibetragImJahr: number;
  setSteuerfreibetragImJahr: (value: number) => void;
  entlastungsbetragFuerAlleinerziehende: number;
  setEntlastungsbetragFuerAlleinerziehende: (value: number) => void;
  entlastungsbetragFuerAlleinerziehendeProKind: number;
  setEntlastungsbetragFuerAlleinerziehendeProKind: (value: number) => void;
  zuVersteuerndesEinkommen: number;
  setZuVersteuerndesEinkommen: (value: number) => void;
  einkommenssteuer: number;
  setEinkommenssteuer: (value: number) => void;
  gesamtKostenSteuern: number;
  setGesamtKostenSteuern: (value: number) => void;

  // Sozialversicherung
  beitragsbemessungsgrenzeKrankenversicherungImJahr: number;
  setBeitragsbemessungsgrenzeKrankenversicherungImJahr: (value: number) => void;
  kvZusatzbeitrag: number;
  setKvZusatzbeitrag: (value: number) => void;
  krankenversicherungsArt: KrankenversicherungsArt;
  setKrankenversicherungsArt: (value: KrankenversicherungsArt) => void;
  basisKrankenversicherungProzentsatz: number;
  setBasisKrankenversicherungProzentsatz: (value: number) => void;
  krankenversicherung: number;
  setKrankenversicherung: (value: number) => void;
  privateKVMonatlich: number;
  setPrivateKVMonatlich: (value: number) => void;
  krankenversicherungProzentsatz: number;
  setKrankenversicherungProzentsatz: (value: number) => void;

  beitragsbemessungsgrenzePflegeversicherungImJahr: number;
  setBeitragsbemessungsgrenzePflegeversicherungImJahr: (value: number) => void;
  kinderlosZuschlag: number;
  setKinderlosZuschlag: (value: number) => void;
  sachsenZuschlag: number;
  setSachsenZuschlag: (value: number) => void;
  basisPflegeversicherungProzentsatzAG: number;
  setBasisPflegeversicherungProzentsatzAG: (value: number) => void;
  pflegeversicherungProzentsatzAG: number;
  setPflegeversicherungProzentsatzAG: (value: number) => void;
  basisPflegeversicherungProzentsatzAN: number;
  setBasisPflegeversicherungProzentsatzAN: (value: number) => void;
  pflegeversicherungProzentsatzAN: number;
  setPflegeversicherungProzentsatzAN: (value: number) => void;
  pflegeversicherung: number;
  setPflegeversicherung: (value: number) => void;

  beitragsbemessungsgrenzeRentenversicherungImJahr: number;
  setBeitragsbemessungsgrenzeRentenversicherungImJahr: (value: number) => void;
  rentenversicherungsArt: RentenversicherungsArt;
  setRentenversicherungsArt: (value: RentenversicherungsArt) => void;
  rentenversicherungProzentsatz: number;
  setRentenversicherungProzentsatz: (value: number) => void;
  rentenversicherung: number;
  setRentenversicherung: (value: number) => void;

  beitragsbemessungsgrenzeArbeitslosenversicherungImJahr: number;
  setBeitragsbemessungsgrenzeArbeitslosenversicherungImJahr: (
    value: number,
  ) => void;
  arbeitslosenversicherungsArt: ArbeitslosenversicherungsArt;
  setArbeitslosenversicherungsArt: (
    value: ArbeitslosenversicherungsArt,
  ) => void;
  arbeitslosenversicherungProzentsatz: number;
  setArbeitslosenversicherungProzentsatz: (value: number) => void;
  arbeitslosenversicherung: number;
  setArbeitslosenversicherung: (value: number) => void;

  gesamtKostenSozialversicherung: number;
  setGesamtKostenSozialversicherung: (value: number) => void;
  gesamtAbgaben: number;
  setGesamtAbgaben: (value: number) => void;
  nettoEinkommen: number;
  setNettoEinkommen: (value: number) => void;

  minijobVerdienst: number;
  setMinijobVerdienst: (value: number) => void;

  minijobVerdienstGrenzeImJahr: number;
  setMinijobVerdienstGrenzeImJahr: (value: number) => void;

  kindergeld: number;
  setKindergeld: (value: number) => void;

  kindergeldProKind: number;
  setKindergeldProKind: (value: number) => void;
}

const SalaryContext = createContext<SalaryContextProps | undefined>(undefined);

export const GehaltProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getLocalStorage = (key: string, defaultValue: unknown) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  // States mit lokalen Speicherwerten initialisieren
  const [grundfreibetrag, setGrundfreibetrag] = useState<number>(
    getLocalStorage("grundfreibetrag", 12096),
  );
  const [brutto, setBrutto] = useState<number>(getLocalStorage("brutto", 0));
  const [bruttoImJahr, setBruttoImJahr] = useState<number>(
    getLocalStorage("bruttoImJahr", 0),
  );
  const [netto, setNetto] = useState<number>(getLocalStorage("netto", 0));
  const [abrechnungszeitraum, setAbrechnungszeitraum] =
    useState<Abrechnungszeitraum>(
      getLocalStorage("abrechnungszeitraum", "Monat"),
    );
  const [abrechnungsjahr, setAbrechnungsjahr] = useState<number>(
    getLocalStorage("abrechnungsjahr", 2025),
  );
  const [inDerKirche, setInDerKirche] = useState<string>(
    getLocalStorage("inDerKirche", "nein"),
  );
  const [bundesland, setBundesland] = useState<Bundesland>(
    getLocalStorage("bundesland", "Baden-Württemberg"),
  );
  const [bundeslandWasManuallySet, setBundeslandWasManuallySet] =
    useState<boolean>(getLocalStorage("bundeslandWasManuallySet", false));
  const [alter, setAlter] = useState<number>(getLocalStorage("alter", 25));
  const [kinder, setKinder] = useState<number>(getLocalStorage("kinder", 0));
  const [gehaelter, setGehaelter] = useState<number>(
    getLocalStorage("gehaelter", 12),
  );
  const [wochenstunden, setWochenstunden] = useState<number>(
    getLocalStorage("wochenstunden", 40),
  );
  const [urlaubstage, setUrlaubstage] = useState<number>(
    getLocalStorage("urlaubstage", 24),
  );
  const [steuerklasse, setSteuerklasse] = useState<Steuerklasse>(
    getLocalStorage("steuerklasse", "Klasse 1"),
  );

  const [kirchensteuerProzent, setKirchensteuerProzent] = useState<number>(
    getLocalStorage("kirchensteuerProzent", 8),
  );
  const [kirchensteuer, setKirchensteuer] = useState<number>(
    getLocalStorage("kirchensteuer", 0),
  );
  const [solidaritaetszuschlag, setSolidaritaetszuschlag] = useState<number>(
    getLocalStorage("solidaritaetszuschlag", 0),
  );
  const [
    entlastungsbetragFuerAlleinerziehende,
    setEntlastungsbetragFuerAlleinerziehende,
  ] = useState<number>(
    getLocalStorage("entlastungsbetragFuerAlleinerziehende", 4260),
  );
  const [
    entlastungsbetragFuerAlleinerziehendeProKind,
    setEntlastungsbetragFuerAlleinerziehendeProKind,
  ] = useState<number>(
    getLocalStorage("entlastungsbetragFuerAlleinerziehendeProKind", 240),
  );
  const [steuerfreibetragImJahr, setSteuerfreibetragImJahr] = useState<number>(
    getLocalStorage("steuerfreibetragImJahr", 0),
  );
  const [zuVersteuerndesEinkommen, setZuVersteuerndesEinkommen] =
    useState<number>(getLocalStorage("zuVersteuerndesEinkommen", 0));
  const [einkommenssteuer, setEinkommenssteuer] = useState<number>(
    getLocalStorage("einkommenssteuer", 0),
  );
  const [gesamtKostenSteuern, setGesamtKostenSteuern] = useState<number>(
    getLocalStorage("gesamtKostenSteuern", 0),
  );

  const [
    beitragsbemessungsgrenzeKrankenversicherungImJahr,
    setBeitragsbemessungsgrenzeKrankenversicherungImJahr,
  ] = useState<number>(
    getLocalStorage("beitragsbemessungsgrenzeKrankenversicherungImJahr", 66150),
  );
  const [kvZusatzbeitrag, setKvZusatzbeitrag] = useState<number>(
    getLocalStorage("kvZusatzbeitrag", 2.5),
  );
  const [krankenversicherungsArt, setKrankenversicherungsArt] =
    useState<KrankenversicherungsArt>(
      getLocalStorage("krankenversicherungsArt", "gesetzlich versichert"),
    );
  const [
    basisKrankenversicherungProzentsatz,
    setBasisKrankenversicherungProzentsatz,
  ] = useState<number>(
    getLocalStorage("basisKrankenversicherungProzentsatz", 14.6),
  );
  const [krankenversicherung, setKrankenversicherung] = useState<number>(
    getLocalStorage("krankenversicherung", 0),
  );
  const [privateKVMonatlich, setPrivateKVMonatlich] = useState<number>(
    getLocalStorage("privateKVMonatlich", 200),
  );
  const [krankenversicherungProzentsatz, setKrankenversicherungProzentsatz] =
    useState<number>(getLocalStorage("krankenversicherungProzentsatz", 14.6));

  const [
    beitragsbemessungsgrenzePflegeversicherungImJahr,
    setBeitragsbemessungsgrenzePflegeversicherungImJahr,
  ] = useState<number>(
    getLocalStorage("beitragsbemessungsgrenzePflegeversicherungImJahr", 66150),
  );
  const [kinderlosZuschlag, setKinderlosZuschlag] = useState<number>(
    getLocalStorage("kinderlosZuschlag", 0.6),
  );
  const [sachsenZuschlag, setSachsenZuschlag] = useState<number>(
    getLocalStorage("sachsenZuschlag", 0.5),
  );
  const [
    basisPflegeversicherungProzentsatzAG,
    setBasisPflegeversicherungProzentsatzAG,
  ] = useState<number>(
    getLocalStorage("basisPflegeversicherungProzentsatzAG", 1.8),
  );
  const [pflegeversicherungProzentsatzAG, setPflegeversicherungProzentsatzAG] =
    useState<number>(getLocalStorage("pflegeversicherungProzentsatzAG", 3.05));
  const [
    basisPflegeversicherungProzentsatzAN,
    setBasisPflegeversicherungProzentsatzAN,
  ] = useState<number>(
    getLocalStorage("basisPflegeversicherungProzentsatzAN", 1.8),
  );
  const [pflegeversicherungProzentsatzAN, setPflegeversicherungProzentsatzAN] =
    useState<number>(getLocalStorage("pflegeversicherungProzentsatzAN", 3.05));
  const [pflegeversicherung, setPflegeversicherung] = useState<number>(
    getLocalStorage("pflegeversicherung", 0),
  );

  const [
    beitragsbemessungsgrenzeRentenversicherungImJahr,
    setBeitragsbemessungsgrenzeRentenversicherungImJahr,
  ] = useState<number>(
    getLocalStorage("beitragsbemessungsgrenzeRentenversicherungImJahr", 96600),
  );
  const [rentenversicherungsArt, setRentenversicherungsArt] =
    useState<RentenversicherungsArt>(
      getLocalStorage("rentenversicherungsArt", "gesetzlich versichert"),
    );
  const [rentenversicherungProzentsatz, setRentenversicherungProzentsatz] =
    useState<number>(getLocalStorage("rentenversicherungProzentsatz", 18.6));
  const [rentenversicherung, setRentenversicherung] = useState<number>(
    getLocalStorage("rentenversicherung", 0),
  );

  const [
    beitragsbemessungsgrenzeArbeitslosenversicherungImJahr,
    setBeitragsbemessungsgrenzeArbeitslosenversicherungImJahr,
  ] = useState<number>(
    getLocalStorage(
      "beitragsbemessungsgrenzeArbeitslosenversicherungImJahr",
      96600,
    ),
  );
  const [arbeitslosenversicherungsArt, setArbeitslosenversicherungsArt] =
    useState<ArbeitslosenversicherungsArt>(
      getLocalStorage("arbeitslosenversicherungsArt", "gesetzlich versichert"),
    );
  const [
    arbeitslosenversicherungProzentsatz,
    setArbeitslosenversicherungProzentsatz,
  ] = useState<number>(
    getLocalStorage("arbeitslosenversicherungProzentsatz", 2.6),
  );
  const [arbeitslosenversicherung, setArbeitslosenversicherung] =
    useState<number>(getLocalStorage("arbeitslosenversicherung", 0));

  const [gesamtKostenSozialversicherung, setGesamtKostenSozialversicherung] =
    useState<number>(getLocalStorage("gesamtKostenSozialversicherung", 0));
  const [gesamtAbgaben, setGesamtAbgaben] = useState<number>(
    getLocalStorage("gesamtAbgaben", 0),
  );
  const [nettoEinkommen, setNettoEinkommen] = useState<number>(
    getLocalStorage("nettoEinkommen", 0),
  );

  const [minijobVerdienst, setMinijobVerdienst] = useState<number>(
    getLocalStorage("minijobVerdienst", 0),
  );
  const [minijobVerdienstGrenzeImJahr, setMinijobVerdienstGrenzeImJahr] =
    useState<number>(getLocalStorage("minijobVerdienstGrenzeImJahr", 556 * 12));
  const [kindergeld, setKindergeld] = useState<number>(
    getLocalStorage("kindergeld", 0),
  );
  const [kindergeldProKind, setKindergeldProKind] = useState<number>(
    getLocalStorage("kindergeldProKind", 255),
  );

  // Automatische Speicherung in localStorage
  useEffect(() => {
    const data = {
      grundfreibetrag,
      brutto,
      bruttoImJahr,
      netto,
      nettoEinkommen,
      steuerklasse,
      gesamtAbgaben,
      abrechnungszeitraum,
      inDerKirche,
      bundesland,
      bundeslandWasManuallySet,
      alter,
      kinder,
      gehaelter,
      wochenstunden,
      urlaubstage,
      kirchensteuerProzent,
      kirchensteuer,
      solidaritaetszuschlag,
      steuerfreibetragImJahr,
      entlastungsbetragFuerAlleinerziehende,
      entlastungsbetragFuerAlleinerziehendeProKind,
      zuVersteuerndesEinkommen,
      einkommenssteuer,
      gesamtKostenSteuern,
      basisKrankenversicherungProzentsatz,
      beitragsbemessungsgrenzeKrankenversicherungImJahr,
      kvZusatzbeitrag,
      krankenversicherungsArt,
      krankenversicherung,
      privateKVMonatlich,
      krankenversicherungProzentsatz,
      beitragsbemessungsgrenzePflegeversicherungImJahr,
      kinderlosZuschlag,
      sachsenZuschlag,
      basisPflegeversicherungProzentsatzAG,
      pflegeversicherungProzentsatzAG,
      basisPflegeversicherungProzentsatzAN,
      pflegeversicherungProzentsatzAN,
      pflegeversicherung,
      beitragsbemessungsgrenzeRentenversicherungImJahr,
      rentenversicherungProzentsatz,
      rentenversicherungsArt,
      rentenversicherung,
      beitragsbemessungsgrenzeArbeitslosenversicherungImJahr,
      arbeitslosenversicherungProzentsatz,
      arbeitslosenversicherungsArt,
      arbeitslosenversicherung,
      gesamtKostenSozialversicherung,
      minijobVerdienst,
      minijobVerdienstGrenzeImJahr,
      kindergeld,
      kindergeldProKind,
    };
    Object.entries(data).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }, [
    brutto,
    kirchensteuer,
    gesamtAbgaben,
    nettoEinkommen,
    bruttoImJahr,
    netto,
    steuerklasse,
    abrechnungszeitraum,
    inDerKirche,
    bundesland,
    bundeslandWasManuallySet,
    alter,
    kinder,
    gehaelter,
    kirchensteuerProzent,
    solidaritaetszuschlag,
    steuerfreibetragImJahr,
    zuVersteuerndesEinkommen,
    einkommenssteuer,
    gesamtKostenSteuern,
    basisKrankenversicherungProzentsatz,
    beitragsbemessungsgrenzeKrankenversicherungImJahr,
    kvZusatzbeitrag,
    krankenversicherungsArt,
    krankenversicherung,
    privateKVMonatlich,
    krankenversicherungProzentsatz,
    beitragsbemessungsgrenzePflegeversicherungImJahr,
    kinderlosZuschlag,
    sachsenZuschlag,
    basisPflegeversicherungProzentsatzAG,
    pflegeversicherungProzentsatzAG,
    basisPflegeversicherungProzentsatzAN,
    pflegeversicherungProzentsatzAN,
    pflegeversicherung,
    beitragsbemessungsgrenzeRentenversicherungImJahr,
    rentenversicherungProzentsatz,
    rentenversicherungsArt,
    rentenversicherung,
    beitragsbemessungsgrenzeArbeitslosenversicherungImJahr,
    arbeitslosenversicherung,
    gesamtKostenSozialversicherung,
    arbeitslosenversicherungsArt,
    arbeitslosenversicherungProzentsatz,
    grundfreibetrag,
    entlastungsbetragFuerAlleinerziehende,
    entlastungsbetragFuerAlleinerziehendeProKind,
    minijobVerdienst,
    kindergeld,
    minijobVerdienstGrenzeImJahr,
    kindergeldProKind,
    wochenstunden,
    urlaubstage,
  ]);

  return (
    <SalaryContext.Provider
      value={{
        grundfreibetrag,
        setGrundfreibetrag,
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
        abrechnungsjahr,
        setAbrechnungsjahr,
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
        wochenstunden,
        setWochenstunden,
        urlaubstage,
        setUrlaubstage,
        kirchensteuerProzent,
        setKirchensteuerProzent,
        kirchensteuer,
        setKirchensteuer,
        solidaritaetszuschlag,
        setSolidaritaetszuschlag,
        steuerfreibetragImJahr,
        setSteuerfreibetragImJahr,
        entlastungsbetragFuerAlleinerziehende,
        setEntlastungsbetragFuerAlleinerziehende,
        entlastungsbetragFuerAlleinerziehendeProKind,
        setEntlastungsbetragFuerAlleinerziehendeProKind,
        zuVersteuerndesEinkommen,
        setZuVersteuerndesEinkommen,
        einkommenssteuer,
        setEinkommenssteuer,
        gesamtKostenSteuern,
        setGesamtKostenSteuern,
        basisKrankenversicherungProzentsatz,
        setBasisKrankenversicherungProzentsatz,
        beitragsbemessungsgrenzeKrankenversicherungImJahr,
        setBeitragsbemessungsgrenzeKrankenversicherungImJahr,
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
        setBeitragsbemessungsgrenzePflegeversicherungImJahr,
        kinderlosZuschlag,
        setKinderlosZuschlag,
        sachsenZuschlag,
        setSachsenZuschlag,
        basisPflegeversicherungProzentsatzAG,
        setBasisPflegeversicherungProzentsatzAG,
        pflegeversicherungProzentsatzAG,
        setPflegeversicherungProzentsatzAG,
        basisPflegeversicherungProzentsatzAN,
        setBasisPflegeversicherungProzentsatzAN,
        pflegeversicherungProzentsatzAN,
        setPflegeversicherungProzentsatzAN,
        pflegeversicherung,
        setPflegeversicherung,
        beitragsbemessungsgrenzeRentenversicherungImJahr,
        setBeitragsbemessungsgrenzeRentenversicherungImJahr,
        rentenversicherungsArt,
        setRentenversicherungsArt,
        rentenversicherungProzentsatz,
        setRentenversicherungProzentsatz,
        rentenversicherung,
        setRentenversicherung,
        beitragsbemessungsgrenzeArbeitslosenversicherungImJahr,
        setBeitragsbemessungsgrenzeArbeitslosenversicherungImJahr,
        arbeitslosenversicherungsArt,
        setArbeitslosenversicherungsArt,
        arbeitslosenversicherungProzentsatz,
        setArbeitslosenversicherungProzentsatz,
        arbeitslosenversicherung,
        setArbeitslosenversicherung,
        gesamtKostenSozialversicherung,
        setGesamtKostenSozialversicherung,
        minijobVerdienst,
        setMinijobVerdienst,
        minijobVerdienstGrenzeImJahr,
        setMinijobVerdienstGrenzeImJahr,
        kindergeld,
        setKindergeld,
        kindergeldProKind,
        setKindergeldProKind,
      }}
    >
      {children}
    </SalaryContext.Provider>
  );
};

export const useSalary = () => {
  const context = useContext(SalaryContext);
  if (!context)
    throw new Error("useSalary must be used within a SalaryProvider");
  return context;
};
