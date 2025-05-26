import { Interval } from "@/types/interval";

export type Finanzbewegung = {
  title: string;
  menge: number;
  interval: Interval;
  startDate?: Date; // Optional start date for the financial movement
  endDate?: Date; // Optional end date for the financial movement
  kuendigungsfrist?: number; // Optional cancellation period in months
};
