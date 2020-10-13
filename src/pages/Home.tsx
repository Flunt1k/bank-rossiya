import React from 'react';

import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Calculator from '../components/Calculator';
import {DepositsList} from '../interfaces';

export const useHomeStyles = makeStyles(() => ({
  calculatorForm: {
    display: 'flex',
    marginTop: 20,
  },

  leftSideWrapper: {
    height: '100%',
    width: '60%',
    borderRight: '1px solid grey'
  },

  rightSideWrapper: {
    height: '100%'
  }
}))

interface HomeProps {
  credits: DepositsList
}

const Home: React.FC<HomeProps> = ({credits}: HomeProps): React.ReactElement => {
  const classes = useHomeStyles()

  return (
      <>
        <Container>
          <Calculator credits={credits} classes={classes}/>
        </Container>
      </>
  );
};

export default Home;
