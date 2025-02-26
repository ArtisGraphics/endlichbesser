"use client";
import { Callout, Flex, Heading, Tabs } from "@radix-ui/themes";
import { InfoCircledIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { BruttoEingabe } from "@/app/components/BruttoEingabe";
import { WeitereEinkommen } from "@/app/components/WeitereEinkommen";
import { ProfileSwitch } from "@/app/components/ProfileSwitch";
import { GehaltAnalyse } from "@/app/components/GehaltAnalyse";
import { Empfehlungen } from "@/app/components/Empfehlungen";

export default function Home() {
  return (
    <Flex
      direction={"column"}
      align={"center"}
      className={"p-4 text-center"}
      gap={"4"}
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

      <Flex direction={"column"} width={"100%"} gap={"8"} maxWidth={"1200px"}>
        <Tabs.Root defaultValue="1">
          <Tabs.List>
            <Tabs.Trigger value="1">1. Deine Angaben</Tabs.Trigger>
            <Tabs.Trigger value="2">2. Analyse</Tabs.Trigger>
            <Tabs.Trigger value="3">3. Empfehlungen</Tabs.Trigger>
          </Tabs.List>

          <Flex width={"100%"} pt="3">
            <Tabs.Content className={"w-full"} value="1">
              <Flex
                gap={"4"}
                wrap={"wrap"}
                className={"w-full"}
                justify={"between"}
              >
                <Flex
                  className={"w-full lg:w-1/2"}
                  direction={"column"}
                  gap={"8"}
                >
                  <BruttoEingabe />
                  <WeitereEinkommen />
                </Flex>
                <ProfileSwitch />
              </Flex>
            </Tabs.Content>

            <Tabs.Content className={"w-full"} value="2">
              <GehaltAnalyse />
            </Tabs.Content>

            <Tabs.Content className={"w-full"} value="3">
              <Empfehlungen />
            </Tabs.Content>
          </Flex>
        </Tabs.Root>
      </Flex>
    </Flex>
  );
}
