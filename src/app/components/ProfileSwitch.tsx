"use client";

import { useProfile } from "@/contexts/ProfileProvider";
import { useState, useEffect, useMemo } from "react";
import { useSalary } from "@/contexts/GehaltProvider";
import { Button, Flex, RadioCards, TextField, Card, Heading, Text, Box } from "@radix-ui/themes";
import { Finanzbewegung } from "@/types/finanzbewegung";
import { Pencil1Icon, CopyIcon, CrossCircledIcon, PlusIcon, ExclamationTriangleIcon, MinusIcon } from "@radix-ui/react-icons";

interface ProfileSwitchProps {
  currentFinanzbewegungen?: Finanzbewegung[];
  onLoadFinanzbewegungen?: (finanzbewegungen: Finanzbewegung[]) => void;
  onMinimize?: () => void;
}

export const ProfileSwitch = ({ currentFinanzbewegungen = [], onLoadFinanzbewegungen, onMinimize }: ProfileSwitchProps) => {
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

  const { profiles, saveProfile, loadProfile, deleteProfile, switchProfile, currentProfile } = useProfile();
  const [profileName, setProfileName] = useState("");
  const [editingProfile, setEditingProfile] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  // Get current settings for comparison
  const currentSettings = useMemo(() => ({
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
    finanzbewegungen: currentFinanzbewegungen,
  }), [
    grundfreibetrag, brutto, bruttoImJahr, netto, nettoEinkommen, steuerklasse, gesamtAbgaben,
    abrechnungszeitraum, inDerKirche, bundesland, alter, kinder, gehaelter, urlaubstage,
    wochenstunden, kirchensteuerProzent, kirchensteuer, solidaritaetszuschlag, steuerfreibetragImJahr,
    entlastungsbetragFuerAlleinerziehende, entlastungsbetragFuerAlleinerziehendeProKind,
    zuVersteuerndesEinkommen, einkommenssteuer, gesamtKostenSteuern, basisKrankenversicherungProzentsatz,
    beitragsbemessungsgrenzeKrankenversicherungImJahr, kvZusatzbeitrag, krankenversicherungsArt,
    krankenversicherung, privateKVMonatlich, krankenversicherungProzentsatz,
    beitragsbemessungsgrenzePflegeversicherungImJahr, kinderlosZuschlag, sachsenZuschlag,
    basisPflegeversicherungProzentsatzAG, pflegeversicherungProzentsatzAG, basisPflegeversicherungProzentsatzAN,
    pflegeversicherungProzentsatzAN, pflegeversicherung, beitragsbemessungsgrenzeRentenversicherungImJahr,
    rentenversicherungProzentsatz, rentenversicherungsArt, rentenversicherung,
    beitragsbemessungsgrenzeArbeitslosenversicherungImJahr, arbeitslosenversicherungProzentsatz,
    arbeitslosenversicherungsArt, arbeitslosenversicherung, gesamtKostenSozialversicherung,
    currentFinanzbewegungen
  ]);

  // Check if current profile is out of sync
  const isProfileOutOfSync = useMemo(() => {
    if (!currentProfile) return false;
    
    const profile = profiles.find(p => p.name === currentProfile);
    if (!profile) return false;

    // Deep comparison of settings
    const profileSettings = profile.settings;
    
    // Compare all relevant fields with type-safe access
    if (profileSettings.brutto !== currentSettings.brutto ||
        profileSettings.bruttoImJahr !== currentSettings.bruttoImJahr ||
        profileSettings.netto !== currentSettings.netto ||
        profileSettings.nettoEinkommen !== currentSettings.nettoEinkommen ||
        profileSettings.steuerklasse !== currentSettings.steuerklasse ||
        profileSettings.gesamtAbgaben !== currentSettings.gesamtAbgaben ||
        profileSettings.abrechnungszeitraum !== currentSettings.abrechnungszeitraum ||
        profileSettings.inDerKirche !== currentSettings.inDerKirche ||
        profileSettings.bundesland !== currentSettings.bundesland ||
        profileSettings.alter !== currentSettings.alter ||
        profileSettings.kinder !== currentSettings.kinder ||
        profileSettings.gehaelter !== currentSettings.gehaelter ||
        profileSettings.urlaubstage !== currentSettings.urlaubstage ||
        profileSettings.wochenstunden !== currentSettings.wochenstunden ||
        profileSettings.kirchensteuerProzent !== currentSettings.kirchensteuerProzent ||
        profileSettings.kirchensteuer !== currentSettings.kirchensteuer ||
        profileSettings.solidaritaetszuschlag !== currentSettings.solidaritaetszuschlag ||
        profileSettings.steuerfreibetragImJahr !== currentSettings.steuerfreibetragImJahr ||
        profileSettings.zuVersteuerndesEinkommen !== currentSettings.zuVersteuerndesEinkommen ||
        profileSettings.einkommenssteuer !== currentSettings.einkommenssteuer ||
        profileSettings.gesamtKostenSteuern !== currentSettings.gesamtKostenSteuern ||
        profileSettings.kvZusatzbeitrag !== currentSettings.kvZusatzbeitrag ||
        profileSettings.krankenversicherungsArt !== currentSettings.krankenversicherungsArt ||
        profileSettings.krankenversicherung !== currentSettings.krankenversicherung ||
        profileSettings.privateKVMonatlich !== currentSettings.privateKVMonatlich ||
        profileSettings.krankenversicherungProzentsatz !== currentSettings.krankenversicherungProzentsatz ||
        profileSettings.pflegeversicherungProzentsatzAG !== currentSettings.pflegeversicherungProzentsatzAG ||
        profileSettings.pflegeversicherungProzentsatzAN !== currentSettings.pflegeversicherungProzentsatzAN ||
        profileSettings.pflegeversicherung !== currentSettings.pflegeversicherung ||
        profileSettings.rentenversicherungsArt !== currentSettings.rentenversicherungsArt ||
        profileSettings.rentenversicherung !== currentSettings.rentenversicherung ||
        profileSettings.arbeitslosenversicherungsArt !== currentSettings.arbeitslosenversicherungsArt ||
        profileSettings.arbeitslosenversicherung !== currentSettings.arbeitslosenversicherung ||
        profileSettings.gesamtKostenSozialversicherung !== currentSettings.gesamtKostenSozialversicherung) {
      return true;
    }

    // Compare financial movements
    const profileMovements = profileSettings.finanzbewegungen || [];
    const currentMovements = currentFinanzbewegungen || [];
    
    if (profileMovements.length !== currentMovements.length) {
      return true;
    }

    for (let i = 0; i < profileMovements.length; i++) {
      const profileMovement = profileMovements[i];
      const currentMovement = currentMovements[i];
      
      if (profileMovement.title !== currentMovement.title ||
          profileMovement.menge !== currentMovement.menge ||
          profileMovement.interval !== currentMovement.interval) {
        return true;
      }
    }

    return false;
  }, [currentProfile, profiles, currentSettings, currentFinanzbewegungen]);

  const handleSaveProfile = () => {
    if (!profileName.trim()) {
      alert("Bitte geben Sie einen Profilnamen ein.");
      return;
    }

    saveProfile(profileName, currentSettings);
    switchProfile(profileName);
    setProfileName("");
    alert(`Profil "${profileName}" wurde erfolgreich gespeichert!`);
  };

  const handleUpdateCurrentProfile = () => {
    if (!currentProfile) return;
    
    saveProfile(currentProfile, currentSettings);
    alert(`Profil "${currentProfile}" wurde aktualisiert!`);
  };

  const handleDeleteProfile = (name: string) => {
    if (confirm(`Möchten Sie das Profil "${name}" wirklich löschen?`)) {
      deleteProfile(name);
      alert(`Profil "${name}" wurde gelöscht.`);
    }
  };

  const handleEditProfile = (name: string) => {
    setEditingProfile(name);
    setEditingName(name);
  };

  const handleSaveEdit = () => {
    if (!editingName.trim()) {
      alert("Bitte geben Sie einen Profilnamen ein.");
      return;
    }

    if (editingProfile && editingName !== editingProfile) {
      const profile = profiles.find(p => p.name === editingProfile);
      if (profile) {
        // Delete old profile and save with new name
        deleteProfile(editingProfile);
        saveProfile(editingName, profile.settings);
        switchProfile(editingName);
      }
    }
    
    setEditingProfile(null);
    setEditingName("");
  };

  const handleCancelEdit = () => {
    setEditingProfile(null);
    setEditingName("");
  };

  const handleDuplicateProfile = (name: string) => {
    const profile = profiles.find(p => p.name === name);
    if (profile) {
      const newName = `${name} (Kopie)`;
      saveProfile(newName, profile.settings);
      alert(`Profil "${newName}" wurde erstellt.`);
    }
  };

  const handleLoadProfile = (name: string) => {
    const settings = loadProfile(name);
    if (settings) {
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
      
      // Load financial movements if callback is provided
      if (onLoadFinanzbewegungen && settings.finanzbewegungen) {
        onLoadFinanzbewegungen(settings.finanzbewegungen);
      }
      
      switchProfile(name);
      alert(`Profil "${name}" wurde erfolgreich geladen!`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Flex align="center" justify="between" gap="2">
        <Flex align="center" gap="2">
          <PlusIcon className="w-5 h-5 text-blue-600" />
          <Heading size="4" className="text-blue-800 dark:text-blue-200">
            Profile verwalten
          </Heading>
        </Flex>
        {onMinimize && (
          <Button 
            onClick={onMinimize}
            variant="ghost" 
            size="1" 
            title="Minimieren"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <MinusIcon className="w-4 h-4" />
          </Button>
        )}
      </Flex>

      {/* Out of Sync Warning */}
      {isProfileOutOfSync && currentProfile && (
        <Box className="p-3 bg-orange-500/20 dark:bg-orange-400/20 backdrop-blur-sm border border-orange-300/40 dark:border-orange-600/40 rounded-lg">
          <Flex direction="column" gap="2">
            <Flex align="center" gap="2">
              <ExclamationTriangleIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <Text size="2" weight="medium" className="text-orange-700 dark:text-orange-300">
                Profil nicht synchron
              </Text>
            </Flex>
            <Text size="1" className="text-orange-600 dark:text-orange-400">
              Das Profil "{currentProfile}" entspricht nicht mehr dem aktuellen Zustand.
            </Text>
            <Flex gap="2" mt="1">
              <Button 
                onClick={handleUpdateCurrentProfile} 
                color="orange" 
                size="1"
                variant="soft"
              >
                Profil aktualisieren
              </Button>
            </Flex>
          </Flex>
        </Box>
      )}

      {/* Create New Profile */}
        <Flex direction="column" gap="2">
          <Text size="2" weight="medium" className="text-blue-700 dark:text-blue-300">
            Neues Profil erstellen
          </Text>
          <Flex gap="2" align="center">
            <TextField.Root
              type="text"
              placeholder="Profil Name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              style={{ flex: 1 }}
              size="2"
            />
            <Button onClick={handleSaveProfile} color="blue" size="2">
              Speichern
            </Button>
          </Flex>
        </Flex>
        
        {/* Profile List */}
        {profiles.length > 0 ? (
          <Flex direction="column" gap="2">
            <Text size="2" weight="medium" className="text-gray-700 dark:text-gray-300">
              Gespeicherte Profile ({profiles.length})
            </Text>
            <Flex direction="column" gap="2" style={{ maxHeight: "400px", overflowY: "auto" }}>
              {profiles.map((profile) => (
                <div 
                  key={profile.name}
                  className={`p-4 selection-none transition-all hover:shadow-lg backdrop-blur-sm border ${
                    currentProfile === profile.name 
                      ? 'ring-2 ring-blue-400/60 border-blue-300/50 dark:border-blue-600/50 bg-blue-500/20 dark:bg-blue-400/20' 
                      : 'border-white/30 dark:border-gray-600/30 hover:border-white/50 dark:hover:border-gray-500/50 bg-white/10 dark:bg-gray-900/10 hover:bg-white/20 dark:hover:bg-gray-800/20'
                  }`}
                >
                  {editingProfile === profile.name ? (
                    <Flex direction="column" gap="1">
                      <TextField.Root
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        size="2"
                      />
                      <Flex gap="1" justify="end">
                        <Button onClick={handleSaveEdit} color="green" size="1">
                          Speichern
                        </Button>
                        <Button onClick={handleCancelEdit} color="gray" size="1">
                          Abbrechen
                        </Button>
                      </Flex>
                    </Flex>
                  ) : (
                    <Flex direction="column" gap="2">
                      <Flex justify="between" align="center">
                        <Flex align="center" gap="2">
                          <Text 
                            size="3" 
                            weight="medium" 
                            className="cursor-pointer"
                            onClick={() => handleLoadProfile(profile.name)}
                          >
                            {profile.name}
                          </Text>
                          {currentProfile === profile.name && isProfileOutOfSync && (
                            <div title="Nicht synchron">
                              <ExclamationTriangleIcon className="w-3 h-3 text-orange-500" />
                            </div>
                          )}
                        </Flex>
                        <Flex gap="1">
                          <Button 
                            onClick={() => handleEditProfile(profile.name)} 
                            variant="surface" 
                            color="blue" 
                            size="1" 
                            title="Bearbeiten"
                          >
                            <Pencil1Icon />
                          </Button>
                          <Button 
                            onClick={() => handleDuplicateProfile(profile.name)} 
                            variant="surface" 
                            color="green" 
                            size="1" 
                            title="Duplizieren"
                          >
                            <CopyIcon />
                          </Button>
                          <Button 
                            onClick={() => handleDeleteProfile(profile.name)} 
                            variant="surface" 
                            color="red" 
                            size="1" 
                            title="Löschen"
                          >
                            <CrossCircledIcon />
                          </Button>
                        </Flex>
                      </Flex>
                      <Flex justify="between" align="center">
                        <Text size="1" className="text-gray-500 dark:text-gray-400">
                          {profile.settings.finanzbewegungen?.length || 0} Bewegungen
                        </Text>
                        <Button 
                          onClick={() => handleLoadProfile(profile.name)}
                          variant="soft"
                          color="blue"
                          size="1"
                        >
                          Laden
                        </Button>
                      </Flex>
                    </Flex>
                  )}
                </div>
              ))}
            </Flex>
          </Flex>
        ) : (
          <Box className="text-center py-4 text-gray-500 dark:text-gray-400">
            <Text size="2">Noch keine Profile gespeichert</Text>
          </Box>
        )}
    </div>
  );
};
