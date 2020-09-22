import React from 'react';
//import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Button from '../components/CustomButtons/Button'

import {defaultFont, whiteColor} from '../assets/jss/material-dashboard-react.js'

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    backgroundColor: whiteColor,
    ...defaultFont
  }
}));

export default function AlertDialog(props) {

  const classes = useStyles();

  return (
  
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        className: classes.paperStyle
      }}
    >
      <DialogTitle id="alert-dialog-title">{props.titleText}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>
          {props.cancelText}
        </Button>
        <Button onClick={props.handleConfirm} color="primary" autoFocus>
          {props.proceedText}
        </Button>
      </DialogActions>
    </Dialog>
   
  );
}
