import { Button, Flex, Heading, Link, Text } from "@radix-ui/themes";

export const Header = () => {
  return (
    <Flex
      className={"text-white"}
      align={"center"}
      justify={"center"}
      gap={"2"}
      p={"4"}
    >
      <Flex width={"1600px"} align={"center"} justify={"between"}>
        <Link className={"text-white! min-w-fit"} href={"/"}>
          <Flex direction={"column"}>
            <Heading className={"righteous tracking-widest!"}>
              endlichbesser.de
            </Heading>
            <Text className={"text-white/80"} size={"2"}>
              Endlich dein Leben besser meistern
            </Text>
          </Flex>
        </Link>
        <Flex align={"center"} className={"hidden! md:flex"} gap={"8"}>
          <Link className={"text-white!"} href={"/"}>
            Start
          </Link>
          <Button>Netto optimieren</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
