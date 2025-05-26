"use client";
import { Callout, Flex, Heading, Tabs } from "@radix-ui/themes";
import { InfoCircledIcon, LockClosedIcon, PlusIcon } from "@radix-ui/react-icons";
import { BruttoEingabe } from "@/app/components/BruttoEingabe";
import { WeitereEinkommen } from "@/app/components/WeitereEinkommen";
import { GehaltAnalyse } from "@/app/components/GehaltAnalyse";
import { Empfehlungen } from "@/app/components/Empfehlungen";
import { ProfileSwitch } from "@/app/components/ProfileSwitch";
import { Uebersicht } from "@/app/components/Uebersicht";
import { useState } from "react";
import { Finanzbewegung } from "@/types/finanzbewegung";

export default function Home() {
  const [profileFinanzbewegungen, setProfileFinanzbewegungen] = useState<Finanzbewegung[]>([]);
  const [currentFinanzbewegungen, setCurrentFinanzbewegungen] = useState<Finanzbewegung[]>([]);
  const [isProfileSidebarMinimized, setIsProfileSidebarMinimized] = useState(false);

  const handleLoadProfileFinanzbewegungen = (finanzbewegungen: Finanzbewegung[]) => {
    setProfileFinanzbewegungen(finanzbewegungen);
  };

  const handleCurrentFinanzbewegungChange = (finanzbewegungen: Finanzbewegung[]) => {
    setProfileFinanzbewegungen(finanzbewegungen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1">
        <Flex
          direction={"column"}
          align={"center"}
          className={"p-4 text-center"}
          gap={"4"}
          width={"100%"}
        >
          <Heading size={"7"}>Mehr Netto vom Brutto</Heading>
          <Flex wrap={"wrap"} align={"center"} justify={"center"} gap={"2"}>
            <Callout.Root className={"self-center"}>
              <Callout.Icon>
                <LockClosedIcon />
              </Callout.Icon>
              <Callout.Text>
                Alle Angaben bleiben nur auf deinem Gerät gespeichert.
              </Callout.Text>
            </Callout.Root>
            <Callout.Root color={"orange"} className={"self-center"}>
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                Die Webseite ist seit dem 22.02.2025 in Entwicklung.
              </Callout.Text>
            </Callout.Root>
          </Flex>

          <Tabs.Root className="w-full" defaultValue="uebersicht">
            <Tabs.List>
              <Tabs.Trigger value="uebersicht">Übersicht</Tabs.Trigger>
              <Tabs.Trigger value="brutto">Brutto-Eingabe</Tabs.Trigger>
              <Tabs.Trigger value="weitere">Weitere Einkommen</Tabs.Trigger>
              <Tabs.Trigger value="analyse">Gehalt-Analyse</Tabs.Trigger>
              <Tabs.Trigger value="empfehlungen">Empfehlungen</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="uebersicht">
              <Uebersicht 
                profileFinanzbewegungen={profileFinanzbewegungen}
                onFinanzbewegungChange={handleCurrentFinanzbewegungChange}
                onCurrentFinanzbewegungUpdate={setCurrentFinanzbewegungen}
              />
            </Tabs.Content>

            <Tabs.Content value="brutto">
              <BruttoEingabe />
            </Tabs.Content>

            <Tabs.Content value="weitere">
              <WeitereEinkommen />
            </Tabs.Content>

            <Tabs.Content value="analyse">
              <GehaltAnalyse />
            </Tabs.Content>

            <Tabs.Content value="empfehlungen">
              <Empfehlungen />
            </Tabs.Content>
          </Tabs.Root>
        </Flex>
      </div>

      {/* Floating Profile Sidebar */}
      <div className={`fixed top-4 right-4 transition-all duration-300 ease-in-out z-50 ${
        isProfileSidebarMinimized 
          ? 'w-12 h-12' 
          : 'w-80 max-h-[calc(100vh-2rem)]'
      }`}>
        {isProfileSidebarMinimized ? (
          /* Minimized State - Small floating button */
          <div 
            className="w-12 h-12 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-2xl rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all"
            onClick={() => setIsProfileSidebarMinimized(false)}
            title="Profilverwaltung öffnen"
          >
            <PlusIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        ) : (
          /* Expanded State - Full sidebar */
          <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-2xl rounded-xl overflow-y-auto h-full">
            <div className="p-4">
              <ProfileSwitch 
                currentFinanzbewegungen={currentFinanzbewegungen}
                onLoadFinanzbewegungen={handleLoadProfileFinanzbewegungen}
                onMinimize={() => setIsProfileSidebarMinimized(true)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
