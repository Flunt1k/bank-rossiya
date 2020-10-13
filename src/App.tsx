import React, {useEffect} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';

import Home from './pages/Home';
import db from './depcalc.json';

const App = () => {
const [credits, setCredits] = React.useState()
useEffect(() => {
  setCredits(JSON.parse(JSON.stringify(db)))
}, [])
  return (
      <div>
        {}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Депозитный калькулятор
            </Typography>
          </Toolbar>
        </AppBar>
        <Home credits={credits}/>
      </div>
  );
}

export default App;
