import React, { useState,useContext } from "react";
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Grid,
  colors,
  Paper
} from '@material-ui/core'
import { LiurenContext } from "..";

const useStyles = makeStyles((theme:Theme) => 
createStyles({
  root:{
    display:'flex',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    padding: theme.spacing(1)
  },
  sikeItem:{    
    margin: theme.spacing(1)
  },
  itemContainer:{
    display:'flex',
    flexDirection:'column',
    margin: theme.spacing(0.5)
  },
  paper:{
    alignContent:'center'
  }
}));

interface SikeProps {
  item:SikePair
}

const SikeItem = ({item}:SikeProps) => {
  const classes = useStyles()

  return(
    <Paper variant="outlined" className={classes.paper}>
      <Grid container className={classes.itemContainer}>
        <Grid item> {item.jiang.subname}</Grid>
        <Grid item> {item.top.name}</Grid>
        <Grid item> {item.bot.name}</Grid>
      </Grid>
    </Paper>
  )
}


const Sike = () => {
  const classes = useStyles();
  const liuren = useContext(LiurenContext)
  return (
    <Grid container className={classes.root}>
      {liuren?.sike.map((item,idx) => (
          <Grid item key={idx} className={classes.sikeItem}>
            <SikeItem item={item} />
          </Grid>
        ))}
    </Grid>
  )
}

export default Sike