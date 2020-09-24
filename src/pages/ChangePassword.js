import React, { useState }  from "react";
// import PropTypes from "prop-types"
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomInput from '../components/CustomInput/CustomInput'
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {setShowAlert, changePassword} from '../redux/actions/auth';
import Snackbar from "../components/Snackbar/Snackbar";
import AddAlert from '@material-ui/icons/AddAlert'
import adminStyle from '../assets/jss/material-dashboard-react/layouts/adminStyle'
import Button from '../components/CustomButtons/Button'
import { whiteColor } from "../assets/jss/material-dashboard-react";
import logo from '../assets/img/sightly_icon.png'
import {logoStyle} from '../assets/jss/material-dashboard-react'

const mapStateToProps = (state) => {
  return { 
    isLoggedIn: state.isLoggedIn,
    showAlert: state.showAlert
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (password, userId, token) => dispatch(changePassword(password, userId, token)),
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

function PasswordChange(props) {
  const { userId, token } = props;
  const classes = useStyles();
  const adminClasses = useAdminStyles()
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  async function postChangePassword() {
    if (password === password_confirmation){
      props.changePassword(password, userId, token)
    } else {
      alert('Passwords do not match.')
    }

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
              labelText="Password"
              id="password"
              name="password"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: 'password',
                value: password,
                onChange: (e)=>setPassword(e.target.value),
                autoComplete: "current-password"
              }}
              handleClear={()=>setPassword('')}
              
            />

              </Grid>
              
              <Grid item xs={12}>

              <CustomInput
              labelText="Password"
              id="password_confirmation"
              name="password_confirmation"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: 'password',
                value: password_confirmation,
                onChange: (e)=>setPasswordConfirmation(e.target.value),
                autoComplete: "password_confirmation"
              }}
              handleClear={()=>setPasswordConfirmation('')}
              
            />

              </Grid>
            </Grid>

            <Button       
              color="primary"         
              onClick={postChangePassword}
              fullWidth={true}
              style={{marginTop:'10px'}}
            >
              
              Change Password
            </Button>


            <Grid container style={{marginTop:'10px'}}>
              <Grid item xs>
                <Link style={{color: whiteColor}} href="/login" variant="body2">
                  Login
                </Link>
              </Grid>
              <Grid item>
                <Link style={{color: whiteColor}} href="/signup" variant="body2">
                  {"Don't have an account?"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Snackbar
          place="bc"
          color="success"
          icon={AddAlert}
          message="Password has been reset. Please proceed to login with your new password."
          open={props.showAlert}
          closeNotification={() => props.setShowAlert(false)}
          close
        />
    
      </Container>
    </div>
  );
}


const ChangePassword = connect(mapStateToProps, mapDispatchToProps)(PasswordChange)

// ChangePassword.propTypes = {
//   token: PropTypes.string.isRequired,
//   userId: PropTypes.string.isRequired
// }

export default ChangePassword;