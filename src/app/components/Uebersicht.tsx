import { Button, Dialog, Flex, Heading, Text } from "@radix-ui/themes";
import Einnahme from "@/app/components/Einnahme";
import { useSalary } from "@/contexts/GehaltProvider";
import { useEffect, useState } from "react";
import { Interval } from "@/types/interval";

export const Uebersicht = () => {
  const { nettoEinkommen, minijobVerdienst, kindergeld } = useSalary();

  const [gesamtEinnahmen, setGesamtEinnahmen] = useState<number>(0);
  const [ausgaben, setAusgaben] = useState<
    { title: string; menge: number; interval: Interval }[]
  >([]);
  const [gesamtAusgaben, setGesamtAusgaben] = useState<number>(0);

  useEffect(() => {
    setGesamtEinnahmen(nettoEinkommen / 12 + minijobVerdienst + kindergeld);
  }, [nettoEinkommen, minijobVerdienst, kindergeld]);

  useEffect(() => {
    setGesamtAusgaben(
      ausgaben.reduce((sum, ausgabe) => sum + ausgabe.menge, 0),
    );
  }, [ausgaben]);

  const addAusgabe = (title: string, menge: number, interval: Interval) => {
    setAusgaben([...ausgaben, { title, menge, interval }]);
  };

  function deleteAusgabe(index: number) {
    const newAusgaben = [...ausgaben];
    newAusgaben.splice(index, 1);
    setAusgaben(newAusgaben);
  }

  return (
    <Flex direction={"column"} gap={"8"}>
      <Flex direction={"column"} align={"start"} gap={"4"}>
        <Flex align={"center"} gap={"4"} justify={"between"} width={"100%"}>
          <Heading>Einnahmen</Heading>
          <Text color={"green"}>
            {gesamtEinnahmen.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
          </Text>
        </Flex>
        <Flex gap={"4"} align={"center"}>
          <Einnahme
            onDelete={() => console.log("delete")}
            menge={nettoEinkommen / 12}
            title={"Hauptjob"}
            interval={"monatlich"}
          />
          {minijobVerdienst > 0 && (
            <Einnahme
              onDelete={() => console.log("delete")}
              menge={minijobVerdienst}
              title={"Minijob"}
              interval={"monatlich"}
            />
          )}
          {kindergeld > 0 && (
            <Einnahme
              onDelete={() => console.log("delete")}
              menge={kindergeld}
              title={"Kindergeld"}
              interval={"monatlich"}
            />
          )}
        </Flex>

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
                      addAusgabe(title, menge, interval);
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
            {gesamtAusgaben.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
          </Text>
        </Flex>
        {ausgaben.length > 0 && (
          <Flex gap={"4"} align={"center"}>
            {ausgaben.map((ausgabe, index) => (
              <Einnahme
                onDelete={() => deleteAusgabe(index)}
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
