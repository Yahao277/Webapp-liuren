import React,{useState} from 'react'
import {
  Paper,
  Box,
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BasicInputs from './BasicInputs'
import FastCreateInputs from './FastCreateInputs'
import { Jiang,Zhi,Gan,TianJiang as J,DiZhi as D,TianGan as T  } from '../../../core/liuren/GanZhi';
import { useDispatch, useSelector } from 'react-redux';
import {createRecord} from '../../../redux/actionCreators';
import Liuren from '../../../core/liuren/liuren'

const useStyles = makeStyles((theme:Theme) => 
  createStyles({
    root:{
      backgroundColor: colors.blue[500],
      maxWidth: '100%',
      maxHeight: '100%'
    },
}));

interface Props{
  open:boolean,
  handleClose:() => void,
}

const CreateForm = ({open,handleClose}:Props) => {
  const [useMethod,setMethod] = useState(1)
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const dispatch = useDispatch();
  const [basicInputs,setBasicInputs] = useState<BasicState>({
    gender:'male',
    now: new Date(Date.now()),
    birthYear: new Date(Date.now())
  })
  const [fastInputs,setFastInputs] = useState<FastState>({
    yueJiang:'辰',
    hour:'卯',
    isNight:false,
    dayGan:'戊',
    dayZhi:'申'
  })
  const handleMethod = (event: React.ChangeEvent<{ value: unknown }>) => setMethod(event.target.value as number);

  const handleCreate = () => {
    //TODO: validate() 

    if(useMethod === 1){
      try{
        const liuren = new Liuren({
          yueJiang: D.getByName(fastInputs.yueJiang),
          hour: D.getByName(fastInputs.hour),
          day:{gan:T.getByName(fastInputs.dayGan),zhi:D.getByName(fastInputs.dayZhi)},
          night: fastInputs.isNight
        })

        dispatch(createRecord({
        id:0,
        status:'unsaved',
        content: liuren,
        yueJiang: fastInputs.yueJiang,
        hour:fastInputs.hour,
        dayGan:fastInputs.dayGan,
        dayZhi:fastInputs.dayZhi,
        title: title,
        description: description
      }))
      }catch(e){
        throw Error(e)
      }

    }else if(useMethod === 0){
      console.log("正时起课")
    }else if(useMethod === 2){
      console.log("活时起课")
    }
    handleClose()
  }
  return(
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create a new Liuren state</DialogTitle>
      <DialogContent>
        <DialogContentText>
        </DialogContentText>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item>
              <FormControl>
              <InputLabel id="create-method">Method</InputLabel>
              <Select
                id="select-method"
                value={useMethod}
                onChange={handleMethod}
              >
                <MenuItem value={0}>正时起课</MenuItem>
                <MenuItem value={2}>活时起课</MenuItem>
                <MenuItem value={1}>自定六壬</MenuItem>
              </Select>
            </FormControl>
            </Grid>
            <Grid item>
              <TextField label="Title" value={title} onChange={(event)=>setTitle(event.target.value)} ></TextField>
            </Grid>
            <Grid item>
              <TextField label="description" value={description} onChange={event => setDescription(event.target.value)}></TextField>
            </Grid>
            {/* Method entry form */}
            {/**Date picker */}
            {useMethod === 0 && <BasicInputs basicInputs={basicInputs} setBasicInputs={setBasicInputs}/>}
            <Divider></Divider>
            {useMethod === 1 && <FastCreateInputs fastInputs={fastInputs} setFastInputs={setFastInputs}/>}
          </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateForm