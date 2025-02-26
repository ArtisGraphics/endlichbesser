"use client";

import { Card, Flex, Heading, Table, Tabs, Text } from "@radix-ui/themes";
import { ResponsivePie } from "@nivo/pie";
import { Datum, ResponsiveWaffle } from "@nivo/waffle";
import { useSalary } from "@/contexts/GehaltProvider";
import { LegendProps } from "@nivo/legends";
import { berechneStundenlohn } from "@/utils/stundenlohn";
import { getArbeitstageImJahr } from "@/utils/arbeitstageImJahr";
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
    bundesland,
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

  const bruttoStundenlohn = berechneStundenlohn(
    wochenstunden * 4,
    bruttoImJahr / gehaelter,
  );
  const nettoStundenlohn = berechneStundenlohn(
    wochenstunden * 4,
    nettoEinkommen / gehaelter,
  );
  const arbeistageImJahr = getArbeitstageImJahr(bundesland, 2025) - urlaubstage;
  const arbeitszeitImJahr = (arbeistageImJahr * wochenstunden) / 5;
  const urlaubsstunden = berechneUrlaubsstunden(urlaubstage, wochenstunden);

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

        <div className={"flex flex-col lg:grid lg:grid-cols-3 w-full gap-4"}>
          <Card className={"col-span-1 flex! flex-col! gap-2! text-pretty"}>
            <Heading size={"4"}>Stundenlohn</Heading>
            <Text>
              Du arbeitest derzeit {wochenstunden} Stunden pro Woche bzw.{" "}
              <b>{wochenstunden * 4} Stunden</b> pro Monat.
            </Text>
            <Table.Root variant={"surface"}>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text>Brutto pro Stunde</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Text color={"green"}>
                      {berechneStundenlohn(
                        wochenstunden * 4,
                        bruttoImJahr / gehaelter,
                      ).toLocaleString("de-DE", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text>Sozialabgaben</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Text color={"red"}>
                      {Math.round(
                        (gesamtKostenSozialversicherung / bruttoImJahr) * 10000,
                      ) / 100}
                      %
                    </Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text>Steuern</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Text color={"red"}>
                      {Math.round(
                        (gesamtKostenSteuern / bruttoImJahr) * 10000,
                      ) / 100}
                      %
                    </Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text>Abgabenlast</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Text color={"red"} weight={"bold"}>
                      {Math.round((1 - nettoEinkommen / bruttoImJahr) * 10000) /
                        100}
                      %
                    </Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text>Netto pro Stunde</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Text color={"green"}>
                      {nettoStundenlohn.toLocaleString("de-DE", {
                        style: "currency",
                        currency: "EUR",
                      })}
                      {"  "}
                    </Text>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Card>
          <Card className={"col-span-2 flex! flex-col! gap-2! text-pretty"}>
            <Heading size={"4"}>Arbeitszeit</Heading>
            <Text>
              Für das Bundesland <b>{bundesland}</b> im Jahr 2025 existieren
              genau <b>{getArbeitstageImJahr(bundesland, 2025)} Arbeistage</b>{" "}
              und dir stehen <b>{urlaubstage} Urlaubstage</b> zur Verfügung, das
              entspricht{" "}
              <Text color={"green"} weight={"bold"}>
                {arbeistageImJahr} Tage
              </Text>{" "}
              bzw.{" "}
              <Text color={"green"} weight={"bold"}>
                {arbeitszeitImJahr} Stunden
              </Text>{" "}
              an denen du arbeiten musst.
            </Text>
            <Text>
              Dein effektiver Stundenlohn (Netto im Jahr / geleistete Stunden)
              beträgt:{" "}
              <Text color={"green"} weight={"bold"}>
                <u>
                  {(
                    Math.round((nettoEinkommen / arbeitszeitImJahr) * 100) / 100
                  ).toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}{" "}
                  pro Stunde
                </u>
              </Text>
            </Text>
            <Table.Root variant={"surface"}>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text>1 Urlaubstag</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Text color={"green"}>{wochenstunden / 5}h</Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text>Alle Urlaubstage</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Text color={"green"}>{urlaubsstunden}h</Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text>Urlaubswert (Brutto)</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Text color={"green"}>
                      {(bruttoStundenlohn * urlaubsstunden).toLocaleString(
                        "de-DE",
                        {
                          style: "currency",
                          currency: "EUR",
                        },
                      )}
                    </Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text>Urlaubswert (Netto)</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Text color={"green"}>
                      {(nettoStundenlohn * urlaubsstunden).toLocaleString(
                        "de-DE",
                        {
                          style: "currency",
                          currency: "EUR",
                        },
                      )}
                    </Text>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Card>
        </div>
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
