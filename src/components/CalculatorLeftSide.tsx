import React, {useEffect} from 'react';
import {v4} from 'uuid';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {Select} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import {CalculatorContext, Credit, CreditParams} from '../interfaces';
import {useHomeStyles} from '../pages/Home';
import {useCalculator} from '../contexts/calculatorContext';

interface CalculatorLeftSideProps {
  deposits: Credit[];
  classes: ReturnType<typeof useHomeStyles>
}

const CalculatorLeftSide: React.FC<CalculatorLeftSideProps> = ({
  deposits,
  classes,
}: CalculatorLeftSideProps): React.ReactElement => {
  const context: CalculatorContext = useCalculator()

  const [depositParams, setDepositParams] = React.useState<CreditParams[] | undefined>();

  useEffect(() => {
    const index = deposits.findIndex(value => context.settingsState.code === value.code);
    if (index !== -1) {
      const params = deposits[index].param;
      setDepositParams(params);
    } else {
      setDepositParams(undefined);
    }
  }, [context.settingsState.code, deposits]);

  return (
      <>
        <Typography component="h6" variant="subtitle2">Выберите тип депозита:</Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="creditType_label">Тип</InputLabel>
          <Select
              labelId="creditType_label"
              id="demo-simple-select-outlined"
              value={context.settingsState.code}
              onChange={context.setSettingsState}
              name="code"
              label="Тип кредита"
          >
            <MenuItem value="">
              <em>Тип кредита</em>
            </MenuItem>
            {deposits?.map((credit: Credit) =>
                <MenuItem value={credit.code}
                          key={v4()}>{credit.name}</MenuItem>)}*
          </Select>
        </FormControl>
        <Typography component="h6" variant="subtitle2">Выберите период:</Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="creditType_label">Период</InputLabel>
          <Select
              labelId="creditType_label"
              id="demo-simple-select-outlined"
              value={context.settingsState.period_from}
              onChange={context.setSettingsState}
              name="period_from"
              label="Период"
          >
            <MenuItem value="">
              <em>
                {!depositParams?.length ? 'Выберите тип дипозита' : 'Выберите' +
                    ' период'}
              </em>
            </MenuItem>
            {
            depositParams?.map((params: CreditParams) => {
              return <MenuItem key={v4()}
                               value={`${params.period_from}`}>{params.period_from}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <Typography component="h6" variant="subtitle2">Введите сумму:</Typography>
        <TextField variant="outlined" className={classes.formControl}
                   label={!(!!context.settingsState.period_from) ? 'Сперва выберите' +
                       ' период' : 'Введите сумму'}
                   disabled={!(!!context.settingsState.period_from)}
                   value={context.settingsState.summ_from}
                   onChange={context.setSettingsState}
        />
      </>
  );
};

export default CalculatorLeftSide;
