import React, { useState,useContext } from "react";
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Grid,
  colors,
  Paper,
  Toolbar,
  Button,
  Typography,
  Card,
  CardContent,
  Container
} from '@material-ui/core'
import { DiZhi as D } from "./../../../core/liuren/GanZhi";
import ItemCard from './ItemCard';
import './TiandiState.scss'
import { LiurenContext } from "..";

const useStyles = makeStyles((theme:Theme) => 
createStyles({
  root:{
    backgroundColor: colors.blue[500],
    maxWidth: '100%',
    maxHeight: '100%'
  },
  card:{

  },
  cardcontent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    }
  },
  cardStyle:{
    backgroundColor: colors.blueGrey[200],
    width:'100%',
    margin:theme.spacing(0.5),
    textAlign:'center'
  }
}));

const items = D.Serie.map(item => item.name)

const TiandiState = () => {
  const classes = useStyles();
  const liuren = useContext(LiurenContext)
  return (
    <Container className={classes.root}>
      <div className="grid-container">
        <div className="Title">Title</div>
        {liuren?.state.getSequence().map((item,idx) => (
          <div key={idx} className={clsx(item,classes.cardStyle)}>
            <ItemCard jiang={item.jiang!} bot={item.bot} top={item.top}/>
          </div>
        ))}
      </div>

      {/*<Grid container>
        {items.map(item => (
          <Grid item>
            <Card> 
              <CardContent className={classes.cardcontent}>
              {item.name}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>*/}


    </Container>
  )
}

export default TiandiState;