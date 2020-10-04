import React, { useState }  from "react";
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import Button from '../components/CustomButtons/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {setShowAlert, resetPassword} from '../redux/actions/auth.js';
import Snackbar from "../components/Snackbar/Snackbar";
import AddAlert from '@material-ui/icons/AddAlert';
import {isEmailError} from "../validations";
import CustomInput from '../components/CustomInput/CustomInput'
import logo from '../assets/img/sightly_icon.png'
import {logoStyle} from '../assets/jss/material-dashboard-react'
import adminStyle from '../assets/jss/material-dashboard-react/layouts/adminStyle'

const mapStateToProps = (state) => {
  return { 
    isLoggedIn: state.isLoggedIn,
    showAlert: state.showAlert
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (email) => dispatch(resetPassword(email)),
    setShowAlert: (showAlert) => dispatch(setShowAlert(showAlert))
  }
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const useAdminStyles= makeStyles(adminStyle)



function PasswordReset(props) {
  const adminClasses = useAdminStyles()
  const classes = useStyles();
  const [email, setEmail] = useState("");

  async function postResetPassword() {
    props.resetPassword(email)

    setTimeout(function() {
      props.setShowAlert(false)
    }, 4000)
  }

  if (props.isLoggedIn) {
    return <Redirect to='./admin/settings/profile' />;
  }

  return (
    <div className={adminClasses.authPanel}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <img src={logo} alt="logo" style={logoStyle} />
         
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>

                <CustomInput
                  labelText="Email address"
                  id="email-address"
                  name="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: 'email',
                    value: email,
                    onChange: (e)=>setEmail(e.target.value)
                  }}
                  handleClear={()=>setEmail('')}
                  
                />


              </Grid>
              
            </Grid>
            <Button   
              style={{marginTop:'10px'}}       
              fullWidth          
              color="primary"       
              disabled={isEmailError(email)}
              onClick={postResetPassword}
            >
              Reset Password
            </Button>
          </form>
        </div>
        <Snackbar
          place="bc"
          color="success"
          icon={AddAlert}
          message="Reset password email sent. Check Your email."
          open={props.showAlert}
          closeNotification={() => props.setShowAlert(false)}
          close
        />
       
      </Container>
    </div>
  );
}


const ResetPassword = connect(mapStateToProps, mapDispatchToProps)(PasswordReset)

export default ResetPassword;