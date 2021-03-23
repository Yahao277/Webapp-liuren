import React,{useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@material-ui/core'
import {createRecord, fetchData} from './../../redux/actionCreators';
import { AppState } from "./../../redux/store";
import RecordsTable from './components/RecordsTable';
import CreateFormDialog from './components/CreateFormDialog';

import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme:Theme) => 
  createStyles({
    createButton:{
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      backgroundColor: theme.palette.primary.main
    }
}))

const RecordsData = () => {
  const classes = useStyles()
  const articles = useSelector((state: AppState) => state.items);
  const dispatch = useDispatch()
  const [open,setOpen] = useState<boolean>(false)
  const handleClose = () => setOpen(false)
  const handleClick = () => setOpen(true)
  const handleRefresh = () => {
    fetchData(dispatch)
  }

  return(
    <div>
    <Box display="flex"justifyContent="space-between">
      <Typography variant="h2" color="textPrimary">
        Table
      </Typography>
      <div>
        <Button className={classes.createButton} onClick={handleRefresh} variant="contained" color="secondary">
          Refresh
        </Button>
        <Button 
          className={classes.createButton}
          variant="contained" color="secondary"
          onClick={handleClick}
          >Create</Button>
      </div>

    </Box>
    <CreateFormDialog open={open} handleClose={handleClose}></CreateFormDialog>
    <RecordsTable />
    </div>
  )
}

export default RecordsData;