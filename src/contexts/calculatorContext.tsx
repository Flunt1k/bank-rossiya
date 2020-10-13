import React from 'react';
import useForm from '../hooks/useForm';
import {DepositParams, SummsAndRate} from '../interfaces';

const CalculatorContext: React.Context<any> = React.createContext(null)

export const useCalculator = () => React.useContext(CalculatorContext)

const CalculatorProvider: React.FC = ({children}):React.ReactElement => {
  const [settingsState, setSettingsState] = useForm({code: '', period_from: '', summ_from: ''});
  const [rate, setRate] = React.useState<number>(0)

  const calcRateAndIncome = (params: DepositParams[], ) => {
    const index = params.findIndex((value: DepositParams) => value.period_from === +settingsState.period_from)
    const offers = params[index].summs_and_rate
    const offersValues = offers.map((obj: SummsAndRate) => obj.summ_from)
    const indexRange = offersValues.findIndex((summ: number) => summ > +settingsState.summ_from)
    if (indexRange === -1) {
      setRate(offers[offers.length - 1].rate)
      return
    }
    setRate(offers[indexRange - 1].rate);
  }

  return(
      <CalculatorContext.Provider value={{
        settingsState,
        setSettingsState,
        calcRateAndIncome,
        rate
      }}>
        {children}
      </CalculatorContext.Provider>
  )
}

export default CalculatorProvider
