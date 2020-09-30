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
import FormikSelect from '../../components/CustomSelect/FormikSelect'
import * as Yup from "yup";
import {Debug} from '../Debug'

import * as v from '../../validations'

import "./styles.css";
import { findAccountNodeByAccountId } from '../../utils';

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
      <Paper {...props} style={{backgroundColor: whiteColor, height:'400px'}} />
    </Draggable>
  );
}

function TableText(props) {
  return (
    <DialogContentText style={{color: props.header ? blackColor : '', marginBottom: 0}}>{props.text}</DialogContentText>
  )
}

const schemaValidation = Yup.object().shape({
  users: Yup.array()
    .min(1, "Select at least one field")
    .of(
      Yup.object()
        .shape({
          label: Yup.string(),
          value: Yup.string()
        })
        .transform(v => v === '' ? null : v)
    ),
  disclosureStatus: Yup.object()
    .shape({
      label: Yup.string(),
      value: Yup.number()
    })
    .nullable()
    .required("Status is required")
});




export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [editing, setEditing] = React.useState(true)
  const [selectedRoles, setSelectedRoles] = React.useState([])
 

  const handleSelectUser=(event)=> {
    setSelectedRoles(event.target.value)
  }

  console.log('props from dialog')
  console.log(props)

  const convertUsers = (users)=>{
    let newUsers = []
      if(users && users.length > 0) {
        for (const user of users) {
          newUsers.push({value: user.userId, label: user.firstName + ' ' + user.lastName})
        }

      }
      
      return newUsers
  }

  const getCurrentAccountUsers=(accounts)=>{
    let currentAccountUsers = []
    if (props.account && props.account.accountId) {
      let currentAccountId =  props.account.accountId
      let currentAccount = findAccountNodeByAccountId(currentAccountId,accounts)
      if (currentAccount.users && currentAccount.users.length > 0) {
        for (const user of currentAccount.users) {
          currentAccountUsers.push({value: user.userId, label: user.firstName + ' ' + user.lastName})
        }

      }
      

    }
    

    return currentAccountUsers
  }

  

  const allUsers = React.useMemo(() => convertUsers(props.users.data), [props.users.data]);

  const accountUsers = React.useMemo(() => getCurrentAccountUsers(props.accounts.data), [props.accounts.data]);

  console.log('all accounts')
  //console.log(allAccounts)
     
  
  //const allUsers = [{value: 1, label: 'Joe'},{value: 2, label: 'Sue'},{value: 3, label: 'John'}]

  
  let account = props.account && props.account.accountId ? props.account : {accountName: '', accountId: 'placeholder', contactName: '', contactEmail: ''}

  return (
    <Formik
      enableReinitialize
      validateOnMount={true}
      validateOnChange={true}
      validationSchema={() => schemaValidation}
      initialValues={{
        
        contactName: account.contactName ? account.contactName : '', // account.contactName ,
        contactEmail: account.contactEmail ? account.contactEmail : '', // account.contactEmail     
        accountTypeName: account.accountTypeName ? account.accountTypeName : '' ,
        users: accountUsers,
        brandType: 'Brand'
    }} 
    render={({
      values,
      errors,
      touched,
      setFieldValue,
      setFieldTouched,
      validateField,
      validateForm,
      isSubmitting
    }) => (
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



            <FormikSelect
            id="users"
            name="users"
            label="Users"
            placeholder="Select Users"
            options={allUsers}
            value={values.users}
            isMulti={true}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            validateField={validateField}
            validateForm={validateForm}
            touched={touched.users}
            error={errors.users}
            isClearable={true}
            backspaceRemovesValue={true}
          />

           

          <FormikInput 
            name="brandType" 
            validate={v.isEmailError}
            labelText="Contact Email" 
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{            
                    
            }}
            inputColor={blackColor}
          />

<pre style={{color:'black'}}>Errors: {JSON.stringify(errors)}</pre>
<pre style={{color:'black'}}>Touched: {JSON.stringify(touched)}</pre>

         


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

              <Button autoFocus onClick={()=>props.handleSave(values)} color="primary">
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


      </div>
    )}
    />
  );
}