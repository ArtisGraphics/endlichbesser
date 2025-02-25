"use client";

import { Card, Flex, Heading, Table, Tabs, Text } from "@radix-ui/themes";
import { ResponsivePie } from "@nivo/pie";
import { Datum, ResponsiveWaffle } from "@nivo/waffle";
import { useSalary } from "@/contexts/GehaltProvider";
import { LegendProps } from "@nivo/legends";
import { berechneStundenlohn } from "@/utils/stundenlohn";
import { berechneUrlaubsstunden } from "@/utils/urlaub";

const MyTheme = {
  tooltip: {
    container: {
      background: "#191919",
      color: "white",
    },
  },
  text: {
    fill: "white",
  },
};

const MyLegend: LegendProps = {
  anchor: "top-left",
  direction: "column",
  justify: false,
  translateX: -100,
  translateY: 0,
  itemsSpacing: 4,
  itemWidth: 100,
  itemHeight: 20,
  itemDirection: "left-to-right",
  itemOpacity: 1,
  itemTextColor: "white",
  symbolSize: 20,
};

const MyResponsiveWaffle = ({ data }: { data: Datum[] }) => (
  <ResponsiveWaffle
    data={data}
    total={100}
    rows={18}
    columns={14}
    padding={5}
    theme={MyTheme}
    valueFormat=".2f"
    margin={{ top: 32, right: 10, bottom: 10, left: 100 }}
    colors={{ scheme: "nivo" }}
    borderRadius={3}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.3]],
    }}
    motionStagger={2}
    legends={[MyLegend]}
  />
);

const MyResponsivePie = ({ data }: { data: Datum[] }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 32, right: 10, bottom: 10, left: 100 }}
    innerRadius={0.5}
    padAngle={0.5}
    cornerRadius={2}
    activeOuterRadiusOffset={5}
    borderWidth={1}
    theme={MyTheme}
    borderColor={{ from: "color", modifiers: [["darker", 0.1]] }}
    arcLinkLabelsTextColor="#ffffff"
    arcLinkLabelsThickness={2}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 5.5]] }}
    colors={{ scheme: "nivo" }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255,255,255,0.4)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.4)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
      {
        id: "gradient",
        type: "linearGradient",
        colors: [
          { offset: 0, color: "inherit", opacity: 0.8 },
          { offset: 100, color: "inherit", opacity: 0.2 },
        ],
      },
    ]}
    fill={[
      { match: { id: "dots" }, id: "dots" },
      { match: { id: "lines" }, id: "lines" },
      { match: "*", id: "gradient" },
    ]}
    motionConfig="gentle"
    legends={[MyLegend]}
  />
);

export const GehaltAnalyse = () => {
  const {
    nettoEinkommen,
    rentenversicherung,
    arbeitslosenversicherung,
    pflegeversicherung,
    krankenversicherung,
    einkommenssteuer,
    kirchensteuer,
    solidaritaetszuschlag,
    bruttoImJahr,
    gehaelter,
    wochenstunden,
    urlaubstage,
    gesamtKostenSteuern,
    gesamtKostenSozialversicherung,
  } = useSalary();

  const pieData = [
    { id: "Netto", label: "Netto", value: nettoEinkommen },
    {
      id: "Krankenversicherung",
      label: "Krankenversicherung",
      value: krankenversicherung,
    },
    {
      id: "Rentenversicherung",
      label: "Rentenversicherung",
      value: rentenversicherung,
    },
    {
      id: "Arbeitslosenversicherung",
      label: "Arbeitslosenversicherung",
      value: arbeitslosenversicherung,
    },
    {
      id: "Pflegeversicherung",
      label: "Pflegeversicherung",
      value: pflegeversicherung,
    },
    {
      id: "Einkommenssteuer",
      label: "Einkommenssteuer",
      value: einkommenssteuer,
    },
    { id: "Kirchensteuer", label: "Kirchensteuer", value: kirchensteuer },
    {
      id: "Solidaritätszuschlag",
      label: "Solidaritätszuschlag",
      value: solidaritaetszuschlag,
    },
  ].filter((x) => x.value !== 0);

  const waffleData = pieData.map((item) => ({
    id: item.id,
    label: item.label,
    value: (item.value / bruttoImJahr) * 100,
  }));

  return (
    <Tabs.Root defaultValue="pie">
      <Flex direction={"column"} gap={"4"}>
        <Table.Root variant={"surface"}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Bestandteil</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>pro Gehalt</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>pro Jahr</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell>Bruttogehalt</Table.RowHeaderCell>
              <Table.Cell>
                <Text color={"green"}>
                  {(bruttoImJahr / gehaelter).toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text color={"green"}>
                  {bruttoImJahr.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>Krankenversicherung</Table.RowHeaderCell>
              <Table.Cell>
                <Text color={krankenversicherung !== 0 ? "red" : undefined}>
                  {(krankenversicherung / gehaelter).toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text color={krankenversicherung !== 0 ? "red" : undefined}>
                  {krankenversicherung.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>Rentenversicherung</Table.RowHeaderCell>
              <Table.Cell>
                <Text color={rentenversicherung !== 0 ? "red" : undefined}>
                  {(rentenversicherung / gehaelter).toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text color={rentenversicherung !== 0 ? "red" : undefined}>
                  {rentenversicherung.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>
                Arbeitslosenversicherung
              </Table.RowHeaderCell>
              <Table.Cell>
                <Text
                  color={arbeitslosenversicherung !== 0 ? "red" : undefined}
                >
                  {(arbeitslosenversicherung / gehaelter).toLocaleString(
                    "de-DE",
                    {
                      style: "currency",
                      currency: "EUR",
                    },
                  )}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text
                  color={arbeitslosenversicherung !== 0 ? "red" : undefined}
                >
                  {arbeitslosenversicherung.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>Pflegeversicherung</Table.RowHeaderCell>
              <Table.Cell>
                <Text color={pflegeversicherung !== 0 ? "red" : undefined}>
                  {(pflegeversicherung / gehaelter).toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text color={pflegeversicherung !== 0 ? "red" : undefined}>
                  {pflegeversicherung.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>Einkommenssteuer</Table.RowHeaderCell>
              <Table.Cell>
                <Text color={einkommenssteuer !== 0 ? "red" : undefined}>
                  {(einkommenssteuer / gehaelter).toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text color={einkommenssteuer !== 0 ? "red" : undefined}>
                  {einkommenssteuer.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>Kirchensteuer</Table.RowHeaderCell>
              <Table.Cell>
                <Text color={kirchensteuer !== 0 ? "red" : undefined}>
                  {(kirchensteuer / gehaelter).toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text color={kirchensteuer !== 0 ? "red" : undefined}>
                  {kirchensteuer.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>Solidaritätszuschlag</Table.RowHeaderCell>
              <Table.Cell>
                <Text color={solidaritaetszuschlag !== 0 ? "red" : undefined}>
                  {(solidaritaetszuschlag / gehaelter).toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text color={solidaritaetszuschlag !== 0 ? "red" : undefined}>
                  {solidaritaetszuschlag.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>Nettogehalt</Table.RowHeaderCell>
              <Table.Cell>
                <Text color={nettoEinkommen !== 0 ? "green" : undefined}>
                  {(nettoEinkommen / gehaelter).toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text color={nettoEinkommen !== 0 ? "green" : undefined}>
                  {nettoEinkommen.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </Text>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>

        <Flex width={"100%"} gap={"4"}>
          <Card className={"w-full"}>
            <Heading size={"4"}>Stundenlohn</Heading>
            Du arbeitest derzeit {wochenstunden} Stunden pro Woche bzw.{" "}
            <b>{wochenstunden * 4} Stunden</b> pro Monat.
            <br />
            Du erwirtschaftest also{" "}
            <Text color={"green"}>
              {berechneStundenlohn(
                wochenstunden * 4,
                bruttoImJahr / gehaelter,
              ).toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
              {"  "}
            </Text>
            (Brutto) pro Stunde.
            <br />
            Nach allen Abgaben kommen effektiv bei dir{" "}
            <Text color={"green"}>
              {berechneStundenlohn(
                wochenstunden * 4,
                nettoEinkommen / gehaelter,
              ).toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
              {"  "}
            </Text>
            (Netto) pro Stunde an.
            <br />
            Deine Steuern fressen{" "}
            <Text color={"red"}>
              {Math.round((gesamtKostenSteuern / bruttoImJahr) * 10000) / 100}%
            </Text>{" "}
            deines Bruttos auf.
            <br />
            Die Sozialabgaben fressen{" "}
            <Text color={"red"}>
              {Math.round(
                (gesamtKostenSozialversicherung / bruttoImJahr) * 10000,
              ) / 100}
              %
            </Text>{" "}
            deines Bruttos auf.
            <br />
            Damit liegt deine Abgabenlast insgesamt bei{" "}
            <Text color={"red"} weight={"bold"}>
              {Math.round((1 - nettoEinkommen / bruttoImJahr) * 10000) / 100}%
            </Text>
            .
          </Card>
          <Card className={"w-full"}>
            <Heading size={"4"}>Urlaubszeit</Heading>
            Im Jahr stehen dir <b>{urlaubstage} Urlaubstage</b> zur Verfügung.
            <br />
            Ein Urlaubstag entspricht bei deiner Arbeitszeit{" "}
            <Text color={"green"}>{wochenstunden / 5} Stunden</Text>.
            <br />
            All deine Urlaubstage entsprechen{" "}
            <Text color={"green"}>
              {berechneUrlaubsstunden(urlaubstage, wochenstunden)}{" "}
              Urlaubsstunden
            </Text>
            .<br />
            Dein gesamter Urlaub entspräche also einem Bruttoverdienst von
            umgerechnet{" "}
            <Text color={"green"}>
              {(
                berechneStundenlohn(
                  wochenstunden * 4,
                  bruttoImJahr / gehaelter,
                ) * berechneUrlaubsstunden(urlaubstage, wochenstunden)
              ).toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </Text>
            .
          </Card>
        </Flex>
      </Flex>
      <Tabs.List>
        <Tabs.Trigger value="pie">Kreisdiagramm</Tabs.Trigger>
        <Tabs.Trigger value="waffle">Blöcke</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="pie">
        <div style={{ height: "50vh" }}>
          <MyResponsivePie data={pieData} />
        </div>
      </Tabs.Content>

      <Tabs.Content value="waffle">
        <div style={{ height: "50vh" }}>
          <MyResponsiveWaffle data={waffleData} />
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};
