import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
  Grid,
  colors
} from '@material-ui/core';
import { DiZhi, Jiang, Zhi } from "../../../core/liuren/GanZhi";

const useStyles = makeStyles((theme:Theme) => 
  createStyles({
    root:{
      backgroundColor: colors.blue[100],
      margin:'auto',
      maxWidth: 64
    },
    cardcontent:{
      padding:0,
      "&:last-child": {
      paddingBottom: 0
    }
    },
    container:{
      display:'flex',
      width:'100%',
      justifyContent:'space-around',
      alignItems:'flex-end',
      flexWrap:'nowrap'
    },
    jiang:{
      textAlign:'center'
    },
    top:{

    },
    bot:{

    }
}));

interface CardProps{
  className?:any,
  jiang: Jiang,
  bot: Zhi;
  top: Zhi;
}

const ItemCard:React.FC<CardProps> = ({jiang,bot,top}) => {
  const classes = useStyles();
  return(
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.cardcontent}>
        <Typography className={classes.jiang}>
          {jiang.subname}
        </Typography>
        <Divider />
        <Grid container className={classes.container}>
          <Grid item>
            <Typography className={classes.top} variant="h4">
              {top.name}
            </Typography>            
          </Grid>
          <Grid item>
            <Typography className={classes.bot} variant="h6">
              {bot.name}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

    </Card>
  )
}

export default ItemCard;