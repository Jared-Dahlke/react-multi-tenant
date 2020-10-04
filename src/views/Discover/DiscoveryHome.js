import React from "react";
import {connect} from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Grid from '@material-ui/core/Grid'
import { blackColor, whiteColor, grayColor} from "../../assets/jss/material-dashboard-react.js";
import Tabs from './components/Tabs'
import ReactSelect from 'react-select'
import FilterList from '@material-ui/icons/FilterList'
import ListIcon from '@material-ui/icons/List'
import { TableRow, TableCell, Table, TableBody, DialogContentText, Card, CardContent, Typography } from '@material-ui/core'

const bodyHeight = 600
const borderRad = 4
const blockHeight = 48


const styles = {
  myheader: {
    backgroundColor: blackColor,
    borderRadius: borderRad,
    height: '85px',
    alignItems: 'center'
  },
  mybody: {
    
  },
  col: {
    marginTop: '25px',
    height: bodyHeight,
    backgroundColor: whiteColor,
    borderRadius: borderRad
    //width: '33%'
  },
  colSide: {
    marginTop: '25px',
    height: bodyHeight,
    backgroundColor: blackColor,
    borderRadius: borderRad
  },
  colSideWhite: {
    marginTop: '25px',
    //maxHeight: bodyHeight,
    backgroundColor: whiteColor,
    borderRadius: borderRad,
    padding: 10
    
  }
};

function TableText(props) {
  return (
    <DialogContentText style={{color: props.header ? blackColor : '', marginBottom: 0}}>{props.text}</DialogContentText>
  )
}



const useStyles = makeStyles(styles);

const mapStateToProps = (state) => {
  return { 
    categories: state.categories,
    brandProfiles: state.brandProfiles
  };
};

const customSelectStyles = {
  control: base => ({
    ...base,
    height: blockHeight,
    minHeight: blockHeight
  })
};


function DiscoveryHome(props) {

  console.log(props)


  //const { height, width } = useWindowDimensions();
  
  //console.log(windowHeight)


  //const formattedBrandProfiles = React.useMemo(() => formatBrandProfiles(props.accounts.data), [props.accounts.data]);

  
  //const allUsers = [{value: 1, label: 'Joe'},{value: 2, label: 'Sue'},{value: 3, label: 'John'}]



  const classes = useStyles();


  
  return (
        <GridContainer>
          
          

           <GridItem xs={12} sm={12} md={12} style={{height: bodyHeight + 80, backgroundColor: blackColor}}>

            <Grid container style={styles.myheader}>
              <Grid item xs={12} sm={12} md={4}  >
              
              <div >
              
                  <div style={{fontSize: 14, marginBottom: 10, color: grayColor[0]}}>
                    Brand Profile
                  </div>
              
                <ReactSelect
                  styles={customSelectStyles}
                
                  id={'brandProfileSelect'}
                  placeholder={'Brand Profile'}
                  options={props.brandProfiles}
                  getOptionLabel ={(option)=>option.brandName}
                  getOptionValue ={(option)=>option.brandProfileId}
                  //value={value}
               //   onChange={this.handleChange}
               //   onBlur={this.handleBlur}
                
                  isMulti={false}
                  isDisabled={false}
                  isClearable={false}
                  backspaceRemovesValue={false}
                  components={{ ClearIndicator: null }}
                />
                </div>
              </Grid>

              <GridItem xs={12} sm={12} md={2} >
              
              </GridItem>
              <GridItem xs={12} sm={12} md={2} >
               
              </GridItem>
              <GridItem xs={12} sm={12} md={2} >
               
              </GridItem>
              <GridItem xs={12} sm={12} md={2} >
               
              </GridItem>

            </Grid>
            
            
            
            <Grid 
              container 
              justify="space-between"    
             
            >

              <Grid  item xs={12} sm={12} md={2} >
                <div style={styles.colSide}>
                  <Grid container >

                    <Grid container style={{height: blockHeight}}>
                      <Grid item xs={10}>                   
                      </Grid>
                      <Grid item xs={2}>
                        <FilterList style={{color: whiteColor}} fontSize="large"/>
                      </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                    
                      <Grid item xs={12} sm={12} md={12} >
                        <ReactSelect
                          placeholder={'Country'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                        <ReactSelect
                          placeholder={'Video Language'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                        <ReactSelect
                          placeholder={'Category'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                        <ReactSelect
                          placeholder={'Kids Content'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                        <ReactSelect
                          placeholder={'Disabled Comments'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                        <ReactSelect
                          placeholder={'Channel Filter'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                        <ReactSelect
                          placeholder={'Creator Type'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                        <ReactSelect
                          placeholder={'Alignment Score'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                        <ReactSelect
                          placeholder={'Clean Rating Score'}
                        />
                      </Grid>
                    </Grid>

                  </Grid>
                </div>
              </Grid>

              <Grid  item xs={12} sm={12} md={7}>
                <div style={styles.col}>
                   
                        <Tabs bodyHeight={bodyHeight} borderRad={borderRad} categories={props.categories}/>
                    
                </div>
              </Grid>

              <Grid  item xs={12} sm={12} md={2}>
                <div style={styles.colSideWhite}>
                 
                  
                        <Grid item xs={12} sm={12} md={12}>
                        
                              <Typography variant="subtitle2"  color="textSecondary" gutterBottom>
                                Channel Research Summary
                              </Typography>                                        
                              <Typography variant="caption">
                              <b>Objective:</b> Awareness <br/>
                              <b>Categories:</b> 5 <br/>
                              <b>Channels:</b> 5,000 <br/>
                              <b>Videos:</b> 100,000 <br/>
                              <b>Countries:</b> US, CA, MX <br/>
                              <b>Languages:</b> En, Sp, Fr <br/>
                              <b>Kids Content:</b> No <br/>
                              <b>Disabled Comments:</b> No <br/>
                              <b>Creator Types:</b> All <br/>
                              <b>Avg. Alignment Score:</b> Low Risk <br/>
                              <b>Avg. Clean Rating Score:</b> Low Risk <br/>
                              </Typography>
                            <br/>
                                            
                              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                Ad Insights Summary
                              </Typography>                                        
                              <Typography variant="caption">
                              <b>Total Videos:</b>  <br/>
                              <b>Total Video Views:</b>  <br/>
                              <b>Comments:</b>  <br/>
                              <b>Likes:</b> <br/>
                              <b>Dislikes:</b>  <br/>
                              <b>Favorites:</b><br/>
                              <b>Avg. CPM:</b>  <br/>
                              <b>Avg. CPC:</b>  <br/>
                              <b>Avg CPV:</b>  <br/>
                              <b>Avg. CPA:</b>                      
                              </Typography>
                          
                          </Grid>
                   
                     
                </div>
              </Grid>

            </Grid>

          </GridItem>
            
         
          
        </GridContainer>
  );
}

export default connect(mapStateToProps, null)(DiscoveryHome)
