import React, {useState} from 'react'
import { Jiang,Zhi,Gan,TianJiang as J,DiZhi as Z,TianGan as G  } from '../../../core/liuren/GanZhi';
import {
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
  Switch,
} from '@material-ui/core';

interface FastProps{
  fastInputs:FastState,
  setFastInputs:React.Dispatch<React.SetStateAction<FastState>>
}

const FastCreateInputs:React.FC<FastProps> = ({fastInputs,setFastInputs}) => {
  /* TO DELETE
  const [yueJiang,setYueJiang] = useState<string|null>('子');
  const [hour,setHour] = useState<string|null>('子');
  const [dayGan,setDayGan] = useState<string|null>('甲');
  const [dayZhi,setDayZhi] = useState<string|null>('子');
    */
  return (
    <Grid container alignItems="flex-start" spacing={2}>
      <Grid item >
        <FormControl>
          <InputLabel id="yue-jiang">月将</InputLabel>
          <Select
            id="select-yue-jiang"
            value={fastInputs.yueJiang}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => setFastInputs({...fastInputs,yueJiang:event.target.value as string})}
          >
            {Z.Serie.map(item => (
              <MenuItem value={item.name}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel id="hour">占时</InputLabel>
          <Select
            id="select-hour"
            value={fastInputs.hour}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => setFastInputs({...fastInputs,hour:event.target.value as string})}
          >
            {Z.Serie.map(item => (
              <MenuItem value={item.name}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel id="day-gan">日干</InputLabel>
          <Select
            id="select-day-gan"
            value={fastInputs.dayGan}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => setFastInputs({...fastInputs,dayGan:event.target.value as string})}
          >
            {G.Serie.map(item => (
              <MenuItem value={item.name}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel id="day-zhi">日支</InputLabel>
          <Select
            id="select-day-zhi"
            value={fastInputs.dayZhi}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => setFastInputs({...fastInputs,dayZhi:event.target.value as string})}
          >
            {Z.Serie.map(item => (
              <MenuItem value={item.name}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <FormControlLabel
            control={<Switch checked={fastInputs.isNight}  size="small"
            onChange={(event: React.ChangeEvent<{ checked: unknown }>) => setFastInputs({...fastInputs,isNight:event.target.checked as boolean})} 
            name="夜占" />}
            label="夜占"
            labelPlacement="top"
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default FastCreateInputs