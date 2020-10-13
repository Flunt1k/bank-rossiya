import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';

import Home from './pages/Home';
import db from './depcalc.json';

const App = () => {
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
        <Home credits={JSON.parse(JSON.stringify(db))}/>
      </div>
  );
}

export default App;
