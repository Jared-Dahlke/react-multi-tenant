import React, { useState }  from "react";
// import PropTypes from "prop-types"
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {setShowAlert, changePassword} from '../redux/actions/auth.js';
import Snackbar from "../components/Snackbar/Snackbar";
import AddAlert from '@material-ui/icons/AddAlert'

const mapStateToProps = (state : any) => {
  return { 
    isLoggedIn: state.isLoggedIn,
    showAlert: state.showAlert
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changePassword: (password: string, userId: string, token: string) => dispatch(changePassword(password, userId, token)),
    setShowAlert: (showAlert: boolean) => dispatch(setShowAlert(showAlert))
  }
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Sightly
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
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

function PasswordChange(props: any) {
  const { userId, token } = props;
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  async function postChangePassword() {
    // console.log(password, password_confirmation)
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
    return <Redirect to='./admin/profile' />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>

        </Avatar>
        <Typography component="h1" variant="h5">
          Change your Password
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                name="password"
                autoComplete="password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password_confirmation"
                label="Password Confirmation"
                type="password"
                name="password_confirmation"
                autoComplete="password_confirmation"
                value={password_confirmation}
                onChange={e => {
                  setPasswordConfirmation(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={postChangePassword}
          >
            Change Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                Login
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
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
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}


const ChangePassword = connect(mapStateToProps, mapDispatchToProps)(PasswordChange)

// ChangePassword.propTypes = {
//   token: PropTypes.string.isRequired,
//   userId: PropTypes.string.isRequired
// }

export default ChangePassword;