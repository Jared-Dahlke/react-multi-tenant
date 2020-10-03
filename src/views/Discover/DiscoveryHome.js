import React from "react";
import {connect} from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Grid from '@material-ui/core/Grid'
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { blackColor, whiteColor, grayColor } from "../../assets/jss/material-dashboard-react.js";
import Tabs from './components/Tabs'
import useWindowDimensions from '../../hooks/WindowDimensions'
import GridList from '@material-ui/core/GridList'

const styles = {
  myheader: {
    backgroundColor: grayColor[3],
   
    height: '60px'

  },
  mybody: {
    
  },
  col: {
    marginTop: '25px',
    height: '500px',
    backgroundColor: grayColor[3],
    diplay: 'flex'
    //width: '33%'
  }
};



const useStyles = makeStyles(styles);

const mapStateToProps = (state) => {
  return { 
    categories: state.categories
  };
};


function DiscoveryHome(props) {

  console.log(props.categories)


  //const { height, width } = useWindowDimensions();
  const bodyHeight = 500
  //console.log(windowHeight)



  const classes = useStyles();
  
  return (
        <GridContainer>
          
          

        <GridItem xs={12} sm={12} md={12} style={{height: `${bodyHeight}px`, backgroundColor: blackColor}}>
            
            <GridItem xs={12} sm={12} md={12} style={styles.myheader}>
            </GridItem>
            
            <Grid 
              container 
              justify="space-between"    
            >

              <Grid  item style={{width: '15%'}}>
                <div style={styles.col} />
              </Grid>

              <Grid  item style={{width: '65%'}}>
                <div style={styles.col}>
                  <GridList  style={{marginTop: 10}} cellHeight={300}  cols={1}>>
                      <div style={{height: '1000px', backgroundColor: 'green', flex: 1}}>test</div> 
                  </GridList>
                        {/*<Tabs mainHeight={bodyHeight} categories={props.categories}/>*/}
                </div>
              </Grid>

              <Grid  item style={{width: '15%'}}>
                <div style={styles.col} />
              </Grid>

            </Grid>

          </GridItem>
            
         
          
        </GridContainer>
  );
}

export default connect(mapStateToProps, null)(DiscoveryHome)
