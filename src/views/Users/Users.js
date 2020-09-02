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
import { Switch, Route, Redirect } from "react-router-dom";
import Link from '@material-ui/core/Link';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

import Grid from "@material-ui/core/Grid"
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";


import Table from "../../components/Table/Table.js";

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
    width: '20%'
  },
  grid: {
    display: 'grid'
  }
};

const useStyles = makeStyles(styles);


//const useStyles = makeStyles(styles);



export default function Users({match}) {
   const classes = useStyles();
  return (                                   
 
      <GridContainer spacing={2}>
       
             
            <Grid container justify="flex-end">

              <GridItem >
                <Button href="/admin/users/create" color="primary">Create New User</Button>
              </GridItem>
              
              
            </Grid>
               
                   
          
          
      
                
          <GridItem xs={12} sm={12} md={12}>
              <Card>
               
                <CardBody>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Name", "Country", "City", "Salary"]}
                    tableData={[
                      ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                      ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                      ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                      ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                      ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                      ["Mason Porter", "Chile", "Gloucester", "$78,615"]
                    ]}
                  />
                </CardBody>
              </Card>
            </GridItem>


      

      </GridContainer>
     

           
  );
}
