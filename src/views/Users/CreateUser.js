import React from "react";
// @material-ui/core components
//import { makeStyles } from "@material-ui/core/styles";
// core components
/*import Quote from "../../components/Typography/Quote.js";
import Muted from "../../components/Typography/Muted.js";
import Primary from "../../components/Typography/Primary.js";
import Info from "../../components/Typography/Info.js";
import Success from "../../components/Typography/Success.js";
import Warning from "../../components/Typography/Warning.js";
import Danger from "../../components/Typography/Danger.js"; */
//import CardHeader from "../../components/Card/CardHeader.js";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";


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



export default function CreateUser() {
   const classes = useStyles();
  return (
    <Card>

      

      
      <CardBody>


      <Button className={classes.alignRight} color="primary"> adfadfadadf Create New User</Button>


        
      </CardBody>
    </Card>
  );
}
