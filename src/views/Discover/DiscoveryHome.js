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
import {fetchChannels, categoriesFetchDataSuccess, channelsFetchDataSuccess, fetchVideos, videosFetchDataSuccess} from '../../redux/actions/discover/channels'

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


const useStyles = makeStyles(styles);

const mapStateToProps = (state) => {
  return { 
    categories: state.categories,
    channels: state.channels,
    videos: state.videos,
    brandProfiles: state.brandProfiles
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    fetchChannels: (categories) => dispatch(fetchChannels(categories)),
    categoriesFetchDataSuccess: (categories) => dispatch(categoriesFetchDataSuccess(categories)),
    channelsFetchDataSuccess: (channels) => dispatch(channelsFetchDataSuccess(channels)),
    videosFetchDataSuccess: (videos) => dispatch(videosFetchDataSuccess(videos)),
    fetchVideos: (channels, categories) => dispatch(fetchVideos(channels, categories))
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


  const handleButtonGroupChange =(value, id, level)=>{
    if(level === 'Category') {

      let categoriesCopy = JSON.parse(JSON.stringify(props.categories))
      for (const category of categoriesCopy) {
        if(category.categoryId === id) {
          category.toggleValue = value
        }
      }
      props.categoriesFetchDataSuccess(categoriesCopy)
      props.fetchChannels(categoriesCopy)
    }

    if(level === 'Channel') {
      let channelsCopy = JSON.parse(JSON.stringify(props.channels))
      for (const channel of channelsCopy) {
        if(channel.channelId === id) {
          channel.toggleValue = value
        }
      }
      props.channelsFetchDataSuccess(channelsCopy)
      props.fetchVideos(channelsCopy, props.categories)
    }

    if(level === 'Video') {
      let videosCopy = JSON.parse(JSON.stringify(props.videos))
      for (const video of videosCopy) {
        if(video.videoId === id) {
          video.toggleValue = value
        }
      }
      props.videosFetchDataSuccess(videosCopy)
    }
    

  }

  //const { height, width } = useWindowDimensions();
  
  //console.log(windowHeight)


  //const categoriesWithToggleValue = React.useMemo(() => getCategoriesWithToggleValue(props.categories), [props.categories, selectedCategories]);
  //const channelsWithToggleValue = React.useMemo(() => getChannelsWithToggleValue(props.channels), [props.channels, selectedCategories]);

  
  //const allUsers = [{value: 1, label: 'Joe'},{value: 2, label: 'Sue'},{value: 3, label: 'John'}]



  const classes = useStyles();


  
  return (
    <GridContainer >


<pre style={{color:'white'}}>Channels: {props.channels.length}</pre>
<pre style={{color:'white'}}>Selected Categories: {props.categories.length}</pre>

          
          

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
              justify="flex-start"     
              spacing={1}           
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

              <Grid  item xs={12} sm={12} md={10}>
                <div style={styles.col}>
                   
                        <Tabs 
                        bodyHeight={bodyHeight} 
                        borderRad={borderRad} 
                        categories={props.categories}
                        channels={props.channels}
                        videos={props.videos}
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
