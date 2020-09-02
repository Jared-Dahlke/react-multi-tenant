import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import {Checkbox, FormControlLabel} from "@material-ui/core"
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Check from "@material-ui/icons/Check";
// core components
import taskstyles from "../../assets/jss/material-dashboard-react/components/tasksStyle.js";

const useTaskStyles = makeStyles(taskstyles);


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  alignRight: {
    float: "right",
    
  }
};

const useStyles = makeStyles(styles);

const InviteUserForm = (props) => {
  const classes = useStyles();
  const taskClasses = useTaskStyles();
  return (
   
    <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Invite a new user</h4>
              <p className={classes.cardCategoryWhite}></p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: false
                    }}
                  />
                </GridItem>
               

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>

                <Checkbox
               // checked={checked.indexOf(value) !== -1}
                //tabIndex={-1}
                //onClick={() => handleToggle(value)}
                checkedIcon={<Check className={taskClasses.checkedIcon} />}
                icon={<Check className={taskClasses.uncheckedIcon} />}
                classes={{
                  checked: taskClasses.checked,
                  root: taskClasses.root
                }}
              />

              Internal User
                 
                </GridItem>

                

              </GridContainer>
            
              
              
            </CardBody>
            <CardFooter>
              <Button color="primary">Invite User</Button>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
  )
}



export default function CreateUser() {
   const classes = useStyles();
  return (
    <Card>

      

      
      <CardBody>


      <InviteUserForm/>


        
      </CardBody>
    </Card>
  );
}
