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
import { TableRow, TableCell, Table, TableBody, DialogContentText, Card, CardContent, Typography, TableHead } from '@material-ui/core'
import {fetchChannels, categoriesFetchDataSuccess, channelsFetchDataSuccess, fetchVideos, videosFetchDataSuccess} from '../../redux/actions/discover/channels'
import countryList from 'react-select-country-list'
import numeral from 'numeral'
import SaveAlt from "@material-ui/icons/SaveAlt";
import Button from '../../components/CustomButtons/Button'

const bodyHeight = 600
const borderRad = 4
const blockHeight = 48


const styles = {
  myheader: {
    backgroundColor: blackColor,
    borderRadius: borderRad,
    height: '150px',
    alignItems: 'flex-end',
    justify: "flex-start"
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
   // height: bodyHeight,
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
    fetchChannels: (categories, filters) => dispatch(fetchChannels(categories, filters)),
    categoriesFetchDataSuccess: (categories) => dispatch(categoriesFetchDataSuccess(categories)),
    channelsFetchDataSuccess: (payload) => dispatch(channelsFetchDataSuccess(payload)),
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

const downloadClick = ()=> {
  window.location.href = 'https://storage.googleapis.com/sightlyoutcomeintelligence_temp/channels_and_videos_sample.xlsx'
                         
}


function DiscoveryHome(props) {

  const [tabIndex, setTabIndex] = React.useState(0)
  const [filters, setFilters] = React.useState({})

  const countries = countryList().getData()
  const languages= [
    {value:'English', label: 'English'},
    {value:'Arabic', label: 'Arabic'},
    {value:'Chinese (simplified)', label: 'Chinese (simplified)'},
    {value:'Chinese (traditional)', label: 'Chinese (traditional)'},    
    {value:'French', label: 'French'},
    {value:'German', label: 'German'},
    {value:'Italian', label: 'Italian'},
    {value:'Indonesian', label: 'Indonesian'},
    {value:'Japanese', label: 'Japanese'},
    {value:'Korean', label: 'Korean'},
    {value:'Polish', label: 'Polish'},
    {value:'Portuguese', label: 'Portuguese'},
    {value:'Russian', label: 'Russian'},
    {value:'Spanish', label: 'Spanish'},
    {value:'Thai', label: 'Thai'},
    {value:'Turkish', label: 'Turkish'},
    {value:'Vietnamese', label: 'Vietnamese'}
  ]
  
  const boolOptions = [
    {value: 'True', label: 'True'},
    {value: 'False', label: 'False'}
  ]

  const handleFilterChange = (e, type)=>{
    console.log('handle filter change')
    console.log(e)
    let prevFilters = JSON.parse(JSON.stringify(filters))
    if (type === 'Country') {
      prevFilters.country = e.value
    }

    console.log('finished filters:')
    console.log(prevFilters)

    setFilters(prevFilters)

   
    handleButtonGroupChange('','dummyId','Channel')
    
    props.fetchChannels(props.categories, prevFilters)

    // trigger regather
  }

  const handleButtonGroupChange =(value, id, level)=>{
    if(level === 'Category') {

      let categoriesCopy = JSON.parse(JSON.stringify(props.categories))
      for (const category of categoriesCopy) {
        if(category.categoryId === id) {
          category.toggleValue = value
        }
      }
      props.categoriesFetchDataSuccess(categoriesCopy)
      props.fetchChannels(categoriesCopy, filters)
    }

    if(level === 'Channel') {
      let channelsCopy = JSON.parse(JSON.stringify(props.channels))
      for (const channel of channelsCopy) {
        if(channel.channelId === id) {
          channel.toggleValue = value
        }
      }

      let payload = {channels: channelsCopy, filters: filters}
      
      props.channelsFetchDataSuccess(payload)
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

  const getSelectedCount=(items)=>{
    let mycount = 0
    for (const item of items) {
      if(item.toggleValue && item.toggleValue.length > 1) {
        mycount = mycount + 1
      }
    }
    return mycount
  }

  const getAverage=(items, field)=>{

    //get targeted only
    let itemsCopy = JSON.parse(JSON.stringify(items))
    let targetedItems = []
    for (const itemCopy of itemsCopy) {
      if(itemCopy.toggleValue === 'Target') {
        targetedItems.push(itemCopy)
      }
    }

    var total = 0
    for (const item of targetedItems) {
      total = total + item[field]
    }

    let avg = numeral(total / targetedItems.length).format('$00.00')

    return avg

  }

  const selectedCounts = (items) => {
    let myCount = {
      target: {       
        items: 0
      },
      monitor: {        
        items: 0
      },
      block: {      
        items: 0
      }      
    }
    for (const item of items) {    
      if(item.toggleValue === 'Target') {
        myCount.target.items = myCount.target.items + 1
      }
      if(item.toggleValue === 'Monitor') {
        myCount.monitor.items = myCount.monitor.items + 1
      }
      if(item.toggleValue === 'Block') {
        myCount.block.items = myCount.block.items + 1
      }
      
    }
    return myCount
  }

  //const { height, width } = useWindowDimensions();
  
  //console.log(windowHeight)


  const selectedCategoriesCount = React.useMemo(() => getSelectedCount(props.categories), [props.categories]);
  const selectedChannelsCount = React.useMemo(() => getSelectedCount(props.channels), [props.channels]);
  const selectedVideosCount = React.useMemo(() => getSelectedCount(props.videos), [props.videos]);

  const avgCpm = React.useMemo(()=> getAverage(props.videos, 'averageCPM'), [props.videos])
  const avgCpc = React.useMemo(()=> getAverage(props.videos, 'averageCPC'), [props.videos])
  const avgCpv = React.useMemo(()=> getAverage(props.videos, 'averageCPV'), [props.videos])

  const videosCount = React.useMemo(()=> selectedCounts(props.videos), [props.videos])
  const channelsCount = React.useMemo(()=> selectedCounts(props.channels), [props.channels])

  
  const disableFilters = true  //tabIndex > 0 ? false : true

  const classes = useStyles();


  
  return (
    <GridContainer >
          

           <GridItem xs={12} sm={12} md={12} style={{height: bodyHeight + 80, backgroundColor: blackColor}}>

            <Grid container style={styles.myheader}>
                <Grid item xs={12} sm={12} md={3}  >                         
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
                </Grid>

              <Grid item item xs={12} sm={12} md={1}>

              </Grid>

             
              <GridItem style={{color: whiteColor}} >

                  <Typography variant="h5" gutterBottom>
                    {avgCpm}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom >
                    AVG CPM
                  </Typography>
               
              </GridItem>
              <GridItem style={{color: whiteColor}}>

                    <Typography variant="h5" gutterBottom>
                      {avgCpv}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom >
                      AVG CPV
                    </Typography>
               
              </GridItem>
              <GridItem style={{color: whiteColor}}>

                    <Typography variant="h5" gutterBottom>
                     {avgCpc}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom >
                      AVG CPC
                    </Typography>
               
              </GridItem>

              <GridItem  >

                      <Table className={classes.table} size="small" aria-label="a dense table">

                          <TableHead style={{border: '0px solid white'}}>
                            <TableRow style={{border: '0px solid white'}}>
                              
                                  <TableCell key={'01'} style={{border: '0px solid white'}}>
                                  </TableCell>
                                  <TableCell key={'02'} style={{border: '0px solid white', color: whiteColor}}>
                                    <Typography variant="subtitle2" gutterBottom >
                                      TARGET
                                    </Typography>
                                  </TableCell>
                                  <TableCell key={'03'} style={{border: '0px solid white', color: whiteColor}}>
                                    <Typography variant="subtitle2" gutterBottom>
                                      MONITOR
                                    </Typography>
                                  </TableCell>
                                  <TableCell key={'04'} style={{border: '0px solid white', color: whiteColor}}>
                                    <Typography variant="subtitle2" gutterBottom >
                                      BLOCK
                                    </Typography>
                                  </TableCell>
                                
                            </TableRow>
                          </TableHead>
                      
                      <TableBody>

                         
                        
                          <TableRow key={'0'} >
                            <TableCell style={{border: '0px solid white', color: whiteColor}}>
                                    <Typography variant="subtitle2"  gutterBottom >
                                      CHANNELS
                                    </Typography>
                            </TableCell>
                            <TableCell style={{border: '0px solid white', color: whiteColor}}>
                                    <Typography variant="h5" gutterBottom >
                                      {channelsCount.target.items}
                                    </Typography>
                            </TableCell>  
                            <TableCell style={{border: '0px solid white', color: whiteColor}}>
                                    <Typography variant="h5" gutterBottom >
                                    {channelsCount.monitor.items}
                                    </Typography>
                            </TableCell>     
                            <TableCell style={{border: '0px solid white', color: whiteColor}}>
                                    <Typography variant="h5" gutterBottom >
                                    {channelsCount.block.items}
                                    </Typography>
                            </TableCell>                              
                          </TableRow>
                          

                          <TableRow key={'1'}>
                            <TableCell style={{border: '0px solid white', color: whiteColor}}>
                                  <Typography variant="subtitle2" gutterBottom >
                                      VIDEOS
                                    </Typography>
                            </TableCell>
                            <TableCell style={{border: '0px solid white', color: whiteColor}} >
                                    <Typography variant="h5" gutterBottom >
                                      {videosCount.target.items}
                                    </Typography>                  
                            </TableCell>        
                            <TableCell style={{border: '0px solid white', color: whiteColor}} >
                                    <Typography variant="h5" gutterBottom >
                                      {videosCount.monitor.items}
                                    </Typography>                  
                            </TableCell>  
                            <TableCell style={{border: '0px solid white', color: whiteColor}} >
                                    <Typography variant="h5" gutterBottom >
                                      {videosCount.block.items}
                                    </Typography>                  
                            </TableCell>                           
                          </TableRow>

                          
                        
                      </TableBody>
                    </Table>
               
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
                          options={countries}
                          onChange={(e)=>{handleFilterChange(e, 'Country')}}
                          isDisabled={disableFilters}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                        <ReactSelect
                          placeholder={'Video Language'}
                          options={languages}
                          isDisabled={disableFilters}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                        <ReactSelect
                          placeholder={'Category'}
                          isDisabled={disableFilters}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                        <ReactSelect
                          placeholder={'Kids Content'}
                          options={boolOptions}
                          isDisabled={disableFilters}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                        <ReactSelect
                          placeholder={'Disabled Comments'}
                          options={boolOptions}
                          isDisabled={disableFilters}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                        <ReactSelect
                          placeholder={'Channel Filter'}
                          isDisabled={disableFilters}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                        <ReactSelect
                          placeholder={'Creator Type'}
                          isDisabled={disableFilters}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                        <ReactSelect
                          placeholder={'Alignment Score'}
                          isDisabled={disableFilters}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} >
                        <ReactSelect
                          placeholder={'Clean Rating Score'}
                          isDisabled={disableFilters}
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
                      selectedCategoriesCount={selectedCategoriesCount}
                      selectedChannelsCount={selectedChannelsCount}
                      selectedVideosCount={selectedVideosCount}
                      changeTabIndex={(index)=>{setTabIndex(index)}}
                    />

                  <Button color="primary" onClick={downloadClick}>           
                    <SaveAlt/>
                    Save & Download List              
                  </Button>
                    
                </div>
              </Grid>

       

            

            </Grid>

          </GridItem>
            
         
          
        </GridContainer>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryHome)
