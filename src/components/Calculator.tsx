import React from 'react';

import Paper from '@material-ui/core/Paper';

import {Deposits} from '../interfaces';
import {useHomeStyles} from '../pages/Home';
import CalculatorLeftSide from './CalculatorLeftSide';
import CalculatorRightSide from './CalculatorRightSide';

interface CalculatorProps {
  classes: ReturnType<typeof useHomeStyles>
  credits: Deposits;
}

const Calculator: React.FC<CalculatorProps> = ({credits, classes}: CalculatorProps): React.ReactElement => {
  return (
      <>
        <Paper className={classes.calculatorForm} elevation={3}>
          <div className={classes.leftSideWrapper}>
            <CalculatorLeftSide deposits={credits?.deposits} classes={classes}/>
          </div>
          <div className={classes.rightSideWrapper}>
            <CalculatorRightSide classes={classes}
                                 deposits={credits?.deposits}
            />
          </div>
        </Paper>
      </>
  );
};

export default Calculator;
