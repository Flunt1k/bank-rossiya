import React from 'react';
import {v4} from 'uuid'

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { Credit } from '../interfaces';

interface CalculatorLeftSideProps {
  deposits: Credit[]
}

const CalculatorLeftSide: React.FC<CalculatorLeftSideProps> = ({
    deposits
}: CalculatorLeftSideProps): React.ReactElement => {
  const [creditType, setCreditType] = React.useState('');

  const handleChange = (event: any) => {
    setCreditType(event.target.value);
  };
  return(
      <FormControl variant="outlined" style={{width: '100%'}}>
        <InputLabel id="demo-simple-select-outlined-label">Тип кредита</InputLabel>
        <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={creditType}
            onChange={handleChange}
            label="Age"
        >
          <MenuItem value="">
            <em>Тип кредита</em>
          </MenuItem>
          {deposits?.map((credit:Credit) =>
              <MenuItem value={credit.code} key={v4()}>{credit.name}</MenuItem>)}*
        </Select>
      </FormControl>
  )
}

export default CalculatorLeftSide
