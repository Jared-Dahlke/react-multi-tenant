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
import {fetchChannels} from '../../redux/actions/discover/channels'

const bodyHeight = 600
const borderRad = 4
const blockHeight = 48


const styles = {
  myheader: {
    backgroundColor: whiteColor,
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
    padding: 8,
    height: bodyHeight,
    backgroundColor: whiteColor,
    borderRadius: borderRad
  },
 
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
    channels: state.channels,
    brandProfiles: state.brandProfiles
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    fetchChannels: (categoryIds) => dispatch(fetchChannels(categoryIds))
  
  }
}


const customSelectStyles = {
  control: base => ({
    ...base,
    height: blockHeight,
    minHeight: blockHeight
  })
};


function DiscoveryHome(props) {

  console.log(props)

  const handleButtonGroupChange =(e)=>{
    console.log(e)
  }


  //const { height, width } = useWindowDimensions();
  
  //console.log(windowHeight)


  //const formattedBrandProfiles = React.useMemo(() => formatBrandProfiles(props.accounts.data), [props.accounts.data]);

  
  //const allUsers = [{value: 1, label: 'Joe'},{value: 2, label: 'Sue'},{value: 3, label: 'John'}]



  const classes = useStyles();


  
  return (
        <GridContainer >
          
          

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
              justify="space-evenly"                
            >

              <Grid  item xs={12} sm={12} md={2} >
                <div style={styles.colSide}>
                  <Grid container >

                    <Grid container style={{height: blockHeight}}>
                      <Grid item xs={10}>                   
                      </Grid>
                      <Grid item xs={2}>
                        <FilterList style={{color: blackColor}} fontSize="large"/>
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

              <Grid  item xs={12} sm={12} md={8}>
                <div style={styles.col}>
                   
                        <Tabs 
                        bodyHeight={bodyHeight} 
                        borderRad={borderRad} 
                        categories={props.categories}
                        handleButtonGroupChange={handleButtonGroupChange}
                        />
                    
                </div>
              </Grid>

              

            </Grid>

          </GridItem>
            
         
          
        </GridContainer>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryHome)
