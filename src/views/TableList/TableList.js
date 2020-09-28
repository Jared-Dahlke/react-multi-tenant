import React from "react";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts
  };
};



function TableList(props) {

  

  return (
    <GridContainer>
      
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          
          <CardBody style={{color: 'white'}}>
            
            CURRENT ACCOUNT INFORMATION

            <pre>{JSON.stringify(props.accounts.data,null,2)}</pre>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default connect(mapStateToProps, null)(TableList);
