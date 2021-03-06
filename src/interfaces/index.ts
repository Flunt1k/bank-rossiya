import React from 'react';

export interface Deposits {
  deposits: DepositsItem[];
}

export interface DepositsItem {
  code: string;
  name: string;
  param: DepositParams[];
}

export interface DepositParams {
  period_from: number;
  summs_and_rate: SummsAndRate[];
}

export interface SummsAndRate {
  summ_from: number;
  rate: number;
}

export interface CreditSettingsState {
  code: string;
  period_from: string;
  summ_from: string;
}

export interface CalculatorContext {
  settingsState: CreditSettingsState;
  setSettingsState: (e?: React.ChangeEvent<{ name?: string | undefined; value: unknown; } | HTMLInputElement>) => void;
  calcRateAndIncome: (params: DepositParams[], currentPeriodRange: number) => void;
  rate: number;
  income: number;
  setIncome:  React.Dispatch<React.SetStateAction<number>>;
  setRate:  React.Dispatch<React.SetStateAction<number>>;
}
