import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { blackColor, grayColor, whiteColor } from '../../../assets/jss/material-dashboard-react';

import {Table, TableCell, TableBody, TableRow, TableHead, GridList} from '@material-ui/core'
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import tableStyle from '../../../assets/jss/material-dashboard-react/components/tableStyle';

import ListBuilderRow from './ListBuilderRow'
import SearchBar from './SearchBar'
import GridItem from '../../../components/Grid/GridItem';

export default function ListBuilderTable(props) {

  const [categorySearch, setCategorySearch] = React.useState('')

  const useStyles = makeStyles((theme) => ({
    root: {
      //backgroundColor: 'yellow', //theme.palette.background.paper,
     padding: 0
    },
  }));

  const tableClasses= useStyles(tableStyle)

  const classes = useStyles();
  

  return (
    <div>
      <GridItem style={{paddingLeft: 0}}>
        <SearchBar value={categorySearch} handleChange={(val)=>setCategorySearch(val)} onRequestSearch={console.log('searched')}/>
      </GridItem>
      
      <GridList cols={1} cellHeight={props.bodyHeight - 150} style={{overflowX:"hidden", marginLeft: '-16px', marginRight: '-16px', marginTop: 0}}>
        <div style={{padding: 9}}>
      
            <Table className={classes.table} >
              <TableBody style={{height: props.bodyHeight}}>          

                {props.data && props.data.length > 0 && props.data.map((item, index)=>{

                  return (

                    <ListBuilderRow 
                      rowStyle={classes.tableRow}
                      item={item}
                      key={index}
                      handleButtonGroupChange={props.handleButtonGroupChange}
                      level={props.level}
                      levelId={props.levelId}
                      selectedCategoriesCount={props.selectedCategoriesCount}
                      selectedChannelsCount={props.selectedChannelsCount}
                      selectedVideosCount={props.selectedVideosCount}
                    />          

                  )
                })}
      
              </TableBody>
            </Table>

          </div>
        </GridList>
      
    </div>
  );
}