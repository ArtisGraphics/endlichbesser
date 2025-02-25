import { Flex, Heading } from "@radix-ui/themes";
import { Empfehlungen } from "@/app/components/Empfehlungen";

export default function Home() {
  return (
    <Flex
      direction={"column"}
      align={"center"}
      className={"p-16 text-center"}
      gap={"8"}
    ></Flex>
  );
}
