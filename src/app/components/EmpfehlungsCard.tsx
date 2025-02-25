import { Badge, Card, Flex, Text } from "@radix-ui/themes";
import { getZahlungsintervall } from "@/utils/zahlungsintervall";
import { Abrechnungszeitraum } from "@/types/abrechnungszeitraum";

const EmpfehlungsCard = ({
  badgeColor,
  badgeText,
  description,
  savingsPerYear,
  payments,
  mode,
}: {
  badgeColor?: string;
  badgeText: string;
  description: string;
  savingsPerYear: number;
  payments: number;
  mode: Abrechnungszeitraum;
}) => {
  return (
    <Card className={"flex-1 backdrop-blur-2xl drop-shadow-sm min-w-64"}>
      <Flex
        gap={"2"}
        direction="column"
        justify={"between"}
        height={"100%"}
        align={"start"}
        width="100%"
      >
        <Badge color={badgeColor as never}>{badgeText}</Badge>
        <Text size={"2"}>{description}</Text>
        <Text size={"2"}>
          <Text color={"green"}>
            +
            {(mode === "Monat"
              ? savingsPerYear / payments
              : savingsPerYear
            ).toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
          </Text>{" "}
          {" pro "}
          {getZahlungsintervall(mode, payments)}
        </Text>
      </Flex>
    </Card>
  );
};

export default EmpfehlungsCard;
