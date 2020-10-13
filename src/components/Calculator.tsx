import React from 'react';

import Paper from '@material-ui/core/Paper';

import {DepositsList} from '../interfaces';
import {useHomeStyles} from '../pages/Home';
import CalculatorLeftSide from './CalculatorLeftSide';

interface CalculatorProps {
  classes: ReturnType<typeof useHomeStyles>
  credits: DepositsList;
}

const Calculator: React.FC<CalculatorProps> = ({credits, classes}: CalculatorProps): React.ReactElement => {
  return (
      <>
        <Paper className={classes.calculatorForm} elevation={3}>
          <div className={classes.leftSideWrapper}>
            <CalculatorLeftSide deposits={credits?.deposits} classes={classes}/>
          </div>
          <div className={classes.rightSideWrapper}>
            display
          </div>
        </Paper>
      </>
  );
};

export default Calculator;
