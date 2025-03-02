export type Interval =
  | "monatlich"
  | "vierteljährlich"
  | "halbjährlich"
  | "jährlich";

export type IntervalColor = "blue" | "yellow" | "purple" | "red";

export const intervalColorMap: Record<Interval, IntervalColor> = {
  monatlich: "blue",
  vierteljährlich: "yellow",
  halbjährlich: "purple",
  jährlich: "red",
};
