import React,{useState} from 'react'
import {
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  MenuItem,
  InputLabel,
  Select,
  Button,
  Grid,
  Divider,
  colors,
} from '@material-ui/core';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme:Theme) => 
  createStyles({
    button:{
      backgroundColor: theme.palette.primary.main,
    },
}));

interface BasicProps{
  basicInputs:BasicState,
  setBasicInputs:React.Dispatch<React.SetStateAction<BasicState>>
}

const BasicInputs:React.FC<BasicProps> = ({basicInputs,setBasicInputs}) => {
  /* TO DELETE ***
  const [selectedGender,setGender] = useState<string|null>('male')
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(Date.now()),
  );
  const [birthYear,setBirthYear] = useState<Date|null>(new Date(Date.now()))
*/
  const classes = useStyles()
  const handleDateChange = (date: Date|null) => {
    setBasicInputs({...basicInputs,now:date!})
  };

  const handleGender = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBasicInputs({...basicInputs,gender:event.target.value as string})
  }

  return(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid item>
        <KeyboardDatePicker
        format="dd/MM/yyyy"
        margin="normal"
        id="date-picker"
        label="Date"
        value={basicInputs.now}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
       />
      </Grid>
      <Grid item>
        <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time"
              ampm={false}
              value={basicInputs.now}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="secondary" className={classes.button}
          onClick={() => setBasicInputs({...basicInputs,now:new Date(Date.now()) }) }> 
          Reset to now</Button>
      </Grid>
      <Grid item>
        <KeyboardDatePicker
        variant="inline"
        format="yyyy"
        margin="normal"
        id="year-picker"
        label="Birth year"
        value={basicInputs.birthYear}
        onChange={(date: Date | null) => setBasicInputs({...basicInputs,birthYear:date!})}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
       />
      </Grid>
      <Grid item>
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup row value={basicInputs.gender} onChange={handleGender}>
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

export default BasicInputs;