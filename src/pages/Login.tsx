import React, { useState }  from "react";
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/core.....';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {addArticle, setAuthToken} from '../redux/actions/index.js'
import config from '../config.js'

const apiBase = config.apiGateway.MOCKURL;

const mapStateToProps = (state : any) => {
  return { 
    articles: state.articles,
    authToken: state.authToken
  };
};

const mapDispatchToProps = (dispatch: any) => {
  console.log('map dispatch to props')
  console.log(setAuthToken)
  return {
    addArticle: (article: any) => dispatch(addArticle(article)),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function Login(props: any) {

  console.log('props from login')
  console.log(props)
  

  const classes = useStyles();

  console.log('inside login function, props')

  const referer = props.location.state ? props.location.state.referer : '/admin/profile';
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");

  // console.log(AuthContext)

  async function postLogin() {
    // props.addArticle('test')
    console.log('after adding')
    console.log(props)
    console.log('config:' + JSON.stringify(config.apiGateway))

    let url =  apiBase + '/login'
    var result = null;
    try {

      result = await axios.post(url, {
        email: userName,
        password
      })

      if (result.status === 200) {
        props.setAuthToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        setLoggedIn(true)
      }

    } catch (err) {
      console.log(err)
      alert(err.response.data.error)
    }

}
   
  if (isLoggedIn) {
    //history.push(referer);
    return <Redirect to={referer} />;
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
         {/*<LockOutlinedIcon />*/} 
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={userName}
            onChange={e => {
              setUserName(e.target.value);
            }}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            autoComplete="current-password"
          />
          {/**
           <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
           */}
          
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={postLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
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
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const MyLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default MyLogin;