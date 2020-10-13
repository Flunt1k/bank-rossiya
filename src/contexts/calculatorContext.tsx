import React from 'react';
import useForm from '../hooks/useForm';
import {DepositParams, SummsAndRate} from '../interfaces';

const CalculatorContext: React.Context<any> = React.createContext(null);

export const useCalculator = () => React.useContext(CalculatorContext);

const CalculatorProvider: React.FC = ({children}): React.ReactElement => {
  const [settingsState, setSettingsState] = useForm(
      {code: '', period_from: '', summ_from: ''});
  const [rate, setRate] = React.useState<number>(0);
  const [income, setIncome] = React.useState<number>(0);

  const calcRateAndIncome = (params: DepositParams[], currentPeriodRange: number) => {
    const index = currentPeriodRange === -1
        ? params.length - 1
        : currentPeriodRange - 1;

    const offers = params[index].summs_and_rate;
    const currentValuesRange = offers.findIndex(
        (param: SummsAndRate) => param.summ_from > +settingsState.summ_from,
    );

    const currentRate = currentValuesRange === -1
        ? offers[offers.length - 1].rate
        : offers[currentValuesRange - 1].rate;
    setRate(currentRate);

    const currentIncome = +settingsState.summ_from * currentRate * +settingsState.period_from
    setIncome(currentIncome)
  };

  return (
      <CalculatorContext.Provider value={{
        settingsState,
        setSettingsState,
        calcRateAndIncome,
        rate,
        income
      }}>
        {children}
      </CalculatorContext.Provider>
  );
};

export default CalculatorProvider;
