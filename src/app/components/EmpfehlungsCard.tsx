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
  modeSuffix,
}: {
  badgeColor?: string;
  badgeText: string;
  description: string;
  savingsPerYear?: number;
  payments: number;
  mode: Abrechnungszeitraum;
  modeSuffix?: string;
}) => {
  return (
    <Card className={"flex-1 backdrop-blur-2xl drop-shadow-xs min-w-64"}>
      <Flex
        gap={"2"}
        direction="column"
        justify={"between"}
        height={"100%"}
        align={"start"}
        width="100%"
      >
        <Flex direction={"column"} gap={"2"} align={"start"}>
          <Badge color={badgeColor as never}>{badgeText}</Badge>
          <Text size={"2"}>{description}</Text>
        </Flex>
        {savingsPerYear && (
          <Text size={"3"}>
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
            {modeSuffix ? modeSuffix : ""}
          </Text>
        )}
      </Flex>
    </Card>
  );
};

export default EmpfehlungsCard;
