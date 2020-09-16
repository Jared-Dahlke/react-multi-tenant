import React from "react";
import {connect} from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CustomSelect from '../../components/CustomSelect/CustomSelect'
import CustomTree from '../../components/Tree/CustomTree'
import CustomCheckbox from '../../components/CustomCheckbox/Checkbox'
import Snackbar from '../../components/Snackbar/Snackbar'
import { userUnderEdit } from "../../redux/reducers/users.js";

const queryString = require('query-string');

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
    userUnderEdit: state.userUnderEdit
  };
};


function EditUser(props) {

  const params = queryString.parse(props.location.search)
  const userFromParams = JSON.parse(params.user)
  const [user, setUser] = React.useState(userFromParams)
  const classes = useStyles();
  const [selectedRoles, setSelectedRoles] = React.useState([])
  //let user = props.userUnderEdit

  const handleFirstNameChange = (event) => {
    let currentUser = {...user}
    currentUser.firstName = event.target.value
    setUser(currentUser)
  }

  const handleLastNameChange = (event) => {
    let currentUser = {...user}
    currentUser.lastName = event.target.value
    setUser(currentUser)
  }

  const handleEmailChange = (event) => {
    let currentUser = {...user}
    currentUser.email = event.target.value
    setUser(currentUser)
  }

  const handleRoleChange = (event) => {
    let currentUser = {...user}
    currentUser.roles = event.target.value
    setUser(currentUser)
  }
  
  return (
    <Card>

      <CardBody>
      
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
            
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit User</h4>
                <p className={classes.cardCategoryWhite}></p>
              </CardHeader>
              
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
                        onChange: handleEmailChange
                      }}
                      //handleClear={()=>setEmail('')}
                      //error={email.length > 0 && !isValidEmail(email)}
                      //success={isValidEmail(email)}
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
                        onChange: handleFirstNameChange
                      }}
                      //error={firstName.length > 0 && firstName.length < 2}
                      //success={firstName.length > 1}
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
                        onChange: handleLastNameChange
                      }}
                      //error={lastName.length > 0 && lastName.length < 2}
                      //success={lastName.length > 1}
                    />
                  </GridItem>

                  <GridItem xs={10} sm={10} md={10}>
                    <CustomSelect
                      roles={props.roles}
                      labelText='Role'
                      handleItemSelect={handleRoleChange}
                      value={user.roles}
                      multiple={true}
                      success={user.roles.length > 0}
                      formControlProps={{
                        fullWidth: true
                      }}
                     
                    />
                  </GridItem>

                 {
                   selectedRoles.includes(11) ?

                  <GridItem xs={12} sm={12} md={8}>
                    <CustomTree
                      //data={myData}
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
                      //checked={internalUserChecked}
                      //tabIndex={-1}
                      //changed={()=>setInternalUserChecked(!internalUserChecked)}
                      formControlProps={{
                        fullWidth: true
                      }}
                      labelText="Internal User"                 
                    />             
                  </GridItem>
                
                
                </GridContainer>         
                
              </CardBody>
              <CardFooter>
                <Button  color="primary">Save</Button>
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

       
            
      </CardBody>

    
      
               
    </Card>
  );
}

export default connect(mapStateToProps, null)(EditUser)
