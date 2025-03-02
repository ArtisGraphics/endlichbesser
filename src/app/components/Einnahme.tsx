import { Badge, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { ReactElement } from "react";
import { Interval, intervalColorMap } from "@/types/interval";
import { CrossCircledIcon } from "@radix-ui/react-icons";

const Einnahme = ({
  title,
  menge,
  interval,
  icon,
  onDelete,
}: {
  title: string;
  menge: number;
  interval: Interval;
  icon?: ReactElement;
  onDelete: () => void;
}) => {
  return (
    <div
      className={`flex-1 backdrop-blur-2xl drop-shadow-xs min-w-64  ${menge > 0 ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"} border  p-4 rounded`}
    >
      <Flex justify={"between"} height={"100%"} align={"center"} width="100%">
        <Flex gap={"2"} align={"center"}>
          {icon ? icon : ""}
          <Heading size={"4"}>{title}</Heading>
        </Flex>
        <Flex gap={"4"} align={"center"}>
          <Flex direction={"column"} align={"end"} gap={"1"}>
            <Text color={menge > 0 ? "green" : "red"}>
              {menge.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </Text>
            <Badge color={intervalColorMap[interval]}>{interval}</Badge>
          </Flex>
          <Button onClick={onDelete} variant="ghost" color={"red"}>
            <CrossCircledIcon />
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Einnahme;
