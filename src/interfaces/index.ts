export interface DepositsList {
  deposits: Credit[]
}

export interface Credit {
  code: string;
  name: string;
  param: CreditParams[]
}

export interface CreditParams {
  period_from: number;
  summs_and_rate: SummsAndRate[]
}

export interface SummsAndRate {
  summ_from: number;
  rate: number
}
