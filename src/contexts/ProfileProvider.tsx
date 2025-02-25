"use client";

import React, { createContext, useContext, useState } from "react";
import { Steuerklasse } from "@/types/steuerklasse";
import { Abrechnungszeitraum } from "@/types/abrechnungszeitraum";
import { Bundesland } from "@/types/bundesland";
import { KrankenversicherungsArt } from "@/types/krankenversicherungsArt";
import { RentenversicherungsArt } from "@/types/rentenversicherungsArt";
import { ArbeitslosenversicherungsArt } from "@/types/arbeitslosenversicherungsArt";

interface ProfileSettings {
  grundfreibetrag: number;
  brutto: number;
  bruttoImJahr: number;
  netto: number;
  nettoEinkommen: number;
  steuerklasse: Steuerklasse;
  gesamtAbgaben: number;
  abrechnungszeitraum: Abrechnungszeitraum;
  inDerKirche: string;
  bundesland: Bundesland;
  alter: number;
  kinder: number;
  gehaelter: number;
  urlaubstage: number;
  wochenstunden: number;
  kirchensteuerProzent: number;
  kirchensteuer: number;
  solidaritaetszuschlag: number;
  steuerfreibetragImJahr: number;
  entlastungsbetragFuerAlleinerziehende: number;
  entlastungsbetragFuerAlleinerziehendeProKind: number;
  zuVersteuerndesEinkommen: number;
  einkommenssteuer: number;
  gesamtKostenSteuern: number;
  basisKrankenversicherungProzentsatz: number;
  beitragsbemessungsgrenzeKrankenversicherungImJahr: number;
  kvZusatzbeitrag: number;
  krankenversicherungsArt: KrankenversicherungsArt;
  krankenversicherung: number;
  privateKVMonatlich: number;
  krankenversicherungProzentsatz: number;
  beitragsbemessungsgrenzePflegeversicherungImJahr: number;
  kinderlosZuschlag: number;
  sachsenZuschlag: number;
  basisPflegeversicherungProzentsatzAG: number;
  pflegeversicherungProzentsatzAG: number;
  basisPflegeversicherungProzentsatzAN: number;
  pflegeversicherungProzentsatzAN: number;
  pflegeversicherung: number;
  beitragsbemessungsgrenzeRentenversicherungImJahr: number;
  rentenversicherungProzentsatz: number;
  rentenversicherungsArt: RentenversicherungsArt;
  rentenversicherung: number;
  beitragsbemessungsgrenzeArbeitslosenversicherungImJahr: number;
  arbeitslosenversicherungProzentsatz: number;
  arbeitslosenversicherungsArt: ArbeitslosenversicherungsArt;
  arbeitslosenversicherung: number;
  gesamtKostenSozialversicherung: number;
}

interface Profile {
  name: string;
  settings: ProfileSettings; // Adjust the type according to your settings structure
}

interface ProfileContextType {
  profiles: Profile[];
  saveProfile: (name: string, settings: ProfileSettings) => void;
  loadProfile: (name: string) => ProfileSettings | undefined;
  switchProfile: (name: string) => void;
  deleteProfile: (name: string) => void;
  currentProfile: string | null;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<string | null>(null);

  const saveProfile = (name: string, settings: ProfileSettings) => {
    setProfiles((prevProfiles) => {
      const existingProfileIndex = prevProfiles.findIndex(
        (profile) => profile.name === name,
      );
      if (existingProfileIndex !== -1) {
        const updatedProfiles = [...prevProfiles];
        updatedProfiles[existingProfileIndex] = { name, settings };
        return updatedProfiles;
      }
      return [...prevProfiles, { name, settings }];
    });
  };

  const deleteProfile = (name: string) => {
    setProfiles((prevProfiles) => {
      return prevProfiles.filter((x) => x.name !== name);
    });
  };

  const loadProfile = (name: string) => {
    const profile = profiles.find((profile) => profile.name === name);
    return profile ? profile.settings : undefined;
  };

  const switchProfile = (name: string) => {
    setCurrentProfile(name);
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        saveProfile,
        loadProfile,
        switchProfile,
        deleteProfile,
        currentProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
