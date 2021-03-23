import React, { useState,useContext } from "react";
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Grid,
  colors,
  Paper,
  Toolbar,
  Button,
  Typography
} from '@material-ui/core'
import { LiurenContext } from "..";
import { SanChuanPair } from "../../../core/liuren/SanChuan";

const useStyles = makeStyles((theme:Theme) => 
createStyles({
  root:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center'
  },
  item:{
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  bar:{

  },
  paper:{
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  }
}));

interface ItemProps {
  pair:SanChuanPair
}



const SanchuanItem = ({pair}:ItemProps) => {
  const classes = useStyles();
  const data = [
    {name: pair.dayRelation},
    {name: pair.dunGan?.name},
    {name: pair.item.name},
    {name: pair.jiang?.subname}
  ]
  console.log(data)
  return(
    <Paper variant="outlined" className={classes.paper}> 
      <Grid container>
        {data.map((item,index) => (
          <Grid item key={index} className={clsx(classes.item)}>
            <Typography color="textPrimary"
              gutterBottom
              variant="h4">
                {item.name}
              </Typography>  
            </Grid>
        ))}
      </Grid>
    </Paper>

  )
}


const Sanchuan = () => {
  const classes = useStyles();
  const liuren = useContext(LiurenContext)
  return (
    <Grid container className={classes.root}>
      {liuren?.sanChuan?.map((item,idx) => (
          <Grid item key={idx} className={classes.item}> 
            <SanchuanItem pair={item}/>
          </Grid>
      ))}
    </Grid>
  )
}

export default Sanchuan