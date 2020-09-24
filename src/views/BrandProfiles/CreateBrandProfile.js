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
import {primaryColor, blackColor, whiteColor} from '../../assets/jss/material-dashboard-react'
import CardHeader from '../../components/Card/CardHeader';
import BasicInfo from './components/BasicInfo'

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
    color: primaryColor[0]
  },
  step: {
    "&$completed": {
      color: primaryColor[0]
    },
    "&$active": {
      color: primaryColor[0]
    }
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


export default function CreateBrandProfiles (props) {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [basicInfo, setBasicInfo] = React.useState({
    profileName: '',
    websiteUrl: '',
    twitterProfile: '',
    verticals:[],
    subVerticals: []
  })

  const handleChangeBasicInfo=(e)=>{
    console.log('handle change basic info')
    console.log(e)
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
  }

  const handleClearBasicInfo=(name, value)=>{
    console.log('handle clear basic info')
    setBasicInfo({ ...basicInfo, [name]: value });
  }
  
  
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

  return (
   
    <div>

      <Stepper classes={{ root: classes.stepper}}  activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
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
              <div style={{color: whiteColor}}>{label}</div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      
    
      <Card >
        
        <CardBody>

          {activeStep === 0 ?
            <BasicInfo basicInfo={basicInfo} handleChange={handleChangeBasicInfo} handleClear={handleClearBasicInfo}/> 
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

  )
}