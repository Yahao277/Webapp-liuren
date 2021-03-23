import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import {
  Grid,
  Button,
  Box,
  Typography,
  colors
} from '@material-ui/core'
import Sanchuan from './components/Sanchuan';
import Sike from './components/Sike';
import TiandiState from './components/TiandiState';
import SelectDialog from './SelectDialog'
import { fetchData,fetchSuccess } from '../../redux/actionCreators';
import Liuren from '../../core/liuren/liuren'
import axios from 'axios'
import { Jiang,Zhi,Gan,TianJiang as J,DiZhi as D,TianGan as T  } from './../../core/liuren/GanZhi';

const useStyles = makeStyles((theme:Theme) => 
createStyles({
  root: {
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '50%',
    flexDirection:'column'
  },
  selectButton:{

  },
  sanchuanContainer:{
    backgroundColor:colors.deepPurple[300]
  },
  sikeContainer:{
    backgroundColor: colors.teal[300]
  },
  stateContainer:{
    backgroundColor: colors.lime[300]
  }
}))

interface Props {
  className?:string,
  namesList?:string[]
}

export const LiurenContext = React.createContext<Liuren|undefined>(undefined)

const MainContent:React.FC = () => {
  const classes = useStyles()
  const [open,setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<ILiuren|undefined>();
  const dispatch = useDispatch()

  const handleClose = (value: ILiuren|undefined) => {
    setOpen(false);
    try{
     setSelectedValue(value)
    }catch(e){
      throw new Error(e)
    }
  };
  const handleClick = () => {
    setOpen(true)
  }

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
      <Typography variant="h2" color="textPrimary">
        Title: {selectedValue?.title}
      </Typography>
      <div>
        <Button 
          className={classes.selectButton}
          variant="contained" color="secondary"
          onClick={handleClick}
          >Select</Button>
      </div>
    <SelectDialog open={open} onClose={handleClose} selectedValue={selectedValue}/>
    </Box>
    <LiurenContext.Provider value={selectedValue?.content}>
      <Grid container className={classes.root}>
        <Grid item className={classes.sanchuanContainer}>
          <Sanchuan/>
        </Grid>
        <Grid item className={classes.sikeContainer}>
          <Sike/>
        </Grid>
        <Grid item className={classes.stateContainer}>
          <TiandiState />
        </Grid>
      </Grid>
    </LiurenContext.Provider>

    

    </div>
  )
}

export default MainContent