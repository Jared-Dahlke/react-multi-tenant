/* eslint-disable semi, indent, no-mixed-operators, no-underscore-dangle */
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import GridItem from "../../components/Grid/GridItem.js"
import GridContainer from "../../components/Grid/GridContainer.js"
import CustomInput from "../../components/CustomInput/CustomInput.js"
import Button from "../../components/CustomButtons/Button.js"
import Card from "../../components/Card/Card.js"
import CardBody from "../../components/Card/CardBody.js"
import CardFooter from "../../components/Card/CardFooter.js"
import {connect} from 'react-redux'
import {createUser} from '../../redux/actions/users'
import CustomCheckbox from "../../components/CustomCheckbox/Checkbox"
import CustomSelect from "../../components/CustomSelect/CustomSelect.js"
import Snackbar from "../../components/Snackbar/Snackbar"
import AddAlert from '@material-ui/icons/AddAlert'
import * as v from '../../validations'
import CustomTree from '../../components/Tree/CustomTree'
import { User } from "../../models/user.js"
import {getTopLevelChecked} from '../../utils'


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
  },
  alignRight: {
    float: "right",
    
  },
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: .5,
    margin: .5,
  },
  chip: {
    margin: .5,
  },
}

const useStyles = makeStyles(styles)


const mapStateToProps = (state) => {
  return {
    roles: state.roles.data,
    hasErrored: state.rolesHasErrored,
    isLoading: state.rolesIsLoading,
    accounts: state.accounts,
    currentAccountId: state.currentAccountId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewUser: (user) => dispatch(createUser(user))
  }
}


function CreateUser  (props) {
 
  const [selectedRoles, setSelectedRoles] = React.useState([])
  const [internalUserChecked, setInternalUserChecked] = React.useState(false)
  const [email, setEmail] = React.useState('test@xyz.com')
  const [firstName, setFirstName] = React.useState('testFirst')
  const [lastName, setLastName] = React.useState('testLast')
  const [company, setCompany] = React.useState('testCompanyxuzx')
  const [inviteButtonDisabled, setInviteButtonDisabled] = React.useState(false)

  const [checkedKeys, setCheckedKeys] = React.useState([])
  const [topLevelCheckedAccounts, setTopLevelCheckedAccounts] = React.useState([])


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



  const handleRoleSelect = (event) => {
    setSelectedRoles(event.target.value)
  }

  function handleEmailChange (event) {
    setEmail(event.target.value)
  }

  function handleFirstNameChange (event) {
    setFirstName(event.target.value)
  }

  function handleLastNameChange (event) {
    setLastName(event.target.value)
  }

  function handleCompanyChange (event) {
    setCompany(event.target.value)
  }

  const formIsValid = () => {
    if ((v.isCompanySuccess(company)) && (v.isEmailSuccess(email)) && (v.isFirstNameSuccess(firstName)) && (v.isLastNameSuccess(lastName)) && (v.isRoleSuccess(selectedRoles)) && checkedKeys.checked &&  checkedKeys.checked.length > 0) return true
    return false
  }


  const [showAlertMessage, setShowAlertMessage] = React.useState(false);

  const handleInviteUserClick = () => {
    setInviteButtonDisabled(true)
    let userType = internalUserChecked ? 'Internal' : 'External'
    let userRoles = []
    for (const role of selectedRoles) {
      userRoles.push({roleId: role})
    }

    let accountsToLink = []
    if(topLevelCheckedAccounts.length > 0) {
      accountsToLink = topLevelCheckedAccounts
    } else {
      let currentAccountId = localStorage.getItem('currentAccountId')
      accountsToLink = [{accountId: currentAccountId}]
    }

    let newUser = new User('placeholder', firstName, lastName, company, email, userType, userRoles, accountsToLink)
    props.addNewUser(newUser)
    setShowAlertMessage(true)
    setTimeout(function() {
      setShowAlertMessage(false)
      setInviteButtonDisabled(false)
    }, 2000)
  }


  return (
    <div>


      
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card >
            
              
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
                        disabled: false,
                        value: company,
                        onChange: handleCompanyChange
                      }}
                      handleClear={()=>setCompany('')}
                      error={v.isCompanyError(company)}
                      success={v.isCompanySuccess(company)}
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
                        value: email,
                        onChange: handleEmailChange
                      }}
                      handleClear={()=>setEmail('')}
                      error={v.isEmailError(email)}
                      success={v.isEmailSuccess(email)}
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
                        value: firstName,
                        onChange: handleFirstNameChange
                      }}
                      handleClear={()=>setFirstName('')}
                      error={v.isFirstNameError(firstName)}
                      success={v.isFirstNameSuccess(firstName)}
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
                        value: lastName,
                        onChange: handleLastNameChange
                      }}
                      handleClear={()=>setLastName('')}
                      error={v.isLastNameError(lastName)}
                      success={v.isLastNameSuccess(lastName)}
                    />
                  </GridItem>

                  <GridItem xs={10} sm={10} md={10}>
                    <CustomSelect
                      roles={props.roles}
                      labelText='Role'
                      handleItemSelect={handleRoleSelect}
                      value={selectedRoles}
                      multiple={true}
                      success={v.isRoleSuccess(selectedRoles)}
                      formControlProps={{
                        fullWidth: true
                      }}
                     
                    />
                  </GridItem>

                 {
                   selectedRoles ?  //:TODO make sure only certain users see account dropdown

                  <GridItem xs={12} sm={12} md={8}>
                    {props.accounts.data && props.accounts.data.length > 0 ?
                      <CustomTree
                        data={props.accounts.data}
                        title='Account Access'
                        keyProp='accountId'
                        labelProp='accountName'
                        valueProp='accountId'
                        search={true}
                        treeContainerHeight={150}
                        onCheck={onCheck}
                        checkedKeys={checkedKeys}
                      />
                  
                    :
                    <div/>
                    
                    }
                    
                  </GridItem>

                   :

                   null
                 }

                
                 
                :
                 <div></div>
                }
                 
                  
                


                  <GridItem xs={12} sm={12} md={12}>
                    <CustomCheckbox
                      checked={internalUserChecked}
                      //tabIndex={-1}
                      changed={()=>setInternalUserChecked(!internalUserChecked)}
                      formControlProps={{
                        fullWidth: true
                      }}
                      labelText="Internal User"                 
                    />             
                  </GridItem>
                
                
                </GridContainer>         
                
              </CardBody>
              <CardFooter>
                <Button disabled={!formIsValid() || inviteButtonDisabled} onClick={handleInviteUserClick} color="primary">Invite User</Button>
              </CardFooter>
            </Card>
          </GridItem>
          
        </GridContainer>

        <Snackbar
          place="bc"
          color="success"
          icon={AddAlert}
          message="User created and Signup invitation is sent"
          open={showAlertMessage}
          closeNotification={() => setShowAlertMessage(false)}
          close
        />

       
      
               
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)