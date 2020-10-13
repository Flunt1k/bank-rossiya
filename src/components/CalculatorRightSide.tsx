import React from 'react';
import {useCalculator} from '../contexts/calculatorContext';
import {Typography} from '@material-ui/core';
import {CalculatorContext, DepositsItem} from '../interfaces';
import {useHomeStyles} from '../pages/Home';

interface CalculatorRightSideProps {
  classes: ReturnType<typeof useHomeStyles>;
  deposits: DepositsItem[];
}

interface ListOfDeposits {
  [key: string]: string
}

const CalculatorRightSide: React.FC<CalculatorRightSideProps> = ({
  classes,
  deposits,
}: CalculatorRightSideProps): React.ReactElement => {
  const context: CalculatorContext = useCalculator();
  const [currentDepositName, setCurrentDepositName] = React.useState<ListOfDeposits>(
      {});
  React.useEffect(() => {
    const name = deposits.reduce(((acc: ListOfDeposits, deposit) => ({
      ...acc,
      [deposit.code]: deposit.name,
    })), {});
    setCurrentDepositName(name);
  }, [context.settingsState.code, deposits]);
  return (
      <>
        <Typography component="h2"
                    variant="h5"
                    children={`Тип депозита: ${currentDepositName[context.settingsState.code] ||
                    'не выбран'}`}
                    className={classes.display}
        />
        {currentDepositName[context.settingsState.code]
            ? <Typography component="h2"
                          variant="h5"
                          children={`На срок: ${context.settingsState.period_from ||
                          0} день/дня/дней`}
                          className={classes.display}

            /> : null
        }
        {context.settingsState.period_from
            ? <Typography component="h2"
                          variant="h5"
                          children={`На сумму:  ${context.settingsState.summ_from ||
                          0} руб.`}
                          className={classes.display}

            /> : null
        }
        {
          context.rate
              ? <>
                <Typography component="h2"
                            variant="h5"
                            children={`Процентная ставка: ${context.rate}%`}
                            className={classes.displayResult}

                />
                <Typography component="h2"
                            variant="h5"
                            children={`Доход: ${context.income} руб.`}
                            className={classes.displayResult}

                />
              </> : null
        }

      </>
  );
};

export default CalculatorRightSide;
