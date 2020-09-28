import React, { useState }  from "react";
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import Button from '../components/CustomButtons/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {setAuthToken} from '../redux/actions/auth.js'
import PasswordRequirements from '../components/CustomPasswordRequirements/CustomPasswordRequirements'
import CustomInput from '../components/CustomInput/CustomInput'
import adminStyle from '../assets/jss/material-dashboard-react/layouts/adminStyle'
import logo from '../assets/img/sightly_icon.png'
import {logoStyle} from '../assets/jss/material-dashboard-react'
import { whiteColor } from "../assets/jss/material-dashboard-react";
import {register} from '../redux/actions/auth'
const queryString = require('query-string');


const mapStateToProps = (state) => {
  return { 
    authToken: state.authToken
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthToken: (authToken) => dispatch(setAuthToken(authToken)),
    register: (user)=> dispatch(register(user))
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
  green: {
    color: 'green'
  }
}));

const useAdminStyles = makeStyles(adminStyle);

function Signup(props) {

  
  const classes = useStyles();
  const adminClasses = useAdminStyles()

  const parsed = queryString.parse(props.location.search)

  const [fromInvite] = useState(!!parsed.fromInvite)

  let initialEmail = 'adfad@mytest.com'
  if(fromInvite) {
    initialEmail = parsed.email
  }
  const [email, setEmail] = useState(initialEmail);
  const [firstName, setFirstName] = useState(parsed.firstName)
  const [lastName, setLastName] = useState(parsed.lastName)
  const [password, setPassword] = useState("adsfadsffa3D!");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const postRegister= (event)=> {
    event.preventDefault()
   // try {
      let user = {
        email,
        password
      }

      try{
        props.register(user)
      }
      catch(err) {
        alert(err)
      }
      

      //if (result.status === 200) {
      //  props.setAuthToken(result.data.token);
      //  localStorage.setItem("token", result.data.token);
     //   setLoggedIn(true)
     // }

   // } catch (err) {
   //   console.log('error in signup page')
   //   alert(err)
   // }
  }

  //if (isLoggedIn) {
    //return <Redirect to='/admin/profile' />;
  //}

  return (
    <div className={adminClasses.authPanel}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
         
          <img src={logo} alt="logo" style={logoStyle} />
         
        
          <Grid container spacing={2}>

            {/*<Grid item xs={12} sm={6}>
              <CustomInput
                labelText="First Name"
                id="firstname"
                disabled={fromInvite}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{           
                  value: firstName,
                  onChange: (e)=>setFirstName(e.target.value),
                
                }}
                handleClear={()=>setFirstName('')}          
              />         
            </Grid>

            <Grid item xs={12} sm={6}>    
              <CustomInput
                labelText="Last Name"
                id="lastName"
                disabled={fromInvite}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{           
                  value: lastName,
                  onChange: (e)=>setLastName(e.target.value),
                  
                }}
                handleClear={()=>setLastName('')}          
              />
            </Grid> */}
            

            <Grid item xs={12}>         
              <CustomInput
                labelText="Email address"
                id="email-address"
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
            
            <Grid item xs={12}>
             
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
              
            </Grid>

            <Grid item xs={12}>
              <PasswordRequirements
                password={password}
              />
            </Grid>

              
          </Grid>

          <Button     
          
            color="primary"         
            onClick={postRegister}
            fullWidth={true}
            style={{marginTop:'10px'}}
          >
              
            {
              fromInvite ?
                'Complete Sign Up'
                :
                'Sign Up'
            }
          </Button>


        
          <Grid container justify="flex-end">
            <Grid item style={{marginTop:'10px'}}>
              <Link href="/login" variant="body2" style={{color: whiteColor}}>
                Already have an account?
              </Link>
            </Grid>
          </Grid>
        
        </div>
        
      </Container>
    </div>
  );
}


const MySignup = connect(mapStateToProps, mapDispatchToProps)(Signup)

export default MySignup;