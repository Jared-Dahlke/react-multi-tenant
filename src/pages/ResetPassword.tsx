import React, { useState }  from "react";
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
import config from '../config.js'
import {resetPassword} from '../redux/actions/auth.js'

const apiBase = config.apiGateway.MOCKURL;

const mapStateToProps = (state : any) => {
  return { 
    authToken: state.authToken
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    resetPassword: (email: string) => dispatch(resetPassword(email))
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

function PasswordReset(props: any) {
  const classes = useStyles();
  const [email, setEmail] = useState("rahul@sightly.com");
  // const [password, setPassword] = useState("pistol");
  const [isLoggedIn] = useState(false);
  //const referer = props.location.state ? props.location.state.referer : '/';

  async function postResetPassword() {
    props.resetPassword(email)
  }

  if (props.isLoggedIn) {
    //history.push(referer);
    return <Redirect to='./admin/profile' />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>

        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot your Password
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
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
            onClick={postResetPassword}
          >
            Reset
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}


const ResetPassword = connect(mapStateToProps, mapDispatchToProps)(PasswordReset)

export default ResetPassword;