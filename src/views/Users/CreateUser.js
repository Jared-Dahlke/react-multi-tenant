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
import {rolesFetchData} from '../../redux/actions/roles'
import {inviteUser} from '../../redux/actions/users'
import CustomCheckbox from "../../components/CustomCheckbox/Checkbox"
import CustomSelect from "../../components/CustomSelect/CustomSelect.js"
import Snackbar from "../../components/Snackbar/Snackbar"
import AddAlert from '@material-ui/icons/AddAlert'
import * as v from '../../validations'

import CustomTree from '../../components/Tree/CustomTree'
import { User } from "../../models/user.js"

const myData = [{"title":"Dummy Account","key":"0-0-key","children":[{"title":"0-0-0-label","key":"0-0-0-key","children":[{"title":"0-0-0-0-label","key":"0-0-0-0-key"},{"title":"0-0-0-1-label","key":"0-0-0-1-key"},{"title":"0-0-0-2-label","key":"0-0-0-2-key"}]},{"title":"0-0-1-label","key":"0-0-1-key","children":[{"title":"0-0-1-0-label","key":"0-0-1-0-key"},{"title":"0-0-1-1-label","key":"0-0-1-1-key"},{"title":"0-0-1-2-label","key":"0-0-1-2-key"}]},{"title":"0-0-2-label","key":"0-0-2-key"}]},{"title":"0-1-label","key":"0-1-key","children":[{"title":"0-1-0-label","key":"0-1-0-key","children":[{"title":"0-1-0-0-label","key":"0-1-0-0-key"},{"title":"0-1-0-1-label","key":"0-1-0-1-key"},{"title":"0-1-0-2-label","key":"0-1-0-2-key"}]},{"title":"0-1-1-label","key":"0-1-1-key","children":[{"title":"0-1-1-0-label","key":"0-1-1-0-key"},{"title":"0-1-1-1-label","key":"0-1-1-1-key"},{"title":"0-1-1-2-label","key":"0-1-1-2-key"}]},{"title":"0-1-2-label","key":"0-1-2-key"}]},{"title":"0-2-label","key":"0-2-key"}]


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
    isLoading: state.rolesIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRoles: () => dispatch(rolesFetchData()),
    addNewUser: (user) => dispatch(inviteUser(user))
  }
}


function CreateUser  (props) {
 

  const classes = useStyles()
  const [selectedRoles, setSelectedRoles] = React.useState([11])
  const [internalUserChecked, setInternalUserChecked] = React.useState(false)
  const [email, setEmail] = React.useState('test@xyz.com')
  const [firstName, setFirstName] = React.useState('testFirst')
  const [lastName, setLastName] = React.useState('testLast')
  const [company, setCompany] = React.useState('testCompanyxuzx')
  const [inviteButtonDisabled, setInviteButtonDisabled] = React.useState(false)

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
    if ((v.isCompanySuccess(company)) && (v.isEmailSuccess(email)) && (v.isFirstNameSuccess(firstName)) && (v.isLastNameSuccess(lastName)) && (v.isRoleSuccess(selectedRoles)) ) return true
    return false
  }


  const [showAlertMessage, setShowAlertMessage] = React.useState(false);

  const handleInviteUserClick = () => {
    setInviteButtonDisabled(true)
    let mockAccounts = []
    let userType = internalUserChecked ? 'Internal' : 'External'
    let userRoles = []
    for (const role of selectedRoles) {
      userRoles.push({roleId: role})
    }
    let newUser = new User(null, firstName, lastName, company, email, userType, userRoles, mockAccounts)
    props.addNewUser(newUser)
    setShowAlertMessage(true)
    setTimeout(function() {
      setShowAlertMessage(false)
      setInviteButtonDisabled(false)
    }, 4000)
  }
  //[{roleId: 11},{roleId: 12}]

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
                   selectedRoles.includes(11) ?

                  <GridItem xs={12} sm={12} md={8}>
                    <CustomTree
                      data={myData}
                      title='Account Access'
                      search={true}
                      treeContainerHeight={150}
                    />
                  </GridItem>

                   :

                   null
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