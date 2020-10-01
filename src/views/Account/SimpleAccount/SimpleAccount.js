/*eslint-disable no-restricted-globals*/
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import Snackbar from "@material-ui/core/Snackbar";
import AddAlert from "@material-ui/icons/AddAlert";
import debounce from 'just-debounce-it';

import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'

// Redux
import { userProfileFetchData } from "../../../redux/actions/auth.js";
import { connect } from "react-redux";
import { updateUserData } from "../../../redux/actions/users.js";


import {FormLoader} from '../../../components/SkeletonLoader'
import {Formik, useFormikContext} from 'formik'
import FormikInput from '../../../components/CustomInput/FormikInput'
import FormikSelect from '../../../components/CustomSelect/FormikSelect'
import * as Yup from "yup";
import {getCurrentAccount} from '../../../utils'
import { whiteColor } from "../../../assets/jss/material-dashboard-react.js";
import {updateAccount, deleteAccount, setCurrentAccount} from "../../../redux/actions/accounts"
//import {FormLoader} from '../../../components/SkeletonLoader'


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  minWidth: {
    minWidth: "30px",
  },
  green: {
    color: "green",
  },
};

const useStyles = makeStyles(styles);

const mapStateToProps = (state) => {
  return {
    currentAccountId: state.currentAccountId,
    accounts: state.accounts,
    accountTypes: state.accountTypes
   
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProfile: () => dispatch(userProfileFetchData()),
    updateUserData: (userData) => dispatch(updateUserData(userData)),
    updateAccount: (account)=> dispatch(updateAccount(account)),
    deleteAccount: (accountId)=> dispatch(deleteAccount(accountId))
  };
};


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
  accountName: Yup.string()
    .min(2, "Must be greater than 1 character")
    .max(50, "Must be less than 50 characters")
    .required('Required'),
  contactName: Yup.string()
    .min(2, "Must be greater than 1 character")
    .max(50, "Must be less than 50 characters")
    .required('Required'),
  contactEmail: Yup.string()
    .email('Invalid email')
    .required('Required'),
  accountMargin: Yup.number()
    .typeError('Account margin must be a number')
    .min(0, "Margin must be a positive number")
    .max(3000, "Margin cannot be greater than 3000")
    .required('Required'),
  accountType: Yup.object()
    .shape({
      label: Yup.string(),
      value: Yup.number()
    })
    .nullable()
    .required("Account Type is required")
  
});

function UserProfile(props) {

  console.log(props)

  const classes = useStyles();

  const [current, setCurrent] = React.useState({})

  const handleCreateChild=()=> {
    console.log(current)
    let childAccount = {
      accountName: 'Child',
      accountTypeId: props.accountTypes[0].accountTypeId,
      accountLevelId: 'current accountlevelid + 1 max 3'

    }
  }

  const handleDeleteAccount=()=>{
    if (confirm('Are you sure you want to delete this account?')) {
      props.deleteAccount(props.currentAccountId)    
    } else {

    }
    
  }

  const formatAccountTypes=(accountTypes)=>{
    let newAccountTypes = []
    for (const accountType of accountTypes) {
      newAccountTypes.push({value: accountType.accountTypeId, label: accountType.accountTypeName})
    } 
    return newAccountTypes
  }

  const formatCurrentAccountType =(currentAccount)=>{
    if(!currentAccount) return {value: '', label: ''}
    return {value: currentAccount.accountTypeId, label: currentAccount.accountTypeName}
  }

  const handleMySubmit=(values)=>{
    let account={
      accountId: values.accountId,
      accountName: values.accountName,
      accountMargin: values.accountMargin,
      contactEmail: values.contactEmail,
      contactName: values.contactName,
      accountTypeId: values.accountType.value,
      accountTypeName: values.accountType.label
    }
    props.updateAccount(account)
  }


  let currentAccount = React.useMemo(() => {
    let current = getCurrentAccount(props.accounts.data)
    setCurrent(current)
    return current
  
  }, [props.accounts.data]);
  
  let allAccountTypes = React.useMemo(() => formatAccountTypes(props.accountTypes), [props.accountTypes, currentAccount]);

  let currentAccountType = React.useMemo(() => formatCurrentAccountType(currentAccount), [currentAccount])
  

  let accountLoading = false
 
  if(!currentAccount) {
    accountLoading = true
    currentAccount = {
      accountId: 'placeholder', 
      accountName: '', 
      accountTypeName: '', 
      accountTypeId: '', 
      contactName: '', 
      contactEmail: '',
      accountMargin: '',
      parentAccountName: ''
    }
  }



  return (
    <Formik
      enableReinitialize
      validateOnMount={false}
     // validateOnChange={true}
      validationSchema={() => schemaValidation}
      initialValues={{
        
        accountName: currentAccount.accountName,
        contactName: currentAccount.contactName,
        contactEmail: currentAccount.contactEmail,
        accountMargin: currentAccount.accountMargin,
        accountType: currentAccountType,
        parentAccountName: currentAccount.parentAccountName,
        accountId: currentAccount.accountId
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
   
      <GridContainer>


        <GridItem xs={12} sm={12} md={8}>
          <Card>
            {accountLoading ?
            <FormLoader/>
          :
          <div>
          
              
            <CardBody>
              
              <GridContainer>
               

              <Grid container justify="flex-end">

<GridItem> 
    <Button  color="primary" onClick={handleCreateChild}>Create Child Account</Button>
</GridItem>


</Grid>


                <GridItem xs={12} sm={12} md={8}>
                  <FormikInput
                    name="accountName"
                    labelText="Account Name"
                    id="accountName"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{                  
                    }}                 
                  />

              

                  <FormikInput 
                    name="parentAccountName"                   
                    labelText="Parent Account" 
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{        
                      disabled: true                              
                    }}              
                  />

                  <FormikInput 
                    name="contactName"                  
                    labelText="Contact Name" 
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{                                      
                    }}            
                  />

                  <FormikInput 
                    name="contactEmail"                   
                    labelText="Contact Email" 
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{                                      
                    }}              
                  />
                  <FormikInput 
                    name="accountMargin"                   
                    labelText="Account Margin" 
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{                                      
                    }}              
                  />
               
                  <FormikSelect
                    id="accountType"
                    name="accountType"
                    label="Account Type"
                    placeholder="Select an Account Type"
                    options={allAccountTypes}
                    value={values.accountType}
                    isMulti={false}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    validateField={validateField}
                    validateForm={validateForm}
                    touched={touched.accountType}
                    error={errors.accountType}
                    isClearable={true}
                    backspaceRemovesValue={true}
                  />             
                
                </GridItem>
              
              </GridContainer>
            
             
            </CardBody>
           

            <CardFooter>  
            <Button color="danger" onClick={handleDeleteAccount}>
              Delete
            </Button>

            <Button color="primary" onClick={()=>handleMySubmit(values)}>
              Save
            </Button>
              <Snackbar
                place="bc"
                color="success"
                icon={AddAlert}
                message="User profile was updated"
               // open={showAlertMessage}
                // closeNotification={() => setShowAlertMessage(false)}
                // close
              />
            </CardFooter>
            </div>
        } 
            
          </Card>
        </GridItem>

        
      </GridContainer>
    
    )}
    />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
