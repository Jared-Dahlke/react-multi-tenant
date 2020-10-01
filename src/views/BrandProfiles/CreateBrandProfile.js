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
import TopCompetitors from './components/TopCompetitors'
import {Formik, Form} from 'formik'
import {Debug} from '../Debug'
import * as Yup from "yup";
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'
import GridList from '@material-ui/core/GridList'


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


const schemaValidation = Yup.object().shape({
 
  basicInfoIndustry: Yup.array().typeError('Wrong type')
    .min(1, "Select at least one field")
    .of(
      Yup.object()
        .shape({
          label: Yup.string(),
          value: Yup.string()
        })
        .transform(v => v === '' ? null : v)
    ),
  basicInfoProfileName: Yup.string()
    .min(2, "Must be greater than 1 character")
    .max(50, "Must be less than 50 characters")
    .required('Required'),
  basicInfoWebsiteUrl: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
    )
    .required('Required'),

  basicInfoTwitterProfile: Yup.string()
    .min(2, "Must be greater than 1 character")
    .max(50, "Must be less than 30 characters")
    .required('Required'),
  topCompetitors: Yup.array().typeError('Wrong type')
      .min(1, "You have to create at least one competitor")
      .of(
        Yup.object()
          .shape({
            label: Yup.string(),
            value: Yup.string()
          })
          .transform(v => v === '' ? null : v)
      ),
    
  
});

function getSteps() {
  return ['Basic Info', 'Top Competitors', 'Sensitive Content'];
}


function CreateBrandProfiles (props) {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
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

  const isValid=(errors, formName)=>{
    for (var prop in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, prop)) {
         if(prop.includes(formName)) {
           return false
         }
      }
    }
    return true
  }

  const stepValidated = (index, errors) => {
    console.log('running step validated')
    if(!errors || errors.length < 1) {
      //return false
    }
    if(index === 0) {
      return isValid(errors,'basicInfo')  
    }
    if(index === 1) {
      return isValid(errors,'topCompetitors')  
    }
    return true
  }

 
  {/**<Formik 
    validateOnMount={true} 
    initialValues={useMemo(() => { return { email: '' } }, [])}
    ...  */}

return (
    <Formik
      enableReinitialize
      validateOnMount={true}
      // validateOnChange={true}
      validationSchema={() => schemaValidation}
      initialValues={{
        
        basicInfoProfileName: '',
        basicInfoWebsiteUrl: '',
        basicInfoTwitterProfile: '',
        basicInfoIndustry: [],
        
        topCompetitors: []

        }}
        render={({
          values,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
          validateField,
          validateForm,
          isSubmitting,
          isValid
        }) => (
      <div>

      <Stepper classes={{ root: classes.stepper}}  activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          
          let labelColor = whiteColor
          if (stepValidated(index, errors)) {
            labelColor = 'green'
          }           
          
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

      <GridContainer justify='center'>


      <GridItem xs={12} sm={12} md={11} >

    

      <Card style={{backgroundColor: blackColor}}>
        
        
        
        <CardBody>
          <GridList cols={1} cellHeight={400} style={{overflowX:"hidden"}}>

          {activeStep === 0 ?
          <div>         
            <BasicInfo setFieldValue={setFieldValue} errors={errors}/>            
          </div>
            : activeStep === 1 ?
              <div>  
                <TopCompetitors setFieldValue={setFieldValue} errors={errors}/>
              </div>
              : activeStep === 2 ?
                <div> step 3</div> 
                : 
                <div></div>
          }
          
          
          </GridList>
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
                  <Button variant="contained" color="primary" onClick={handleNext} disabled={!stepValidated(activeStep,errors)}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
   

        </CardFooter>
    
      </Card>

      </GridItem>
      </GridContainer>
    </div>
  
  )}
/>

  )
}

export default CreateBrandProfiles