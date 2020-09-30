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
    <DialogContentText style={{color: props.header ? blackColor : '', marginBottom: 0}}>{props.text}</DialogContentText>
  )
}



export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [editing, setEditing] = React.useState(true)
  console.log('props from dialog')
  console.log(props)

  

  
  let account = props.account && props.account.accountId ? props.account : {accountName: '', accountId: 'placeholder', contactName: '', contactEmail: ''}

  return (
    <Formik
      validateOnMount={true}
      initialValues={{
        
        contactName: 'adf', // account.contactName ,
        contactEmail: 'asdfaff' // account.contactEmail      
    }}     
    > 
    {formik => (
    <div>

      <Dialog
        open={props.open}
        onClose={props.handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {account.accountName}
        </DialogTitle>
        <DialogContent>

          <Divider/>

        {
          editing ?

          <div>

          <FormikInput 
            name="contactName" 
            validate={v.isBrandProfileNameError}
            labelText="Contact Name" 
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{            
                    
            }}
            inputColor={blackColor}
          />

          <FormikInput 
            name="contactEmail" 
            validate={v.isEmailError}
            labelText="Contact Email" 
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{            
                    
            }}
            inputColor={blackColor}
          />


          </div>

          

          :

          <Table className={classes.table} size="small" aria-label="a dense table">
              
              <TableBody>
                
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
                    <TableText text={'Contact Name'} header/>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TableText text={account.contactName}/>                       
                    </TableCell>                                 
                  </TableRow>

                  <TableRow key={'2'}>
                    <TableCell component="th" scope="row">
                      <TableText text={'Contact Email'} header/>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TableText text={account.contactEmail}/>              
                    </TableCell>                                 
                  </TableRow>
                
              </TableBody>
            </Table>


        }

          
        

        </DialogContent>
        <DialogActions>
          
          {
            editing ?
            <div>

              <Button autoFocus onClick={()=>props.handleSave(formik.values)} color="primary">
                Save
              </Button>

              <Button autoFocus onClick={()=>setEditing(false)} color="primary">
                Cancel
              </Button>

            </div>

            

            :

            <div>

              <Button autoFocus onClick={()=>setEditing(true)} color="primary">
                Edit
              </Button>

              <Button autoFocus onClick={props.handleClose} color="primary">
                Cancel
              </Button>

            </div>


          }
          
          
        </DialogActions>
      </Dialog>


      {/** <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Account Details
            </Typography>
            <Button autoFocus color="inherit" onClick={props.handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemText primary="Account Name" secondary={account.accountName} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Parent Account" secondary={account.parentAccountName} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Children Accounts" />
          </ListItem>

          <ListItem>

            <TableContainer className={classes.table} component={Paper}>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Margin</TableCell>    
                        <TableCell align="right">Type</TableCell>                   
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {account.children && account.children.length > 0 && account.children.map(child=>{
                      return (
                        <TableRow key={child.accountId}>
                          <TableCell component="th" scope="row">
                            {child.accountName}
                          </TableCell>
                          <TableCell align="right">{child.accountMargin}</TableCell>
                          <TableCell align="right">{child.accountTypeName}</TableCell>                         
                        </TableRow>
                      )
                    })}
                    </TableBody>
                  </Table>
                </TableContainer>
                
            
          </ListItem>
        </List>
      </Dialog>
    */}
      </div>
    )}
    </Formik>
  );
}