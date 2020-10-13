import React from 'react';
import {v4} from 'uuid';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {Button, Select} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import {CalculatorContext, DepositsItem, DepositParams} from '../interfaces';
import {useHomeStyles} from '../pages/Home';
import {useCalculator} from '../contexts/calculatorContext';
import findMin from '../utils/findMin';

interface CalculatorLeftSideProps {
  deposits: DepositsItem[];
  classes: ReturnType<typeof useHomeStyles>
}

const CalculatorLeftSide: React.FC<CalculatorLeftSideProps> = ({
  deposits,
  classes,
}: CalculatorLeftSideProps): React.ReactElement => {
  const context: CalculatorContext = useCalculator();

  const [depositParams, setDepositParams] = React.useState<DepositParams[]>([]);
  const [indexOfMin, setIndexOfMin] = React.useState<number>(0);

  React.useEffect(() => {
    setIndexOfMin(findMin(context.settingsState.period_from, depositParams));
  }, [context.settingsState.period_from, depositParams]);

  React.useEffect(() => {
    const index = deposits.findIndex(
        value => context.settingsState.code === value.code);
    if (index !== -1) {
      const params = deposits[index].param;
      setDepositParams(params);
    }
  }, [context.settingsState.code, deposits]);

  return (
      <>
        <Typography component="h6" variant="subtitle2">Выберите тип
          депозита:</Typography>
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
            {deposits?.map((credit: DepositsItem) =>
                <MenuItem value={credit.code}
                          key={v4()}>{credit.name}</MenuItem>)}*
          </Select>
        </FormControl>

        {context.settingsState.code ?
            <>
              <Typography component="h6" variant="subtitle2">Введите
                период: (дней)</Typography>
              <TextField variant="outlined" className={classes.formControl}
                         value={context.settingsState.period_from}
                         name="period_from"
                         type="number"
                         error={!(depositParams[0]?.period_from <=
                             +context.settingsState.period_from)}
                         helperText={!(depositParams[0]?.period_from <=
                             +context.settingsState.period_from)
                             ? `Минимальный период ${depositParams[0]?.period_from} день/дней`
                             : null
                         }
                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                           context.setSettingsState(e);
                           if (context.rate !== 0 && context.income !== 0) {
                             context.setIncome(0);
                             context.setRate(0);
                           }
                         }}
              />
            </> : null
        }
        {
          !(depositParams[0]?.period_from <= +context.settingsState.period_from)
              ? null
              : <>
                <Typography component="h6" variant="subtitle2">Введите
                  сумму:</Typography>
                <TextField variant="outlined" className={classes.formControl}
                           value={context.settingsState.summ_from}
                           name="summ_from"
                           type="number"
                           error={!(depositParams[indexOfMin -
                               1]?.summs_and_rate[0]?.summ_from <=
                               +context.settingsState.summ_from)}
                           helperText={
                             !(depositParams[indexOfMin -
                                 1]?.summs_and_rate[0]?.summ_from <=
                                 +context.settingsState.summ_from)
                                 ? `Минимальная сумма ${depositParams[indexOfMin -
                                 1]?.summs_and_rate[0]?.summ_from}`
                                 : null}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                             context.setSettingsState(e);
                             if (context.rate !== 0 && context.income !== 0) {
                               context.setIncome(0);
                               context.setRate(0);
                             }
                           }}
                />
              </>
        }

        {!(depositParams[indexOfMin - 1]?.summs_and_rate[0]?.summ_from <=
            +context.settingsState.summ_from)
            ?
            null
            :

            <div>
              <Button variant="contained"
                      color="primary"
                      children="Подобрать"
                      onClick={() => context.calcRateAndIncome(depositParams,
                          indexOfMin)}
              />
            </div>
        }
      </>
  );
};

export default CalculatorLeftSide;
