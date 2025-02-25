"use client";

import { useProfile } from "@/contexts/ProfileProvider";
import { useState } from "react";
import { useSalary } from "@/contexts/GehaltProvider";
import { Button, Flex, RadioCards, TextField } from "@radix-ui/themes";

export const ProfileSwitch = () => {
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

  const { profiles, saveProfile, loadProfile, deleteProfile } = useProfile();
  const [profileName, setProfileName] = useState("");

  const handleSaveProfile = () => {
    const settings = {
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
      alter,
      kinder,
      gehaelter,
      urlaubstage,
      wochenstunden,
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
    };
    saveProfile(profileName, settings);
  };

  const handleDeleteProfile = () => {
    deleteProfile(profileName);
  };

  const handleLoadProfile = (name: string) => {
    const settings = loadProfile(name);
    if (settings) {
      setProfileName(name);
      setBrutto(settings.brutto);
      setBruttoImJahr(settings.bruttoImJahr);
      setNetto(settings.netto);
      setNettoEinkommen(settings.nettoEinkommen);
      setSteuerklasse(settings.steuerklasse);
      setGesamtAbgaben(settings.gesamtAbgaben);
      setAbrechnungszeitraum(settings.abrechnungszeitraum);
      setInDerKirche(settings.inDerKirche);
      setBundesland(settings.bundesland);
      setAlter(settings.alter);
      setKinder(settings.kinder);
      setGehaelter(settings.gehaelter);
      setUrlaubstage(settings.urlaubstage);
      setWochenstunden(settings.wochenstunden);
      setKirchensteuerProzent(settings.kirchensteuerProzent);
      setKirchensteuer(settings.kirchensteuer);
      setSolidaritaetszuschlag(settings.solidaritaetszuschlag);
      setSteuerfreibetragImJahr(settings.steuerfreibetragImJahr);
      setZuVersteuerndesEinkommen(settings.zuVersteuerndesEinkommen);
      setEinkommenssteuer(settings.einkommenssteuer);
      setGesamtKostenSteuern(settings.gesamtKostenSteuern);
      setKvZusatzbeitrag(settings.kvZusatzbeitrag);
      setKrankenversicherungsArt(settings.krankenversicherungsArt);
      setKrankenversicherung(settings.krankenversicherung);
      setPrivateKVMonatlich(settings.privateKVMonatlich);
      setKrankenversicherungProzentsatz(
        settings.krankenversicherungProzentsatz,
      );
      setPflegeversicherungProzentsatzAG(
        settings.pflegeversicherungProzentsatzAG,
      );
      setPflegeversicherungProzentsatzAN(
        settings.pflegeversicherungProzentsatzAN,
      );
      setPflegeversicherung(settings.pflegeversicherung);
      setRentenversicherungsArt(settings.rentenversicherungsArt);
      setRentenversicherung(settings.rentenversicherung);
      setArbeitslosenversicherungsArt(settings.arbeitslosenversicherungsArt);
      setArbeitslosenversicherung(settings.arbeitslosenversicherung);
      setGesamtKostenSozialversicherung(
        settings.gesamtKostenSozialversicherung,
      );
    }
  };

  return (
    <Flex
      position={"relative"}
      direction="column"
      gap="2"
      pl={"1"}
      align={"start"}
    >
      {/* Existing UI elements */}
      <Flex gap="2" align="center">
        <TextField.Root
          type="text"
          placeholder="Profil Name"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
        />
        <Button onClick={handleSaveProfile}>Profil speichern</Button>
        <Button onClick={handleDeleteProfile} color={"red"}>
          Profil löschen
        </Button>
      </Flex>
      <RadioCards.Root defaultValue="1" columns={{ initial: "1", sm: "3" }}>
        {profiles.map((profile) => (
          <RadioCards.Item
            onClick={() => handleLoadProfile(profile.name)}
            key={profile.name}
            value={profile.name}
          >
            {profile.name}
          </RadioCards.Item>
        ))}
      </RadioCards.Root>
    </Flex>
  );
};
