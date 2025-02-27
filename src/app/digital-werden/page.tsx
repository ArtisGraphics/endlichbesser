import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import React from "react";
import Image from "next/image";
import {
  ClockIcon,
  CrumpledPaperIcon,
  FaceIcon,
  FileIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";

export default function Home() {
  return (
    <Flex
      direction={"column"}
      align={"center"}
      className={"py-10 pb-20 text-center"}
      gap={"4"}
    >
      <Flex direction={"column"} gap={"4"} align={"center"} py={"6"}>
        <Heading size={"7"}>Digital werden</Heading>
        <Text>
          Hast du dich schon mal gefragt, wie du digitaler werden kannst?
          <br />
          Jeder aufgelistete Punkt hilft dir ein bestimmtes Problem zu lösen.
        </Text>
      </Flex>
      <Flex
        gap={"9"}
        pt={"9"}
        wrap={"wrap"}
        justify={"center"}
        maxWidth={"1200px"}
        width={"100%"}
      >
        <Flex width={"100%"} gap={"8"} align={"center"}>
          <Flex
            className={"w-full lg:w-1/2"}
            gap={"4"}
            direction={"column"}
            align={"start"}
          >
            <Flex gap={"2"} align={"center"}>
              <Badge>
                <LockClosedIcon />
                Mehr Sicherheit
              </Badge>
              <Badge color={"green"}>
                <ClockIcon />
                Zeit sparen
              </Badge>
            </Flex>
            <Flex align={"center"} gap={"2"}>
              <CrumpledPaperIcon height={20} width={20} />
              <Heading>Keine Zettelwirtschaft mehr</Heading>
            </Flex>
            <Text align={"left"}>
              Auch die Nase voll von etlichen Dokumenten die bei dir postalisch
              eintreffen?
            </Text>
            <Button>Ich will keine Zettel mehr!</Button>
          </Flex>
          <Card className={"w-full lg:w-1/2"}>
            <Image
              alt={""}
              src={"/nettolohn_verbessern.png"}
              width={400}
              height={400}
            />
          </Card>
        </Flex>
        <Separator size={"4"} />
        <Flex
          width={"100%"}
          gap={"8"}
          align={"center"}
          direction={"row-reverse"}
        >
          <Flex
            className={"w-full lg:w-1/2"}
            gap={"4"}
            direction={"column"}
            align={"start"}
          >
            <Flex gap={"2"} align={"center"}>
              <Badge>
                <LockClosedIcon />
                Mehr Sicherheit
              </Badge>
              <Badge color={"green"}>
                <ClockIcon />
                Zeit sparen
              </Badge>
            </Flex>
            <Flex align={"center"} gap={"2"}>
              <LockClosedIcon height={20} width={20} />
              <Heading>Sichere Zugänge</Heading>
            </Flex>
            <Text align={"left"}>
              Nie wieder deine wertvollen Konten verlieren, egal ob durch einen
              Hacker oder eigene Unachtsamkeit und dabei auch noch wertvolle
              Zeit sparen.
            </Text>
            <Button>Zeig mir wie!</Button>
          </Flex>
          <Card className={"w-full lg:w-1/2"}>
            <Image
              alt={""}
              src={"/nettolohn_verbessern.png"}
              width={400}
              height={400}
            />
          </Card>
        </Flex>
        <Separator size={"4"} />
        <Flex width={"100%"} gap={"8"} align={"center"}>
          <Flex
            className={"w-full lg:w-1/2"}
            gap={"4"}
            direction={"column"}
            align={"start"}
          >
            <Flex gap={"2"} align={"center"}>
              <Badge>
                <LockClosedIcon />
                Mehr Sicherheit
              </Badge>
              <Badge color={"green"}>
                <ClockIcon />
                Zeit sparen
              </Badge>
            </Flex>
            <Flex align={"center"} gap={"2"}>
              <FaceIcon height={20} width={20} />
              <Heading>Nicht mehr genervt werden</Heading>
            </Flex>
            <Text align={"left"}>
              Du willst nicht mehr das Opfer von nervigen Werbeanrufen oder Spam
              in deinen Emails sein?
            </Text>
            <Button>Ich will keinen Spam mehr</Button>
          </Flex>
          <Card className={"w-full lg:w-1/2"}>
            <Image
              alt={""}
              src={"/nettolohn_verbessern.png"}
              width={400}
              height={400}
            />
          </Card>
        </Flex>
        <Separator size={"4"} />
        <Flex
          width={"100%"}
          gap={"8"}
          align={"center"}
          direction={"row-reverse"}
        >
          <Flex
            className={"w-full lg:w-1/2"}
            gap={"4"}
            direction={"column"}
            align={"start"}
          >
            <Flex gap={"2"} align={"center"}>
              <Badge>
                <LockClosedIcon />
                Mehr Sicherheit
              </Badge>
            </Flex>
            <Flex align={"center"} gap={"2"}>
              <FileIcon height={20} width={20} />
              <Heading>Dateien schützen & wiederherstellen</Heading>
            </Flex>
            <Text align={"left"}>
              Dein Computer ist voll mit sensiblen Daten, die du nicht jedem
              zeigen möchtest? Oder hast du dein Handy verloren und willst
              nicht, dass jemand deine Daten einsehen kann?
            </Text>
            <Button>Sensible Daten sichern</Button>
          </Flex>
          <Card className={"w-full lg:w-1/2"}>
            <Image
              alt={""}
              src={"/nettolohn_verbessern.png"}
              width={400}
              height={400}
            />
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
}
