import React, { useState }  from "react";
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '../components/CustomButtons/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {setShowAlert, resetPassword} from '../redux/actions/auth.js';
import Snackbar from "../components/Snackbar/Snackbar";
import AddAlert from '@material-ui/icons/AddAlert';
import {isEmailError} from "../validations";
import CustomInput from '../components/CustomInput/CustomInput'


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
    paddingTop: theme.spacing(8),
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

function PasswordReset(props) {
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
    <div style={{position: "relative",
      top: "0",
      height: "100vh"}}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
         
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