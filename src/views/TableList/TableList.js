import React from "react";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";



export default function TableList() {

  return (
    <GridContainer>
      
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          
          <CardBody style={{color: 'white'}}>
            
            CURRENT ACCOUNT INFORMATION

            -name   -budget -etc..... (basic info)
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
