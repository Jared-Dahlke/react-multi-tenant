import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

// Redux
import {userProfileFetchData} from '../../redux/actions/auth.js'
import {connect} from 'react-redux'


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
    user: state.user,
    token: state.authToken
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProfile: () => dispatch(userProfileFetchData())
  }
}

const defaultState = {
  userId:'',
  firstName:'',
  lastName:'',
  email:'',
  company: '',
  phoneNumber:'',
  userName: ''
}

function UserProfile({fetchUserProfile, user:{userProfile,loading}}) {
  const [userForm, setUserForm] = useState(defaultState)
  const [edit, setEdit] = useState(false)

  const classes = useStyles();

  useEffect(() => {
    console.log(userProfile)
    if(!userProfile) fetchUserProfile();
    if(!loading && userProfile) {
      const userData = {...defaultState}
      for (const key in userProfile) {
        if (key in userData){
          userData[key] = userProfile[key];
        } 
      }
      setUserForm(userData)
    }
  }, [fetchUserProfile,userProfile,loading])


  const onChange = (e) =>{
      console.log(e.target)
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  } 
  
  const enableEdit = () => {
    setEdit(true)
  }
  const disableEdit = () => {
    setEdit(false)
  }
  const onSubmit = (e) => {
    e.preventDefault();
    disableEdit()
  };

  const {firstName,lastName,email,company} = userForm
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company (disabled)"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true,
                      value: company
                    }}
                  />
                </GridItem>
                {/* <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    // labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: userName
                    }}
                  />
                </GridItem> */}

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    // id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: edit? false:true,
                      value: email,
                      name: "email",
                      onChange: onChange
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: edit? false:true,
                      value: firstName,
                      name: "firstName",
                      onChange: onChange
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: edit? false:true,
                      value: lastName,
                      name: 'lastName',
                      onChange: onChange
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
              </GridContainer>
              <GridContainer>
                {/* <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id "
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem> */}
              </GridContainer>
            </CardBody>
            <CardFooter>
               {edit &&<Button color="primary" onClick={disableEdit}>Stop Editing</Button>}
              <Button color="primary" onClick={edit?onSubmit: enableEdit}>{edit?'Update Profile':'Edit Profile'}</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
