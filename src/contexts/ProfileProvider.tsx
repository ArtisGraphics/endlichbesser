"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Steuerklasse } from "@/types/steuerklasse";
import { Abrechnungszeitraum } from "@/types/abrechnungszeitraum";
import { Bundesland } from "@/types/bundesland";
import { KrankenversicherungsArt } from "@/types/krankenversicherungsArt";
import { RentenversicherungsArt } from "@/types/rentenversicherungsArt";
import { ArbeitslosenversicherungsArt } from "@/types/arbeitslosenversicherungsArt";
import { Finanzbewegung } from "@/types/finanzbewegung";

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
  finanzbewegungen: Finanzbewegung[];
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
  // Load profiles from localStorage on initialization
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("profiles");
        if (stored) {
          const parsed = JSON.parse(stored);
          // Handle Date objects in finanzbewegungen
          return parsed.map((profile: any) => ({
            ...profile,
            settings: {
              ...profile.settings,
              finanzbewegungen: profile.settings.finanzbewegungen?.map((item: any) => ({
                ...item,
                startDate: item.startDate ? new Date(item.startDate) : undefined,
                endDate: item.endDate ? new Date(item.endDate) : undefined,
              })) || []
            }
          }));
        }
      } catch (error) {
        console.warn("Error loading profiles from localStorage:", error);
      }
    }
    return [];
  });
  
  const [currentProfile, setCurrentProfile] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("currentProfile");
    }
    return null;
  });

  // Save profiles to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("profiles", JSON.stringify(profiles));
    }
  }, [profiles]);

  // Save current profile to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (currentProfile) {
        localStorage.setItem("currentProfile", currentProfile);
      } else {
        localStorage.removeItem("currentProfile");
      }
    }
  }, [currentProfile]);

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
    // If we're deleting the current profile, clear it
    if (currentProfile === name) {
      setCurrentProfile(null);
    }
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
