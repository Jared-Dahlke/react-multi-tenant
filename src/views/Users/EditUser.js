import React from "react";
import {connect} from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CustomSelect from '../../components/CustomSelect/CustomSelect'
import CustomTree from '../../components/Tree/CustomTree'
import CustomCheckbox from '../../components/CustomCheckbox/Checkbox'
import Snackbar from '../../components/Snackbar/Snackbar'
import AddAlert from '@material-ui/icons/AddAlert'
import * as v from '../../validations'
import {updateUserData, updateUserRoles, updateUserAccounts, fetchUserAccounts} from '../../redux/actions/users'
import {getTopLevelChecked} from '../../utils'
import PrettyJson from "../../PrettyJson.js";
import {FormLoader} from '../../components/SkeletonLoader'
import DropdownTree from '../../components/Tree/DropdownTree'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

const mapStateToProps = (state) => {
  return { 
    roles: state.roles.data,
    accounts: state.accounts,
    users: state.users,
    editUserUserAccountsLoading: state.editUserUserAccountsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserData: (userData) => dispatch(updateUserData(userData)),
    fetchUserAccounts: (userId)=>dispatch(fetchUserAccounts(userId)),
    updateUserRoles: (user, roles) => dispatch(updateUserRoles(user, roles)),
    updateUserAccounts: (user, accounts) => dispatch(updateUserAccounts(user, accounts)),
  };
};


function EditUser(props) {

  let parsedUserId = JSON.parse(props.match.params.user) 
  const [userIdUnderEdit, setUserIdUnderEdit] = React.useState(parsedUserId)
  const [user, setUser] = React.useState({email:'',firstName:'',lastName:'',company:'',roles:[],accounts:[]})
  const classes = useStyles();
  const [selectedRoles, setSelectedRoles] = React.useState([])
  const [saveButtonDisabled, setSaveButtonDisabled] = React.useState(false)
  const [checkedKeys, setCheckedKeys] = React.useState([])
  const [topLevelCheckedAccounts, setTopLevelCheckedAccounts] = React.useState([])

  const handleFirstNameChange = (text) => {
    let currentUser = {...user}
    currentUser.firstName = text
    setUser(currentUser)
  }

  const onCheck = checkedKeys => {
    setCheckedKeys(checkedKeys)
    if(checkedKeys.checked && checkedKeys.checked.length > 0) {
      let accountsCopy = JSON.parse(JSON.stringify(props.accounts.data))
      let checkedAccounts = getTopLevelChecked(checkedKeys,accountsCopy)
      let accounts = []
      for (const accountId of checkedAccounts) {
        accounts.push({accountId: accountId})
      }
      setTopLevelCheckedAccounts(accounts)
    }
  }

  const handleLastNameChange = (text) => {
    let currentUser = {...user}
    currentUser.lastName = text
    setUser(currentUser)
  }

  const handleEmailChange = (text) => {
    let currentUser = {...user}
    currentUser.email = text
    setUser(currentUser)
  }

  const handleRoleChange = (event) => {
    let currentUser = {...user}
    currentUser.roles = event.target.value
    setUser(currentUser)
  }

  const handleInternalUserChecked = () => {
    let currentUser = {...user}
    let newType = currentUser.userType === 'Internal' ? 'External' : 'Internal'
    currentUser.userType = newType
    setUser(currentUser)
  }

  const formIsValid = () => {
    if ((v.isCompanySuccess(user.company)) && (v.isEmailSuccess(user.email)) && (v.isFirstNameSuccess(user.firstName)) && (v.isLastNameSuccess(user.lastName)) && (v.isRoleSuccess(user.roles)) && checkedKeys.checked && checkedKeys.checked.length > 0) return true
    return false
  }

  const [showAlertMessage, setShowAlertMessage] = React.useState(false);

  const handleSaveClick = () => {
    setSaveButtonDisabled(true)
    props.updateUserData(user)
    let roles= []
    for (const role of user.roles) {
      roles.push({roleId: role})
    }
    props.updateUserRoles(user, roles)   
    let accounts = []
    for (const account of topLevelCheckedAccounts) {
      accounts.push({accountId: account.accountId})
    }
    props.updateUserAccounts(user, accounts)
    setShowAlertMessage(true)
    setTimeout(function() {
      setShowAlertMessage(false)
      setSaveButtonDisabled(false)
    }, 2000)
  }

  

  React.useEffect(() => { 
    if(props.users && props.users.data && props.users.data.length > 0) {
      for (const user of props.users.data) {
             if(user.userId === userIdUnderEdit) {
               let userCopy = JSON.parse(JSON.stringify(user))
               setUser(userCopy)
               let checkedAccounts = {checked: [], halfChecked:[]}
               if(userCopy.accounts){
                 for (const account of userCopy.accounts) {
                   checkedAccounts.checked.push(String(account.accountId))
                 }
                 onCheck(checkedAccounts)
               }             
               return
             }
      }   
    }
  }, [props.users])


  return (
    <div>

        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
            
             
              
              <CardBody>
                <GridContainer>
                  
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Company"
                      id="company-disabled"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: user.company,                      
                      }}
                      
                    />
                  </GridItem>
                

                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'email',
                        value: user.email,
                        onChange: (event)=>handleEmailChange(event.target.value)
                      }}
                      handleClear={()=>handleEmailChange('')}
                      error={v.isEmailError(user.email)}
                      success={v.isEmailSuccess(user.email)}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="First Name"
                      id="first-name"
                      formControlProps={{
                        fullWidth: false
                      }}
                      inputProps={{
                        value: user.firstName,
                        onChange: (event)=>handleFirstNameChange(event.target.value)
                      }}
                      handleClear={()=>handleFirstNameChange('')}
                      error={v.isFirstNameError(user.firstName)}
                      success={v.isFirstNameSuccess(user.firstName)}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="Last Name"
                      id="last-name"
                      formControlProps={{
                        fullWidth: false
                      }}
                      inputProps={{
                        value: user.lastName,
                        onChange: (event)=>handleLastNameChange(event.target.value)
                      }}
                      handleClear={()=>handleLastNameChange('')}
                      error={v.isLastNameError(user.lastName)}
                      success={v.isLastNameSuccess(user.lastName)}
                    />
                  </GridItem>

                  <GridItem xs={10} sm={10} md={10}>
                    <CustomSelect
                      roles={props.roles}
                      labelText='Role'
                      handleItemSelect={handleRoleChange}
                      value={user.roles}
                      multiple={true}
                      success={v.isRoleSuccess(user.roles)}
                      formControlProps={{
                        fullWidth: true
                      }}
                     
                    />
                  </GridItem>

                  {
                    selectedRoles.includes(11) || true ?  //TODO: make sure user only sees tree if they are admin

                      <GridItem xs={12} sm={12} md={8}>
                        {props.accounts.data && props.accounts.data.length > 0 && !props.editUserUserAccountsLoading ?
                        
                        <DropdownTree data={props.accounts.data}/>
                       
                        :
                        <FormLoader/>
                        }
                      </GridItem>

                      :

                      null
                  }


                  <GridItem xs={12} sm={12} md={12}>
                    <CustomCheckbox
                      checked={user.userType === 'Internal'}
                      //tabIndex={-1}
                      changed={handleInternalUserChecked}
                      formControlProps={{
                        fullWidth: true
                      }}
                      labelText="Internal User"                 
                    />             
                  </GridItem>
                
                
                </GridContainer>         
                
              </CardBody>
              <CardFooter>
                <Button disabled={!formIsValid() || saveButtonDisabled} onClick={handleSaveClick} color="primary">Save</Button>
              </CardFooter>
            </Card>
          </GridItem>
          
        </GridContainer>

        <Snackbar
          place="bc"
          color="success"
          //icon={AddAlert}
          message="User created and Signup invitation is sent"
          //open={showAlertMessage}
          //closeNotification={() => setShowAlertMessage(false)}
          close
        />

        <Snackbar
          place="bc"
          color="success"
          icon={AddAlert}
          message="User info is saved"
          open={showAlertMessage}
          closeNotification={() => setShowAlertMessage(false)}
          close
        />

          
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
