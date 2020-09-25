import React from 'react'
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardFooter from '../../components/Card/CardFooter'
import CardBody from "../../components/Card/CardBody.js";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography';
import {primaryColor, blackColor, whiteColor, grayColor} from '../../assets/jss/material-dashboard-react'
import BasicInfo from './components/BasicInfo'
import {Formik, Form} from 'formik'
import * as v from '../../validations'


const useStyles = makeStyles((theme) => ({
  stepper: {
    backgroundColor: blackColor
  },
  fixBottom: {
    position: 'fixed',
    bottom: 0
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  color: {
    color: primaryColor[0],
    
  },
  step: {
    "&$completed": {
      color: 'green',
      
    },
    "&$active": {
      color: primaryColor[0]
    },
    color: blackColor
  },
  active: {}, //needed so that the &$active tag works
  completed: {},
  disabled: {},
  instructions: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function getSteps() {
  return ['Basic Info', 'Create an ad group', 'Create an ad'];
}


function CreateBrandProfiles (props) {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [basicInfo, setBasicInfo] = React.useState({
    profileName: '',
    websiteUrl: '',
    twitterProfile: '',
    verticals:[],
    subVerticals: []
  })

  
  
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //if touched with no errors then validated
  //if you dont have multiple 'sub forms' you can just check form.isValid instead of doing this whole function
  const stepValidated=(index, formik) =>{
    console.log('running step validated')

    let errors = formik.errors
    let errorCount = Object.keys(errors).length
    console.log(errorCount)
    console.log(errors)

    

    if (errorCount === 0) return true 

    for (const [key, value] of Object.entries(errors)) {
      console.log(key, value);
      if(index === 0) {
        if(key.includes('basicInfo')) {
          return false
        }
      }
      if(index === 1) {
        if(key.includes('step2')) {
          return false
        }
      }
      if(index === 2) {
        if(key.includes('step3')) {
          return false
        }
      }
      
    }

    return true

      
  }

  {/**<Formik 
    validateOnMount={true} 
    initialValues={useMemo(() => { return { email: '' } }, [])}
    ...  */}

  

  return (
    <Formik
      validateOnMount={true}
      initialValues={{
        
          basicInfoProfileName: '',
          basicInfoWebsiteUrl: '',
          basicInfoTwitterProfile: ''
                 
      }}
      // user this for form level validation (pros: can validate against different fields, cons: slower)
      //validate={(values,props)=>{
      //  console.log('running validate')
      //  console.log(values)     
      //  console.log(props)
      //  const errors = {} // 'test***'
        //if (errors.length > 0) {
          //for (const error of errors) {
          
          //}
        //}
        
        //if {
        //  console.log('triggering errror')
       //   errors.basicInfo.websiteUrl = true
          
       // }
     //   return errors
      //}}
    > 
    {formik => (
    <div>

      <Stepper classes={{ root: classes.stepper}}  activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          
          let labelColor = whiteColor
          //if (stepValidated(index, formik)) {
          //  labelColor = 'green'
          //}
            
          
          return (

            <Step key={label}>              
              <StepLabel 
                StepIconProps={{ 
                  classes: { 
                    root: classes.step,
                    completed: classes.completed,
                    active: classes.active
                  } 
                }}
              >
                <div style={{color: labelColor}}>{label}</div>
              </StepLabel>
            </Step>

          )
        })}
      </Stepper>

      <div style={{color:'white'}}>{JSON.stringify(formik,null,4)}></div>
      
    
      <Card >
        
        <CardBody>

          {activeStep === 0 ?
          <div>
            <Form name="form1">
              <BasicInfo basicInfo={basicInfo}/> 
            </Form>
          </div>
            : activeStep === 1 ?
              <div>step 2</div> 
              : activeStep === 2 ?
                <div> step 3</div> 
                : 
                <div></div>
          }
          
          
          
        </CardBody>          
        <CardFooter>

          <div style={{position: 'fixed', bottom: 30, right: 70}}>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}></Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
     

        </CardFooter>

      </Card>
    </div>

    )}
    
    </Formik>

  )
}

export default CreateBrandProfiles