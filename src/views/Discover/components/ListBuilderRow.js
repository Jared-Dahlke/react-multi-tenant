import React from 'react'
import {Table, TableCell, TableBody, TableRow, TableHead, Button} from '@material-ui/core'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Checkbox from '@material-ui/core/Checkbox'
var numeral = require('numeral');

export default function ListBuilderRow (props) {

  const [view, setView] = React.useState('');
  
  const handleChange = (event, nextView, categoryId) => {
    setView(nextView);
    props.handleButtonGroupChange(nextView, categoryId)
  };

  let item = props.item

  let subscribers = numeral(item.channelSubscribers).format('0.0a')
  let channels = numeral(item.channels).format('0a')
  let videos = numeral(item.channelVideos).format('0a')

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

            <h3 style={{margin: 0, padding: 0}}>{item.categoryName}</h3> 
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
                      Avg. CPM: $2.3
                    </TableCell>
                    <TableCell style={countStyle}>
                      Avg. CPC: $1
                    </TableCell>
                    <TableCell style={countStyle}>
                      Avg. CPV: $3.4
                    </TableCell>
                    <TableCell style={countStyle}>
                      Avg. CPCV: $3.4
                    </TableCell>
                    <TableCell style={countStyle}>
                      Avg. CPA: $3.4
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

             
        </TableCell>

        <TableCell style={mainCellStyle}>

        <ToggleButtonGroup 
        size="small" 
        aria-label="small outlined button group" 
        onChange={(event, nextView)=>{handleChange(event,nextView, item.categoryId)}}
        exclusive
        value={view}
        >
          <ToggleButton value="Target">Target</ToggleButton>
          <ToggleButton value="Monitor">Monitor</ToggleButton>
          <ToggleButton value="Block">Block</ToggleButton>
        </ToggleButtonGroup>

            

             
        </TableCell>

    

    </TableRow>


  )

}