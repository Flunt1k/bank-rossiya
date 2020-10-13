import React, {Context, useContext} from 'react';
import useForm from '../hooks/useForm';

const CalculatorContext: Context<any> = React.createContext(null)

export const useCalculator = () => useContext(CalculatorContext)

const CalculatorProvider: React.FC = ({children}):React.ReactElement => {
  const [settingsState, setSettingsState] = useForm({code: '', period_from: '', summ_from: ''});



  return(
      <CalculatorContext.Provider value={{
        settingsState,
        setSettingsState
      }}>
        {children}
      </CalculatorContext.Provider>
  )
}

export default CalculatorProvider
