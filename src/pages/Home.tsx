import React from 'react';

import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Theme} from '@material-ui/core';

import Calculator from '../components/Calculator';
import {DepositsList} from '../interfaces';
import CalculatorProvider from '../contexts/calculatorContext';

export const useHomeStyles = makeStyles((theme: Theme) => ({
  calculatorForm: {
    display: 'flex',
    marginTop: 20,
  },

  leftSideWrapper: {
    height: '100%',
    width: '60%',
    borderRight: '1px solid grey',
    padding: 20
  },

  rightSideWrapper: {
    height: '100%',
    padding: 20
  },

  formControl: {
    minWidth: 120,
    width: '70%',
    margin: '15px 0',
  },
}))

interface HomeProps {
  credits: DepositsList
}

const Home: React.FC<HomeProps> = ({credits}: HomeProps): React.ReactElement => {
  const classes = useHomeStyles()

  return (
      <>
        <Container>
          <CalculatorProvider>
            <Calculator credits={credits} classes={classes}/>
          </CalculatorProvider>
        </Container>
      </>
  );
};

export default Home;
