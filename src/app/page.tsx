import { Button, Card, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function Home() {
  return (
    <Flex
      direction={"column"}
      align={"center"}
      justify={"center"}
      className={"p-4 h-full text-center"}
      gap={"8"}
    >
      <Heading as={"h1"} className={"text-4xl lg:text-6xl!"}>
        Eine Webseite, die dir hilft
        <br /> dein Leben zu meistern.
      </Heading>
      <Flex wrap={"wrap"} align={"center"} justify={"center"} gap={"2"}>
        <Link href={"/mehr-netto-vom-brutto"}>
          <Button size={"4"} variant={"solid"}>
            Netto optimieren
          </Button>
        </Link>
      </Flex>
      <Flex
        align={"center"}
        className={"flex-col lg:flex-row"}
        gap={"4"}
        width={"100%"}
        maxWidth={"1200px"}
      >
        <Card className={"flex! p-6! flex-col w-full gap-4"}>
          <Heading as={"h2"} size={"6"}>
            Netto berechnen
          </Heading>
          <Image
            src={"/nettolohn_berechnen.png"}
            width={400}
            height={400}
            alt={""}
          />

          <Text>
            Es war noch nie einfacher sein Nettolohn zu berechnen. Der modernste
            Brutto-Netto-Rechner ist super leicht zu bedienen.
          </Text>
        </Card>
        <ArrowRightIcon className={"w-[60px]"} />
        <Card className={"flex! p-6! flex-col w-full h-full gap-4"}>
          <Heading as={"h2"} size={"6"}>
            Netto analysieren
          </Heading>
          <Image
            src={"/nettolohn_analysieren.png"}
            width={400}
            height={400}
            alt={""}
          />
          <Text>
            Nach der Berechnung kannst du dir anschauen wie hoch dein effektiver
            Stundenlohn ist oder wie sich deine Abgaben aufteilen.
          </Text>
        </Card>
        <ArrowRightIcon className={"w-[60px]"} />
        <Card className={"flex! p-6! flex-col w-full h-full gap-4"}>
          <Heading as={"h2"} size={"6"}>
            Netto verbessern
          </Heading>
          <Image
            src={"/nettolohn_verbessern.png"}
            width={400}
            height={400}
            alt={""}
          />
          <Text>
            Dir werden Empfehlungen inkl. Auswirkung auf dein Nettolohn
            angezeigt.
          </Text>
        </Card>
      </Flex>
    </Flex>
  );
}
