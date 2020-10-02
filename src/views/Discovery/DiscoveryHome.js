import React from "react";
import {connect} from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
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
  }
};

const useStyles = makeStyles(styles);

const mapStateToProps = (state) => {
  return { 
    roles: state.roles.data
  };
};


function DiscoveryHome(props) {

  const classes = useStyles();
  
  return (
    <Card>

      <CardBody>
      
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
            
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Discover</h4>
                <p className={classes.cardCategoryWhite}></p>
              </CardHeader>
              
              <CardBody>
                
              </CardBody>
              <CardFooter>
               
              </CardFooter>
            </Card>
          </GridItem>
          
        </GridContainer>

      </CardBody>

               
    </Card>
  );
}

export default connect(mapStateToProps, null)(DiscoveryHome)
