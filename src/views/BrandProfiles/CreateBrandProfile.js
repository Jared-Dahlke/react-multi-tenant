import React from 'react'
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from "../../components/Grid/GridItem.js";
import GridList from '@material-ui/core/GridList'
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
//import Card from '@material-ui/core/Card'
import CardBody from "../../components/Card/CardBody.js";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel'
import StepButton from '@material-ui/core/StepButton';
import StepIcon from '@material-ui/core/StepIcon'
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {primaryColor} from '../../assets/jss/material-dashboard-react'
import CardHeader from '../../components/Card/CardHeader';
import BasicInfo from './components/BasicInfo'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  stepper: {
    //width: '100vh'
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

function getStepContent(stepIndex) {
  switch (stepIndex) {
  case 0:
    return '';
  case 1:
    return '';
  case 2:
    return '';
  default:
    return 'Unknown stepIndex';
  }
}


export default function CreateBrandProfiles (props) {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
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
   

  
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Create your brand profile</h4>           
      </CardHeader>
      <CardBody>
        
        <GridList  cellHeight={'auto'}  cols={1}>
          
          <Card >
            <CardBody style={{height:'40vh'}}>
              {activeStep === 0 ?
                <BasicInfo/> 
                : activeStep === 1 ?
                  <div>step 2</div> 
                  : activeStep === 2 ?
                    <div> step 3</div> 
                    : 
                    <div></div>
              }
            </CardBody>
          </Card>
          
        </GridList>

        <div className={classes.root}>
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
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}></Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
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
        </div>
        
      </CardBody>          
    </Card>
    

  )
}