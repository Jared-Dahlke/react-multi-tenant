import React, { useState }  from "react";
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import Button from '../components/CustomButtons/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {setAlert, resetPassword} from '../redux/actions/auth.js';
import Snackbar from "@material-ui/core/Snackbar";
import AddAlert from "@material-ui/icons/AddAlert";
import Alert from '@material-ui/lab/Alert';
import {isEmailError} from "../validations";
import CustomInput from '../components/CustomInput/CustomInput'
import logo from '../assets/img/sightly_icon.png'
import {logoStyle} from '../assets/jss/material-dashboard-react'
import adminStyle from '../assets/jss/material-dashboard-react/layouts/adminStyle'

const mapStateToProps = (state) => {
  return { 
    isLoggedIn: state.isLoggedIn,
    alert: state.alert
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (email) => dispatch(resetPassword(email)),
    setAlert: (alert) => dispatch(setAlert(alert))
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
              disabled={!email || isEmailError(email)}
              onClick={postResetPassword}
            >
              Reset Password
            </Button>

            <Snackbar
              autoHideDuration={5000}
              place="bc"
              icon={AddAlert}
              open={props.alert.show}
              onClose={() => props.setAlert({show: false})}
            >
              <Alert severity={props.alert.severity}>{props.alert.message}</Alert>
            </Snackbar>
          </form>
        </div>

      </Container>
    </div>
  );
}


const ResetPassword = connect(mapStateToProps, mapDispatchToProps)(PasswordReset)

export default ResetPassword;