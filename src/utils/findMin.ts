import {DepositParams} from '../interfaces';

const findMin = (period: string, depositParams: DepositParams[]) => {
  return depositParams.findIndex(
      (param: DepositParams) => param.period_from > +period,
  );
}

export default findMin
