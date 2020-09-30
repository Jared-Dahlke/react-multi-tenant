import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GridContainer from '../../components/Grid/GridContainer'

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import { blackColor, whiteColor } from '../../assets/jss/material-dashboard-react';
import {Formik} from 'formik'
import FormikInput from '../../components/CustomInput/FormikInput'
import * as v from '../../validations'
import Card from '@material-ui/core/Card'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  table: {
   // maxWidth: 300,
   // alignSelf: 'left'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} style={{backgroundColor: whiteColor}} />
    </Draggable>
  );
}

function TableText(props) {
  return (
    <DialogContentText style={{color: props.header ? blackColor : '', marginBottom: 0, fontSize: '10px'}}>{props.text}</DialogContentText>
  )
}

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [editing, setEditing] = React.useState(false)
  console.log('props from dialog')
  console.log(props)

  let account = props.nodeData && props.nodeData.accountId ? props.nodeData : {accountName: '', accountId: 'placeholder'}

  return (

    <Card style={{
      backgroundColor: whiteColor,
      justify: "center", minWidth: '150px'}}>

       

          <Divider/>

       

          <Table className={classes.table} size="small" aria-label="a dense table">
              
              <TableBody>

                  <TableRow key={'01'} justify="center">
                  
                          <TableText text={account.accountName} header/>
                   
                                                 
                  </TableRow>
                
                  <TableRow key={'0'}>
                    <TableCell component="th" scope="row">
                          <TableText text={'Type'} header/>
                    </TableCell>
                    <TableCell component="th" scope="row">
                          <TableText text={account.accountTypeName}/>
                    </TableCell>                                 
                  </TableRow>

                  <TableRow key={'1'}>
                    <TableCell component="th" scope="row">
                    <TableText text={'Name'} header/>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TableText text={account.contactName}/>                       
                    </TableCell>                                 
                  </TableRow>

                  <TableRow key={'2'}>
                    <TableCell component="th" scope="row">
                      <TableText text={'Email'} header/>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TableText text={account.contactEmail}/>              
                    </TableCell>                                 
                  </TableRow>
                
              </TableBody>
            </Table>


          
        

 


      </Card>
    
  );
}