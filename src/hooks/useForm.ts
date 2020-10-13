import React from 'react';
import {CreditSettingsState} from '../interfaces';

const useForm = (initialState: CreditSettingsState)
    : [CreditSettingsState, (e?: React.ChangeEvent<{ name?: string | undefined; value: unknown; } | HTMLInputElement>) => void] => {

  const [state, setState] = React.useState<CreditSettingsState>(initialState);

  const changeState = (e?: React.ChangeEvent<{ name?: string | undefined; value: unknown; } | HTMLInputElement>): void => {
  const value = e?.target.value
    const name = e?.target.name as string
    setState({...state, [name]: value})
  };

  return [state, changeState];
};

export default useForm;
