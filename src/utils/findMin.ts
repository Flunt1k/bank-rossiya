import {DepositParams} from '../interfaces';

const findMin = (period: string, depositParams: DepositParams[]) => {
  return depositParams.findIndex(value => value.period_from === +period)
}

export default findMin
