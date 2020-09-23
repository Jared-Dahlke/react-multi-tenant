import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import ListItem from "@material-ui/core/ListItem";
import Snackbar from "@material-ui/core/Snackbar";
import AddAlert from "@material-ui/icons/AddAlert";

// Validation
import * as v from "../../validations";
import CustomPassword from "../../components/CustomPasswordRequirements/CustomPasswordRequirements.js";

// Redux
import { userProfileFetchData } from "../../redux/actions/auth.js";
import { connect } from "react-redux";
import { updateUserData } from "../../redux/actions/users.js";
// Icons
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ClearRounded from "@material-ui/icons/ClearRounded";
import CheckCircle from "@material-ui/icons/CheckCircle";

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
    user: state.user,
    token: state.authToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProfile: () => dispatch(userProfileFetchData()),
    updateUserData: (userData) => dispatch(updateUserData(userData)),
  };
};

const defaultState = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phoneNumber: "",
  userName: "",
};
const passwordDefaultState = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

function UserProfile({
  fetchUserProfile,
  updateUserData,
  user: { userProfile, loading },
}) {

  const [userForm, setUserForm] = useState(defaultState);
  const [edit, setEdit] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [passwordObject, setPasswordObject] = useState(passwordDefaultState);
  const [showAlertMessage, setShowAlertMessage] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (!userProfile) fetchUserProfile();
    if (!loading && userProfile) {
      const userData = { ...defaultState };
      for (const key in userProfile) {
        if (key in userData) {
          userData[key] = userProfile[key];
        }
      }
      setUserForm(userData);
    }
  }, [fetchUserProfile, userProfile, loading]);

  const onChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };
  const onPasswordChange = (e) => {
    setPasswordObject({ ...passwordObject, [e.target.name]: e.target.value });
  };

  const enableEdit = () => {
    setEdit(true);
  };
  const disableEdit = () => {
    setEdit(false);
    setUserForm(userProfile);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setUserForm(userForm);
    setEdit(false);
    setShowAlertMessage(true);
    setTimeout(function () {
      setShowAlertMessage(false);
    }, 2000);
    userForm.userType = userProfile.userType
    updateUserData(userForm);
  };

  const submitPassword = (e) => {
    e.preventDefault();
    disablePasswordEdit();
  };

  const enablePasswordEdit = () => {
    setEditPassword(true);
  };
  const disablePasswordEdit = () => {
    setEditPassword(false);
    setPasswordObject(passwordDefaultState);
  };

  const formIsValid = () => {
    if (
      v.isCompanySuccess(company) &&
      v.isEmailSuccess(email) &&
      v.isFirstNameSuccess(firstName) &&
      v.isLastNameSuccess(lastName)
    ) {
      return true;
    }
    return false;
  };

  const { firstName, lastName, email, company } = userForm;
  const { oldPassword, newPassword, confirmNewPassword } = passwordObject;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {edit ? "Edit Profile" : "My Profile"}
              </h4>
              <p className={classes.cardCategoryWhite}>
                {edit ? "Complete your profile" : "Your profile information"}
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company (disabled)"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                      value: company,
                    }}
                    success={edit && v.isCompanySuccess(company)}
                    error={edit && v.isCompanyError(company)}
                    handleClear={() =>
                      setUserForm({ ...userForm, company: "" })
                    }
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: edit ? false : true,
                      value: email,
                      name: "email",
                      onChange: onChange,
                    }}
                    success={edit && v.isEmailSuccess(email)}
                    error={edit && v.isEmailError(email)}
                    handleClear={() => setUserForm({ ...userForm, email: "" })}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: edit ? false : true,
                      value: firstName,
                      name: "firstName",
                      onChange: onChange,
                    }}
                    success={edit && v.isFirstNameSuccess(firstName)}
                    error={edit && v.isFirstNameError(firstName)}
                    handleClear={() =>
                      setUserForm({ ...userForm, firstName: "" })
                    }
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
                      disabled: edit ? false : true,
                      value: lastName,
                      name: "lastName",
                      onChange: onChange,
                    }}
                    success={edit && v.isLastNameSuccess(lastName)}
                    error={edit && v.isLastNameError(lastName)}
                    handleClear={() =>
                      setUserForm({ ...userForm, lastName: "" })
                    }
                  />
                </GridItem>
              </GridContainer>
              <GridContainer></GridContainer>
            </CardBody>
            <CardFooter>
              {edit && (
                <Button color="primary" onClick={disableEdit}>
                  Cancel
                </Button>
              )}
              <Button
                color="primary"
                onClick={edit ? onSubmit : enableEdit}
                disabled={!formIsValid()}
              >
                {edit ? "Save" : "Edit Profile"}
              </Button>

              <Snackbar
                place="bc"
                color="success"
                icon={AddAlert}
                message="User profile was updated"
                open={showAlertMessage}
                // closeNotification={() => setShowAlertMessage(false)}
                // close
              />
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={5}>
              <Button
                onClick={
                  editPassword ? disablePasswordEdit : enablePasswordEdit
                }
              >
                Change Password
              </Button>
            </GridItem>
          </GridContainer>
          <GridItem>
            <Card>
              {editPassword && (
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Current Password"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "password",
                          value: oldPassword,
                          name: "oldPassword",
                          onChange: onPasswordChange,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="New Password"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "password",
                          value: newPassword,
                          name: "newPassword",
                          onChange: onPasswordChange,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Confirm Password"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "password",
                          value: confirmNewPassword,
                          name: "confirmNewPassword",
                          onChange: onPasswordChange,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomPassword password={newPassword} />
                      {(newPassword.length > 0 ||
                        confirmNewPassword.length > 0) && (
                        <ListItem>
                          <ListItemIcon className={classes.minWidth}>
                            {newPassword === confirmNewPassword ? (
                              <CheckCircle
                                className={classes.green}
                                fontSize="small"
                              />
                            ) : (
                              <ClearRounded fontSize="small" />
                            )}
                          </ListItemIcon>
                          {newPassword === confirmNewPassword
                            ? "Passwords Match"
                            : "Password Must Match"}
                        </ListItem>
                      )}
                    </GridItem>
                  </GridContainer>
                </CardBody>
              )}
              {editPassword && (
                <CardFooter>
                  <Button color="primary" onClick={disablePasswordEdit}>
                    Cancel
                  </Button>
                  <Button color="primary" onClick={submitPassword}>
                    Save
                  </Button>
                </CardFooter>
              )}
            </Card>
          </GridItem>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
