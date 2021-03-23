import React, { useState } from 'react';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import {
  Grid,
  Button,
  colors
} from '@material-ui/core'
import Sanchuan from './Main/components/Sanchuan';
import Sike from './Main/components/Sike';
import TiandiState from './Main/components/TiandiState';

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
  mainContainer:{

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

const MainContent:React.FC = () => {
  const classes = useStyles()
  return (
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
  )
}

const TestView:React.FC<Props> = ({className,...rest}) => {
  const classes = useStyles()
  
  return(
    <MainContent>
    </MainContent>
  )
}

export default TestView