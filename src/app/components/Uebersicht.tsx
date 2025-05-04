import { Button, Dialog, Flex, Heading, Text } from "@radix-ui/themes";
import Einnahme from "@/app/components/Einnahme";
import { useSalary } from "@/contexts/GehaltProvider";
import { useEffect, useState } from "react";
import { Interval } from "@/types/interval";
import { Finanzbewegung } from "@/types/finanzbewegung";
import FinanzbewegungDialog from "@/app/components/FinanzbewegungDialog";

export const Uebersicht = () => {
  const { nettoEinkommen, minijobVerdienst, kindergeld } = useSalary();

  const [finanzbewegung, setFinanzbewegung] = useState<
    { title: string; menge: number; interval: Interval }[]
  >([
    {
      title: "Hauptjob",
      menge: nettoEinkommen / 12,
      interval: "monatlich",
    },
  ]);

  const [positiveFinanzbewegung, setPositiveFinanzbewegung] = useState<
    Finanzbewegung[]
  >([]);
  const [negativeFinanzbewegung, setNegativeFinanzbewegung] = useState<
    Finanzbewegung[]
  >([]);
  const [totalPositive, setTotalPositive] = useState(0);
  const [totalNegative, setTotalNegative] = useState(0);

  useEffect(() => {
    const positiveFinanzbewegung = finanzbewegung.filter((f) => f.menge > 0);
    const negativeFinanzbewegung = finanzbewegung.filter((f) => f.menge < 0);

    setPositiveFinanzbewegung(positiveFinanzbewegung);
    setNegativeFinanzbewegung(negativeFinanzbewegung);

    const totalPositive = positiveFinanzbewegung.reduce(
      (sum, f) => sum + f.menge,
      0,
    );
    const totalNegative = negativeFinanzbewegung.reduce(
      (sum, f) => sum + f.menge,
      0,
    );

    setTotalPositive(totalPositive);
    setTotalNegative(totalNegative);
  }, [finanzbewegung]);

  const addFinanzbewegung = (
    title: string,
    menge: number,
    interval: Interval,
  ) => {
    setFinanzbewegung([...finanzbewegung, { title, menge, interval }]);
  };
  function deleteFinanzbewegung(index: number) {
    const newFinanzbewegung = [...finanzbewegung];
    newFinanzbewegung.splice(index, 1);
    setFinanzbewegung(newFinanzbewegung);
  }

  return (
    <Flex direction={"column"} gap={"8"}>
      <Flex direction={"column"} align={"start"} gap={"4"}>
        <Flex align={"center"} gap={"4"} justify={"between"} width={"100%"}>
          <Flex gap={"4"} align={"center"}>
            <Heading>Einnahmen</Heading>
            <FinanzbewegungDialog onAdd={addFinanzbewegung} />
          </Flex>
          <Text color={"green"}>
            {totalPositive.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
          </Text>
        </Flex>
        {finanzbewegung.length > 0 && (
          <Flex gap={"4"} align={"center"}>
            {positiveFinanzbewegung.map((ausgabe, index) => (
              <Einnahme
                onDelete={() => deleteFinanzbewegung(index)}
                key={index}
                menge={ausgabe.menge}
                title={ausgabe.title}
                interval={ausgabe.interval}
              />
            ))}
          </Flex>
        )}

        <Flex align={"center"} gap={"4"} justify={"between"} width={"100%"}>
          <Flex gap={"4"} align={"center"}>
            <Heading>Ausgaben</Heading>
            <Dialog.Root>
              <Dialog.Trigger>
                <Button>Hinzufügen</Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Title>Add New Ausgabe</Dialog.Title>
                <Dialog.Description>
                  <form
                    className={"flex flex-col gap-2"}
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(
                        e.target as HTMLFormElement,
                      );
                      const title = formData.get("title") as string;
                      const menge = parseFloat(formData.get("menge") as string);
                      const interval = formData.get("interval") as Interval;
                      addFinanzbewegung(title, menge, interval);
                    }}
                  >
                    <label>
                      Titel:
                      <input name="title" type="text" required />
                    </label>
                    <label>
                      Menge:
                      <input name="menge" type="number" step="0.01" required />
                    </label>
                    <label>
                      Interval:
                      <select name="interval" required>
                        <option value="monatlich">Monatlich</option>
                        <option value="vierteljährlich">Vierteljährlich</option>
                        <option value="halbjährlich">Halbjährlich</option>
                        <option value="jährlich">Jährlich</option>
                      </select>
                    </label>
                    <Button type="submit">Ausgabe hinzufügen</Button>
                  </form>
                </Dialog.Description>
                <Dialog.Close>
                  <Button>Schließen</Button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Root>
          </Flex>
          <Text color={"red"}>
            {totalNegative.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
          </Text>
        </Flex>
        {finanzbewegung.length > 0 && (
          <Flex gap={"4"} align={"center"}>
            {negativeFinanzbewegung.map((ausgabe, index) => (
              <Einnahme
                onDelete={() => deleteFinanzbewegung(index)}
                key={index}
                menge={ausgabe.menge}
                title={ausgabe.title}
                interval={ausgabe.interval}
              />
            ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
