import React,{useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { AppState } from "../../redux/store";

export interface DialogProps {
  open: boolean;
  selectedValue: ILiuren | undefined;
  onClose: (value: ILiuren|undefined) => void;
}

const SelectDialog = ({open,selectedValue,onClose}:DialogProps) => {
  const selector = useSelector((state:AppState) => state.items)
  const handleClose = () => onClose(selectedValue)
  const handleClick = (value:ILiuren) => onClose(value)
  return(
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Select</DialogTitle>
      <List>
        {selector.map((item,index)=>(
          <ListItem button key={index} onClick={() => handleClick(item)}>
            <ListItemText>{item.id} - {item.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

export default SelectDialog