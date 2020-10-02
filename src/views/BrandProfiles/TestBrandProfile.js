import React from "react";
import CardBody from "../../components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import styles from "../../assets/jss/material-dashboard-react/views/iconsStyle.js";

const useStyles = makeStyles(styles);



function BrandProfiles(props) {


  const classes = useStyles();
 


  return (                                   
 
    <CardBody>
    <Hidden only={["sm", "xs"]}>

<iframe
                className={classes.iframe}
                src="https://form.jotform.com/202726463369158"
                title="Brand Mentality"
              >
                <p>Your browser does not support iframes.</p>
              </iframe>
</Hidden>
   </CardBody>

            

    

           
  );
}

export default BrandProfiles