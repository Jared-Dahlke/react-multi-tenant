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
import axios from 'axios';
import {setAuthToken} from '../redux/actions/auth.js'
import PasswordRequirements from '../components/CustomPasswordRequirements/CustomPasswordRequirements'

import config from '../config.js'
const queryString = require('query-string');

const queryString = require('query-string');

const apiBase = config.apiGateway.MOCKURL;

const mapStateToProps = (state : any) => {
  return { 
    authToken: state.authToken
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setAuthToken: (authToken: any) => dispatch(setAuthToken(authToken))
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
  green: {
    color: 'green'
  }
}));

function Signup(props: any) {

  
  const classes = useStyles();

  const parsed = queryString.parse(props.location.search)
  const [fromInvite] = useState(!!parsed.fromInvite)
  const [email, setEmail] = useState(parsed.email);
  const [firstName, setFirstName] = useState(parsed.firstName)
  const [lastName, setLastName] = useState(parsed.lastName)
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  async function register () {
    let url = apiBase + '/register'
    var result = null;
    try {

      result = await axios.post(url, {
        email,
        password
      })

      if (result.status === 200) {
        props.setAuthToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        setLoggedIn(true)
      }

    } catch (err) {
      alert(err.response.data.error)
    }
  }

  if (isLoggedIn) {
    return <Redirect to='/admin/profile' />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>

        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
       
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                value={firstName}
                onChange={e => {
                  setFirstName(e.target.value);
                }}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                disabled={fromInvite}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                value={lastName}
                onChange={e => {
                  setLastName(e.target.value);
                }}
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                disabled={fromInvite}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                disabled={fromInvite}
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordField"
                label="Password"              
                id="password"
                type="password"
                autoFocus={fromInvite}        
                autoComplete="new-password"  
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <PasswordRequirements
                password={password}
              />
            </Grid>

            
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={register}
          >
            {
              fromInvite ?
                'Complete Sign Up'
                :
                'Sign Up'
            }
           
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account?
              </Link>
            </Grid>
          </Grid>
       
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}


const MySignup = connect(mapStateToProps, mapDispatchToProps)(Signup)

export default MySignup;