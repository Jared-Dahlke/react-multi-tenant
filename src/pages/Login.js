import React, { useState }  from "react";
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import Button from '../components/CustomButtons/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {login} from '../redux/actions/auth.js'
import adminStyle from '../assets/jss/material-dashboard-react/layouts/adminStyle'
import { whiteColor } from "../assets/jss/material-dashboard-react.js";
import CustomInput from '../components/CustomInput/CustomInput'
import logo from "../assets/img/sightly_icon.png";
import sightlyFull from '../assets/img/sightly_full.png'
import {logoStyle} from '../assets/jss/material-dashboard-react'

const mapStateToProps = (state) => {
  return { 
    authToken: state.authToken,
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(login(credentials))
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%'

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
  input: {
    color: whiteColor
  }
}));
const useAdminStyles = makeStyles(adminStyle)

function Login(props) {

  const classes = useStyles();
  const adminClasses = useAdminStyles()
  const referer = props.location.state ? props.location.state.referer : '/admin/settings/profile';
  const [userName, setUserName] = useState("jared@sightly.com");
  const [password, setPassword] = useState("test");

  const postLogin =() =>{
    let credentials = {
      username: userName,
      password: password
    }
    props.login(credentials)
  }
   
  if (props.isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <div className={adminClasses.authPanel}>
      <Container maxWidth="xs">
        
        <div className={classes.paper} >

         <img src={logo} alt="logo" style={logoStyle} />
         
         
          <form className={classes.form} noValidate>

            <CustomInput
              labelText="Email address"
              id="email-address"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: 'email',
                value: userName,
                onChange: (e)=>setUserName(e.target.value)
              }}
              handleClear={()=>setUserName('')}
              
            />

            <CustomInput
              labelText="Password"
              id="password"
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

            <Button       
              color="primary"         
              onClick={postLogin}
              fullWidth={true}
              style={{marginTop:'10px'}}
            >
              
              Sign In
            </Button>
          
            <Grid style={{marginTop:'10px'}} container>
              <Grid item xs>
                <Link href="/resetPassword" variant="body2" style={{color: whiteColor}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" style={{color: whiteColor}}>
                  {"Don't have an account?"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      
      </Container>
    </div>
  );
}

const MyLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default MyLogin;