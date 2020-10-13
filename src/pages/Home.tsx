import React from 'react';

import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Theme} from '@material-ui/core';

import Calculator from '../components/Calculator';
import {Deposits} from '../interfaces';
import CalculatorProvider from '../contexts/calculatorContext';

export const useHomeStyles = makeStyles((theme: Theme) => ({
  calculatorForm: {
    display: 'flex',
    marginTop: 20,
  },

  leftSideWrapper: {
    height: '100%',
    width: '40%',
    padding: 20
  },

  rightSideWrapper: {
    padding: 20,
    borderLeft: '1px solid grey',
    '& div': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around'
    }
  },

  formControl: {
    minWidth: 120,
    width: '100%',
    margin: '15px 0',
  },
  display: {
    fontSize: 22,
    fontWeight: 600,
  },

  displayResult: {
    margin: '35px 0',
    fontSize: 24,
    fontWeight: 600
  }
}))

interface HomeProps {
  credits: Deposits
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
