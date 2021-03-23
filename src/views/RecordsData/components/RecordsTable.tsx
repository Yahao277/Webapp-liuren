import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from "./../../../redux/store";
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import {
  Grid,
  colors,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Paper
} from '@material-ui/core'
import {
  Delete as DeleteIcon,
  Save as SaveIcon
} from '@material-ui/icons'
import { requestSave,requestDelete} from '../../../redux/actionCreators'

const useStyles = makeStyles((theme:Theme) => 
  createStyles({
    root: {
      width:700
    }
}))

const RecordsTable = () => {
  const classes = useStyles()
  const rows = useSelector((state:AppState) => state.items);
  const dispatch = useDispatch()

  const handleSave= (id:number) => {
    console.log('clicked '+id)
    const found = rows.find(row => row.id === id)
    requestSave(found!,dispatch)
  }

  const handleDelete = (_id:string) => {
    console.log('delete '+_id)
    const found = rows.find(row => row._id === _id)
    requestDelete(found!,dispatch)
  }

  return (
   <TableContainer component={Paper} className={classes.root}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">日柱</TableCell>
            <TableCell align="right">时辰</TableCell>
            <TableCell align="right">月将</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.dayGan}{row.dayZhi}</TableCell>
              <TableCell align="right">{row.hour}</TableCell>
              <TableCell align="right">{row.yueJiang}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">
                {row.status !== 'saved' && <IconButton onClick={()=>handleSave(row.id)}><SaveIcon color="secondary" /></IconButton>}
                <IconButton onClick={()=>handleDelete(row._id)}><DeleteIcon color="secondary" /></IconButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RecordsTable;