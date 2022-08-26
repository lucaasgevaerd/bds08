export type Store = {
  id: number;
  name: string;
}

export type SalesSummary = {
  sum: number,
  min: number,
  max: number,
  avg: number,
  count: number
}

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type SalesByGender = {
  gender: Gender;
  sum: number
}

export type Sales = {
  salesSummary: SalesSummary;
  salesByGender: SalesByGender[];
}

export type LabelsAndSeries = {
  labels: string[];
  series: number[];
}