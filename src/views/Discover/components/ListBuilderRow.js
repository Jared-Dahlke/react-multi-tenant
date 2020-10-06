import React from 'react'
import {Table, TableCell, TableBody, TableRow, TableHead, Button} from '@material-ui/core'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { successColor, dangerColor, warningColor } from '../../../assets/jss/material-dashboard-react'
var numeral = require('numeral');

export default function ListBuilderRow (props) {


  const useStyles = makeStyles((theme) => ({
    root: {
     // backgroundColor: 'blue', //theme.palette.background.paper,
    
      backgroundColor:'yellow',
      "&.MuiToggleButton-root > .Mui-selected": {
        backgroundColor: "blue"
      }
      
    },
    selectedButton: {
      backgroundColor: 'blue',
      color: 'yellow'
    },
    targetGreen: {
      "&.Mui-selected": {
        backgroundColor: successColor[0]
      },
      "&.Mui-selected:hover": {
        backgroundColor: successColor[0]
      },
    },
    monitorYellow: {
      "&.Mui-selected": {
        backgroundColor: 'yellow'
      },
      "&.Mui-selected:hover": {
        backgroundColor: 'yellow'
      },
    },
    blockRed: {
      "&.Mui-selected": {
        backgroundColor: dangerColor[0]
      },
      "&.Mui-selected:hover": {
        backgroundColor: dangerColor[0]
      },
    }
  }));

  const classes = useStyles();


  const [view, setView] = React.useState('');
  
  const handleChange = (event, nextView, id) => {
    //setView(nextView);
    props.handleButtonGroupChange(nextView, id, props.level)
  };

  let item = props.item

  let subscribers = numeral(item.channelSubscribers).format('0.0a')
  let channels = numeral(item.channels).format('0a')
  let videos = numeral(item.channelVideos).format('0a')

  let cpm = numeral(item.averageCPM).format('$00.00')
  let cpc = numeral(item.averageCPC).format('$.000')
  let cpv = numeral(item.averageCPV).format('$.000')

  let countStyle= {
    border: 0,
    margin: 0,
    padding: 0,
    paddingRight: 12
  }
  let mainCellStyle= {
    padding: 8,
    //  verticalAlign: 'top'
   
  }


  return (
    

    <TableRow key={item.categoryId} className={props.rowStyle}>
          
    
        <TableCell style={mainCellStyle}>
          
            {props.level === 'Category' ?
                <h3 style={{margin: 0, padding: 0}}>
                  {item.categoryName}               
                </h3> 

              : props.level === 'Channel' ?
                <div>
                  <h3 style={{margin: 0, padding: 0}}>
                    {item.title}
                  </h3> 
                  <h5 style={{margin: 0, padding: 0}}>
                    {item.categoryName}             
                  </h5> 
                </div>
            
              : props.level === 'Video' ?
                <div>
                  <h3 style={{margin: 0, padding: 0}}>
                    {item.title}                            
                  </h3> 
                  <h5 style={{margin: 0, padding: 0}}>
                    {item.categoryName}             
                  </h5> 
                  <h5 style={{margin: 0, padding: 0}}>
                    {item.channelName}             
                  </h5> 
                </div>
              :
              
              null}
          

            
         
              <Table>
                <TableBody>
                  <TableRow>

                    <TableCell style={countStyle}>
                      Avails:
                    </TableCell>
                    <TableCell style={countStyle}>
                      Channels: {channels}
                    </TableCell>
                    <TableCell style={countStyle}>
                      Subscribers: {subscribers}
                    </TableCell>
                    <TableCell style={countStyle}>
                      Videos: {videos}
                    </TableCell>
             
                  </TableRow>
                </TableBody>
              </Table>

              
            
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={countStyle}>
                      Perf:
                    </TableCell>
                    <TableCell style={countStyle}>
                      CPM: {cpm}
                    </TableCell>
                    <TableCell style={countStyle}>
                      CPC: {cpc}
                    </TableCell>
                    <TableCell style={countStyle}>
                      CPV: {cpv}
                    </TableCell>
                    <TableCell style={countStyle}>
                      CPCV: -
                    </TableCell>
                    <TableCell style={countStyle}>
                      CPA: -
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

             
        </TableCell>

        <TableCell style={mainCellStyle}>

          <ToggleButtonGroup 
            size="small" 
            aria-label="small outlined button group" 
            onChange={(event, nextView)=>{handleChange(event,nextView, item[props.levelId])}}
            exclusive
            value={item.toggleValue}
            
          >
            <ToggleButton value="Target" classes={{selected: classes.targetGreen}}>Target</ToggleButton>
            <ToggleButton value="Monitor" classes={{selected: classes.monitorYellow}}>Monitor</ToggleButton>
            <ToggleButton value="Block" classes={{selected: classes.blockRed}}>Block</ToggleButton>
          </ToggleButtonGroup>
  
        </TableCell>

    

    </TableRow>


  )

}