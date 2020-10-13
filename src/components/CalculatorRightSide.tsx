import React from 'react';
import '../index.css'
import {useReactToPrint} from 'react-to-print';

import {Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';

import {useCalculator} from '../contexts/calculatorContext';
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
  const refToPrint = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>

  const handlePrint = useReactToPrint({
    content: () => refToPrint.current
  });
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
      <div ref={refToPrint} className="printOnCenter">
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
                <div className="no-print">
                <Button variant="contained"
                        color="primary"
                        children="Напечатать"

                        onClick={handlePrint}
                />
                </div>
              </> : null
        }

      </div>
  );
};

export default CalculatorRightSide;
