"use client";
import { useState } from "react";
import { Button, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Flex
      className={"text-white"}
      align={"center"}
      justify={"center"}
      gap={"2"}
      p={"4"}
    >
      <Flex width={"1600px"} align={"center"} justify={"between"}>
        <Link className={"text-white min-w-fit"} href={"/"}>
          <Flex direction={"column"}>
            <Heading className={"righteous tracking-widest"}>
              endlichbesser.de
            </Heading>
            <Text className={"text-white/80"} size={"2"}>
              Endlich dein Leben besser meistern
            </Text>
          </Flex>
        </Link>
        <Flex align={"center"} className={"hidden md:flex"} gap={"8"}>
          <Link className={"text-white"} href={"/"}>
            Start
          </Link>
          <Link className={"text-white"} href={"/digital-werden"}>
            Digital werden
          </Link>
          <Link className={"text-white"} href={"/datei-umwandeln"}>
            Datei umwandeln
          </Link>
          <Link href={"/mehr-netto-vom-brutto"}>
            <Button>Netto optimieren</Button>
          </Link>
        </Flex>
        <Button className={"md:hidden!"} onClick={toggleMenu}>
          <HamburgerMenuIcon />
        </Button>
      </Flex>
      {menuOpen && (
        <Flex
          direction={"column"}
          align={"end"}
          gap={"4"}
          className={
            "md:hidden text-white bg-white/10 backdrop-blur-sm p-4 fixed top-20 right-0 w-full text-lg font-bold z-100"
          }
        >
          <Link className={"text-white!"} href={"/"}>
            Start
          </Link>
          <Link className={"text-white!"} href={"/digital-werden"}>
            Digital werden
          </Link>
          <Link className={"text-white!"} href={"/datei-umwandeln"}>
            Datei umwandeln
          </Link>
          <Link href={"/mehr-netto-vom-brutto"}>
            <Button>Netto optimieren</Button>
          </Link>
        </Flex>
      )}
    </Flex>
  );
};
