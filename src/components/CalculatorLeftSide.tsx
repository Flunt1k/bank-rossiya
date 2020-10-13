import React, {useEffect} from 'react';
import {v4} from 'uuid';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {Button, Select} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import {CalculatorContext, Credit, DepositParams} from '../interfaces';
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
  const context: CalculatorContext = useCalculator();

  const [depositParams, setDepositParams] = React.useState<DepositParams[]>([]);
  useEffect(() => {
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
            {deposits?.map((credit: Credit) =>
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
                         onChange={context.setSettingsState}
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
                           onChange={context.setSettingsState}
                />
              </>
        }

        {!(depositParams[0]?.summs_and_rate[0]?.summ_from <=
            +context.settingsState.summ_from)
            ?
            null
            :

            <div>
              <Button variant="contained"
                      color="primary"
                      children="Подобрать"
                      onClick={() => context.calcRateAndIncome(depositParams)}
              />
            </div>
        }
      </>
  );
};

export default CalculatorLeftSide;
